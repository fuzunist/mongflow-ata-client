import Card from '@/components/Card'
import Col from '@/components/Col'
import Modal from '@/components/Modal'
import Search from '@/components/Search'
import Order from '@/modals/Order'
import { setSearch } from '@/store/actions/apps'
import { useOrders, useSearch } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { formatDigits } from '@/utils/helpers'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Orders = () => {
    const { t } = useTranslation()
    const orders = useOrders()
    const search = useSearch()
    const { usertype } = useUser()

    useEffect(() => {
        setSearch('')
        return () => {
            setSearch('')
        }
    }, [])

    const searchedOrders = useMemo(() => {
        if (!search) return orders
        return orders.filter(
            (order) =>
                order.username.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr')) ||
                order.customer.customername.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr'))
        )
    }, [orders, search])

    return (
        <Col variant='full'>
            <Card>
                <Card.Body>
                    <div className='flex flex-col'>
                        <div className='flex justify-end items-start mb-4'>
                            <Search />
                        </div>
                        <div className='flex flex-wrap items-center mr-2 px-2'>
                            <span className='flex-1 basis-[calc(10%_-_0.50rem)] max-[900px]:basis-[calc(22%_-_0.50rem)] max-[768px]:basis-[calc(25%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-text-dark-light dark:text-text-dark-dark'>
                                {t('username')}
                            </span>
                            <span className='flex-1 basis-[calc(62%_-_0.50rem)] max-[900px]:basis-[calc(43%_-_0.50rem)] max-[768px]:basis-[calc(30%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-text-dark-light dark:text-text-dark-dark'>
                                {t('products')}
                            </span>
                            <span className='flex-1 basis-[calc(16%_-_0.50rem)] max-[900px]:basis-[calc(19%_-_0.50rem)] max-[768px]:basis-[calc(25%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-text-dark-light dark:text-text-dark-dark text-center'>
                                {t('total_price')}
                            </span>
                            <span className='flex-1 basis-[calc(12%_-_0.50rem)] max-[900px]:basis-[calc(16%_-_0.50rem)] max-[768px]:basis-[calc(20%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-text-dark-light dark:text-text-dark-dark text-center'>
                                {t('date')}
                            </span>
                        </div>
                        <hr className='border-border-light dark:border-border-dark border-b-2 mb-4 -mx-2' />
                        <div className='flex flex-col gap-2 max-h-60 h-60 overflow-y-auto scroller'>
                            {orders.length === 0 && (
                                <span className='text-lg text-center font-semibold py-2'>Henüz oluşturulmuş bir sipariş yok.</span>
                            )}
                            {usertype === 'admin' || usertype === 'boss' || usertype.includes('manager') ? (
                                <>
                                    {searchedOrders.map((order, indx) => (
                                        <Modal
                                            className='flex flex-wrap items-center bg-border-light dark:bg-border-dark rounded p-2 cursor-pointer select-none'
                                            key={indx}
                                            width='5xl'
                                            text={
                                                <>
                                                    <span className='basis-[calc(10%_-_0.50rem)] max-[900px]:basis-[calc(22%_-_0.50rem)] max-[768px]:basis-[calc(25%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-left'>
                                                        {order.username}
                                                    </span>
                                                    <div className='basis-[calc(62%_-_0.50rem)] max-[900px]:basis-[calc(43%_-_0.50rem)] max-[768px]:basis-[calc(30%_-_0.50rem)] mx-1 overflow-x-auto scroller'>
                                                        <div className='flex flex-col gap-1 justify-center items-start'>
                                                            {order?.products?.map((product, index) => (
                                                                <div
                                                                    className='flex items-center flex-wrap w-full'
                                                                    key={index}
                                                                >
                                                                    <span className='basis-[calc(80%_-_0.5rem)] mx-1 overflow-x-auto scroller whitespace-nowrap text-left'>
                                                                        {product.product_name}{' '}
                                                                        <span className='text-sm italic'>
                                                                            (
                                                                            {Object.entries(product.attributes)
                                                                                .map(([key, value]) => `${key}: ${value}`)
                                                                                .join(', ')}
                                                                            )
                                                                        </span>
                                                                    </span>
                                                                    <span className='basis-[calc(20%_-_0.5rem)] mx-1 whitespace-nowrap overflow-x-auto scroller'>
                                                                        {product.quantity} {product.productType}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                            {order?.sets?.map((set, index) => (
                                                                <div
                                                                    className='flex items-center flex-wrap w-full'
                                                                    key={index}
                                                                >
                                                                    <span className='basis-[calc(20%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller text-left'>
                                                                        {set.set_name}
                                                                    </span>
                                                                    <span className='basis-[calc(60%_-_0.5rem)] mx-1 overflow-x-auto scroller whitespace-nowrap text-left flex flex-col gap-0.5'>
                                                                        {set.products.map((product, _indx) => (
                                                                            <span key={_indx}>
                                                                                {product.product_name} x{product.quantity} ({product.productType}){' '}
                                                                                {' ==> '}
                                                                                <span className='text-sm italic'>
                                                                                    (
                                                                                    {Object.entries(product.attributes)
                                                                                        .map(([key, value]) => `${key}: ${value}`)
                                                                                        .join(', ')}
                                                                                    )
                                                                                </span>
                                                                            </span>
                                                                        ))}
                                                                    </span>
                                                                    <span className='basis-[calc(20%_-_0.5rem)] mx-1 whitespace-nowrap overflow-x-auto scroller'>
                                                                        {set.quantity} {set.productType}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className='basis-[calc(16%_-_0.50rem)] max-[900px]:basis-[calc(19%_-_0.50rem)] max-[768px]:basis-[calc(25%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-center'>
                                                        {formatDigits(order.total_with_tax)} {order.currency_code}
                                                    </span>
                                                    <span className='basis-[calc(12%_-_0.50rem)] max-[900px]:basis-[calc(16%_-_0.50rem)] max-[768px]:basis-[calc(20%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-center'>
                                                        {order.order_date.split('T')[0]}
                                                    </span>
                                                </>
                                            }
                                        >
                                            {({ close }) => (
                                                <Order
                                                    closeModal={close}
                                                    order={order}
                                                />
                                            )}
                                        </Modal>
                                    ))}
                                </>
                            ) : (
                                searchedOrders.map((order, indx) => (
                                    <div
                                        className='flex flex-wrap bg-border-light dark:bg-border-dark rounded p-2'
                                        key={indx}
                                    >
                                        <span className='basis-[calc(10%_-_0.50rem)] max-[900px]:basis-[calc(22%_-_0.50rem)] max-[768px]:basis-[calc(25%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-left'>
                                            {order.username}
                                        </span>
                                        <div className='basis-[calc(62%_-_0.50rem)] max-[900px]:basis-[calc(43%_-_0.50rem)] max-[768px]:basis-[calc(30%_-_0.50rem)] mx-1 overflow-x-auto scroller'>
                                            <div className='flex flex-col gap-1 justify-center items-start'>
                                                {order?.products?.map((product, index) => (
                                                    <div
                                                        className='flex items-center flex-wrap w-full'
                                                        key={index}
                                                    >
                                                        <span className='basis-[calc(80%_-_0.5rem)] mx-1 overflow-x-auto scroller whitespace-nowrap text-left'>
                                                            {product.product_name}{' '}
                                                            <span className='text-sm italic'>
                                                                (
                                                                {Object.entries(product.attributes)
                                                                    .map(([key, value]) => `${key}: ${value}`)
                                                                    .join(', ')}
                                                                )
                                                            </span>
                                                        </span>
                                                        <span className='basis-[calc(20%_-_0.5rem)] mx-1 whitespace-nowrap overflow-x-auto scroller'>
                                                            {product.quantity} {product.productType}
                                                        </span>
                                                    </div>
                                                ))}
                                                {order?.sets?.map((set, index) => (
                                                    <div
                                                        className='flex items-center flex-wrap w-full'
                                                        key={index}
                                                    >
                                                        <span className='basis-[calc(20%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller text-left'>
                                                            {set.set_name}
                                                        </span>
                                                        <span className='basis-[calc(60%_-_0.5rem)] mx-1 overflow-x-auto scroller whitespace-nowrap text-left flex flex-col gap-0.5'>
                                                            {set.products.map((product, indx) => (
                                                                <span>
                                                                    {product.product_name} x{product.quantity} ({product.productType}) {' ==> '}
                                                                    <span className='text-sm italic'>
                                                                        (
                                                                        {Object.entries(product.attributes)
                                                                            .map(([key, value]) => `${key}: ${value}`)
                                                                            .join(', ')}
                                                                        )
                                                                    </span>
                                                                </span>
                                                            ))}
                                                        </span>
                                                        <span className='basis-[calc(20%_-_0.5rem)] mx-1 whitespace-nowrap overflow-x-auto scroller'>
                                                            {set.quantity} {set.productType}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <span className='basis-[calc(16%_-_0.50rem)] max-[900px]:basis-[calc(19%_-_0.50rem)] max-[768px]:basis-[calc(25%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-center'>
                                            {formatDigits(order.total_with_tax)} {order.currency_code}
                                        </span>
                                        <span className='basis-[calc(12%_-_0.50rem)] max-[900px]:basis-[calc(16%_-_0.50rem)] max-[768px]:basis-[calc(20%_-_0.50rem)] mx-1 overflow-hidden text-ellipsis whitespace-nowrap text-center'>
                                            {order.order_date.split('T')[0]}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Orders
