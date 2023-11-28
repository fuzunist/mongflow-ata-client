import Card from '@/components/Card'
import Modal from '@/components/Modal'
import { addOrderToDB, createOrderNumberInDB, delOrderNumberFromDB, updateOrderInDB } from '@/services/order'
import store from '@/store'
import {
    addOrder,
    clearSelectProducts,
    delSelectProduct,
    delSelectSet,
    editOrder,
    editSelectProduct,
    editSelectSet,
    setCustomer,
    setOrderNumber
} from '@/store/actions/apps'
import { useExchangeRates, useOrderNumber, useOrders, useSelectedProducts, useSelectedSets } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { calculateAverageType } from '@/utils/apps'
import invoiceToPDF from '@/utils/invoiceToPDF'
import invoiceToPDF_Eng from '@/utils/invoiceToPDF_Eng'
import { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Invoice = ({ selectedCustomer, editingOrder }) => {
    const user = useUser()
    const orders = useOrders()
    const orderNumber = useOrderNumber()
    const selectedProducts = useSelectedProducts()
    const selectedSets = useSelectedSets()
    const exchangeRates = useExchangeRates()
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    const [initialValues, setInitialValues] = useState({
        beginningOrderStatus: editingOrder?.order_status ?? 'İş Alındı',
        formattedDate:
            editingOrder?.order_date?.split('T')[0] ??
            `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1)
                .toString()
                .padStart(2, '0')}/${new Date().getFullYear()}`,
        currencyCode: editingOrder?.currency_code ?? 'TL',
        exchange_rate: editingOrder?.exchange_rate ?? 0.0,
        taxRate: 0.2
    })

    const totalPrice = useMemo(() => {
        const _selectedProducts = selectedProducts.map((product) => product.totalPrice)
        const _selectedSets = selectedSets.map((set) => set.totalPrice)
        _selectedProducts.push(..._selectedSets)
        return _selectedProducts.reduce((a, b) => a + b, 0)
    }, [selectedProducts, selectedSets])

    const onSubmit = async () => {
        console.log(selectedProducts, selectedSets)
        const response = await addOrderToDB(
            user.tokens.access_token,
            selectedCustomer.customerid,
            initialValues.currencyCode,
            initialValues.beginningOrderStatus,
            new Date().toISOString(),
            orderNumber,
            selectedProducts,
            selectedSets,
            totalPrice,
            initialValues.taxRate,
            totalPrice * (1 + initialValues.taxRate),
            initialValues.exchange_rate
        )

        if (response.order_id) {
            console.log('Order added successfully with OrderID:', response.order_id)
            setSuccessMessage(t('order_added_successfully'))
            addOrder({ ...response, username: user.username, currency_code: initialValues.currencyCode, customer: { ...selectedCustomer } })
            setTimeout(() => {
                setCustomer(null)
                clearSelectProducts()
                setSuccessMessage('')
                setInitialValues((val) => ({ ...val, exchange_rate: 0.0, currencyCode: 'TL', taxRate: 0.2 }))
                setOrderNumber('')
            }, 1000)
        } else {
            console.error('Operation unsuccessful. Response from server:', response)
        }
    }

    const onEdit = async () => {
        const orderStatusNumber = calculateAverageType({ products: selectedProducts, sets: selectedSets })
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı'

        const response = await updateOrderInDB(
            user.tokens.access_token,
            editingOrder.order_id,
            selectedCustomer.customerid,
            initialValues.currencyCode,
            selectedProducts,
            selectedSets,
            totalPrice,
            totalPrice * (1 + initialValues.taxRate),
            orderStatus
        )

        if (response.order_id) {
            console.log('Order updated successfully with OrderID:', response.order_id)
            setSuccessMessage(t('order_updated_successfully'))
            editOrder({ ...response, username: user.username, currency_code: initialValues.currencyCode, customer: { ...selectedCustomer } })
            setTimeout(() => {
                setCustomer(null)
                clearSelectProducts()
                setSuccessMessage('')
                navigate('/apps/orders')
            }, 1000)
        } else {
            console.error('Operation unsuccessful. Response from server:', response?.error)
        }
    }

    const onClick = () => {
        if (i18n.language.includes('tr'))
            return invoiceToPDF(
                initialValues,
                selectedProducts,
                selectedSets,
                user,
                selectedCustomer,
                totalPrice,
                1 + initialValues.taxRate,
                orderNumber
            )
        if (i18n.language.includes('en'))
            return invoiceToPDF_Eng(
                initialValues,
                selectedProducts,
                selectedSets,
                user,
                selectedCustomer,
                totalPrice,
                1 + initialValues.taxRate,
                orderNumber
            )
    }

    useEffect(() => {
        if (selectedCustomer && !editingOrder && !orderNumber) {
            createOrderNumberInDB(user.tokens.access_token)
                .then((response) => {
                    console.log('createOrderNumberFromDB response: ', response)
                    setOrderNumber(response.order_number)
                })
                .catch((e) => console.log('createOrderNumberFromDB error: ', e))
        }
    }, [selectedCustomer, editingOrder])

    useEffect(() => {
        return () => {
            if (
                !editingOrder &&
                store.getState().apps.orderNumber &&
                !orders.find((order) => order.order_number === store.getState().apps.orderNumber)
            ) {
                delOrderNumberFromDB(user.tokens.access_token, store.getState().apps.orderNumber)
                setOrderNumber('')
            }
        }
    }, [])

    if (!selectedCustomer) return null
    return (
        <Card>
            <Card.Body>
                {successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}
                <div
                    className='flex flex-col gap-4 text-lg mb-4'
                    id='invoice'
                >
                    <div className='flex justify-between items-start'>
                        <div className='flex-1 flex flex-col gap-2'>
                            <span>
                                <span className='font-semibold'>{t('customername')}:</span> {selectedCustomer.customername}
                            </span>
                            <span>
                                <span className='font-semibold'>{t('companyname')}:</span> {selectedCustomer.companyname}
                            </span>
                            <span>
                                <span className='font-semibold'>{t('phone')}:</span> {selectedCustomer.phone}
                            </span>
                            <span>
                                <span className='font-semibold'>{t('email')}:</span> {selectedCustomer.email}
                            </span>
                        </div>
                        <div className='flex-1 flex flex-col gap-2 items-end'>
                            <span>
                                <span className='font-semibold'>{t('order_creation_date')}:</span> {initialValues.formattedDate}
                            </span>
                            <span>
                                <span className='font-semibold'>{t('order_status')}:</span> {t(initialValues.beginningOrderStatus)}
                            </span>
                            <span>
                                <span className='font-semibold'>{t('order_number')}:</span> {editingOrder?.order_number ?? orderNumber}
                            </span>
                        </div>
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />
                    <div className='flex flex-wrap text-center font-semibold'>
                        <span className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>{t('product')}</span>
                        <span className='basis-[calc(30%_-_0.5rem)] mx-1 px-2'>{t('attributes')}</span>
                        <span className='basis-[calc(10%_-_0.5rem)] mx-1 px-2'>{t('unit')}</span>
                        <span className='basis-[calc(12%_-_0.5rem)] mx-1 px-2'>{t('unitPrice')}</span>
                        <span className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>{t('total')}</span>
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />

                    <div className='flex flex-col gap-2'>
                        {selectedProducts.map((product, index) => (
                            <div
                                className='flex flex-wrap text-center items-center'
                                key={product.product_id}
                            >
                                <span
                                    className='basis-[calc(24%_-_0.5rem)] mx-1 px-2 hover:line-through hover:text-red-500 cursor-pointer'
                                    onClick={() => delSelectProduct(index)}
                                >
                                    {product.product_name}
                                </span>
                                <span className='basis-[calc(30%_-_0.5rem)] mx-1 px-2 flex flex-col text-sm'>
                                    {Object.entries(product.attributes).map(([attrName, attrValue], index) => (
                                        <span key={index}>
                                            {attrName}: {attrValue}
                                        </span>
                                    ))}
                                </span>
                                <span className='basis-[calc(10%_-_0.5rem)] mx-1 px-2'>
                                    {product.quantity} {t(product.productType)}
                                </span>
                                <Modal
                                    className='basis-[calc(12%_-_0.5rem)] mx-1 px-2 cursor-pointer select-none'
                                    text={product.unitPrice.toFixed(2)}
                                >
                                    <input
                                        type='number'
                                        value={product.unitPrice}
                                        onChange={(e) => editSelectProduct(index, e.target.valueAsNumber)}
                                        className='w-full py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                                    />
                                </Modal>
                                <span className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>{product.totalPrice.toFixed(2)}</span>
                            </div>
                        ))}

                        {selectedSets.map((set, index) => (
                            <div
                                className='flex flex-wrap text-center items-center'
                                key={set.set_id}
                            >
                                <span
                                    className='basis-[calc(24%_-_0.5rem)] mx-1 px-2 hover:line-through hover:text-red-500 cursor-pointer'
                                    onClick={() => delSelectSet(index)}
                                >
                                    {set.set_name}
                                </span>
                                <span className='basis-[calc(30%_-_0.5rem)] mx-1 px-2 flex flex-col text-sm'>
                                    <div className='flex flex-col gap-2'>
                                        {set.products.map((product, indx) => (
                                            <div
                                                className='flex flex-col gap-1'
                                                key={indx}
                                            >
                                                <span className='font-bold'>
                                                    {product.product_name} x{product.quantity} ({product.productType})
                                                </span>
                                                <div className='flex flex-col'>
                                                    {Object.entries(product.attributes).map(([attrName, attrValue], index) => (
                                                        <span key={index}>
                                                            {attrName}: {attrValue}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </span>
                                <span className='basis-[calc(10%_-_0.5rem)] mx-1 px-2'>
                                    {set.quantity} {t(set.productType)}
                                </span>
                                <Modal
                                    className='basis-[calc(12%_-_0.5rem)] mx-1 px-2 cursor-pointer select-none'
                                    text={set.unitPrice.toFixed(2)}
                                >
                                    <input
                                        type='number'
                                        value={set.unitPrice}
                                        onChange={(e) => editSelectSet(index, e.target.valueAsNumber)}
                                        className='w-full py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                                    />
                                </Modal>
                                <span className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>{set.totalPrice.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex flex-wrap justify-end text-center'>
                            <div className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>
                                <span>
                                    <span className='font-semibold'>{t('amount')}:</span> {totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-end text-center'>
                            <div className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>
                                <span className='font-semibold'>{t('vat')}:</span>
                                <select
                                    value={initialValues.taxRate}
                                    onChange={(e) => setInitialValues((initialValues) => ({ ...initialValues, taxRate: parseFloat(e.target.value) }))}
                                    className='py-2 px-3 ml-2 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                                >
                                    <option value={0}>%0</option>
                                    <option value={0.1}>%10</option>
                                    <option value={0.2}>%20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />
                    <div className='flex flex-wrap justify-end text-center'>
                        <div className='basis-[calc(24%_-_0.5rem)] mx-1 px-2'>
                            <span className='font-semibold text-2xl flex gap-2 justify-center items-center'>
                                <Modal
                                    text={
                                        <span className='flex flex-col justify-center items-center'>
                                            {initialValues.currencyCode}{' '}
                                            {initialValues.currencyCode !== 'TL' && (
                                                <span className='text-sm'>
                                                    ({initialValues.exchange_rate}
                                                    {` `}TL)
                                                </span>
                                            )}
                                        </span>
                                    }
                                >
                                    <select
                                        value={initialValues.currencyCode}
                                        onChange={(e) =>
                                            setInitialValues((val) =>
                                                e.target.value === 'TL'
                                                    ? { ...val, currencyCode: e.target.value, exchange_rate: 0.0 }
                                                    : {
                                                          ...val,
                                                          currencyCode: e.target.value,
                                                          exchange_rate: parseFloat(
                                                              exchangeRates?.find(
                                                                  (exchangeRate) =>
                                                                      exchangeRate.currency_code ===
                                                                      (e.target.value === 'EURO' ? 'EUR' : e.target.value)
                                                              )?.banknote_selling
                                                          )
                                                      }
                                            )
                                        }
                                        className='w-full py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                                    >
                                        {['TL', 'USD', 'EURO'].map((option, index) => (
                                            <option
                                                key={index}
                                                value={option}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    {initialValues.currencyCode !== 'TL' && (
                                        <input
                                            type='number'
                                            value={initialValues.exchange_rate}
                                            onChange={(e) => setInitialValues((val) => ({ ...val, exchange_rate: e.target.valueAsNumber }))}
                                            className='mt-4 w-full py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                                        />
                                    )}
                                </Modal>{' '}
                                {(totalPrice * (1 + initialValues.taxRate)).toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />
                </div>
                <div className='flex flex-wrap justify-end text-center gap-2 px-4'>
                    <button
                        onClick={onClick}
                        className='py-2 px-4 rounded bg-purple hover:bg-purple-hover text-white font-semibold'
                    >
                        {t('saveAsExcel')}
                    </button>
                    <button
                        onClick={editingOrder ? onEdit : onSubmit}
                        className='py-2 px-4 rounded bg-purple hover:bg-purple-hover text-white font-semibold'
                    >
                        {editingOrder ? t('update') : t('create')}
                    </button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Invoice
