import Card from '@/components/Card'
import Col from '@/components/Col'

import { useUser } from '@/store/hooks/user'
import { useTranslation } from 'react-i18next'
import { editOrder } from '@/store/actions/apps'
import { updateStatusInDB } from '@/services/order'

const Order = ({ order }) => {
    const user = useUser()
    const { t } = useTranslation()

    const onClick = async () => {
        const response = await updateStatusInDB(user.tokens.access_token, order.order_id, 0)
        if (response?.error) console.log(response.error)
        editOrder(response)
    }

    return (
        <Col variant='full'>
            <Card>
                <Card.Body>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <div className='flex-1 flex flex-col gap-1 text-black dark:text-white'>
                                <h4 className='text-2xl font-bold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {order.customer.companyname}
                                </h4>
                                <h5>({order.order_number})</h5>
                            </div>

                            <button
                                className='py-2 px-4 transition-all outline-none bg-green-600 hover:bg-green-500 text-white rounded'
                                onClick={onClick}
                            >
                                {t('approve')}
                            </button>
                        </div>
                        <div className='flex flex-col gap-2 border border-border-light dark:border-border-dark relative p-4 mt-4 mb-2'>
                            <span className='absolute -top-4 left-2 py-2 px-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap'>
                                {t('products')}
                            </span>
                            <div className='flex flex-wrap text-center font-medium'>
                                <span className='basis-[calc(35%_-_0.5rem)] mx-1 text-left'>{t('product')}</span>
                                <span className='basis-[calc(10%_-_0.5rem)] mx-1'>{t('quantity')}</span>
                                <span className='basis-[calc(12%_-_0.5rem)] mx-1'>{t('unitPrice')}</span>
                                <span className='basis-[calc(12%_-_0.5rem)] mx-1'>{t('totalPrice')}</span>
                                <span className='basis-[calc(31%_-_0.5rem)] mx-1'>{t('orderStatus')}</span>
                            </div>
                            <hr className='border-border-light dark:border-border-dark' />
                            {order?.products?.map((product, index) => (
                                <div
                                    className='flex flex-wrap items-center'
                                    key={index}
                                >
                                    <span className='basis-[calc(35%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5'>
                                        <span>{product.product_name}</span>
                                        <span className='text-sm'>
                                            {Object.entries(product.attributes)
                                                .map(([key, value]) => `${key}: ${value}`)
                                                .join(', ')}
                                        </span>
                                    </span>
                                    <span className='basis-[calc(10%_-_0.5rem)] mx-1 text-center'>{product.quantity}</span>
                                    <span className='basis-[calc(12%_-_0.5rem)] mx-1 text-center'>
                                        {product.unitPrice} {order?.currency_code}
                                    </span>
                                    <span className='basis-[calc(12%_-_0.5rem)] mx-1 text-center'>
                                        {product.totalPrice} {order?.currency_code}
                                    </span>
                                    <div className='basis-[calc(31%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]'>
                                        {product?.orderStatus ? (
                                            product.orderStatus.map((status, index) => (
                                                <span key={index}>
                                                    {status.quantity} {t('pieces').toLowerCase()}, {status.type}.
                                                </span>
                                            ))
                                        ) : (
                                            <span>
                                                {product.quantity} {t('pieces').toLowerCase()}, {OrderStatus[0]}.
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {order?.sets?.map((set, index) => (
                                <div
                                    className='flex flex-wrap items-center'
                                    key={index}
                                >
                                    <span className='basis-[calc(35%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5'>
                                        <span>{set.set_name}</span>
                                        <div className='flex flex-col text-sm'>
                                            {set.products.map((product, productIndex) => (
                                                <div key={productIndex}>
                                                    {product.product_name} x{product.quantity} ({product.productType}){' ==> '}
                                                    {Object.entries(product.attributes)
                                                        .map(([key, value]) => `${key}: ${value}`)
                                                        .join(', ')}
                                                </div>
                                            ))}
                                        </div>
                                    </span>
                                    <span className='basis-[calc(10%_-_0.5rem)] mx-1 text-center'>
                                        {set.quantity} ({set.productType})
                                    </span>
                                    <span className='basis-[calc(12%_-_0.5rem)] mx-1 text-center'>
                                        {set.unitPrice} {order?.currency_code}
                                    </span>
                                    <span className='basis-[calc(12%_-_0.5rem)] mx-1 text-center'>
                                        {set.totalPrice} {order?.currency_code}
                                    </span>
                                    <div className='basis-[calc(31%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]'>
                                        {set?.orderStatus ? (
                                            set.orderStatus.map((status, index) => (
                                                <span key={index}>
                                                    {status.quantity} {t('pieces').toLowerCase()}, {t(status.type)}.
                                                </span>
                                            ))
                                        ) : (
                                            <span>
                                                {set.quantity} {t('pieces').toLowerCase()}, {t(OrderStatus[0])}.
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <span className='text-right px-4'>
                            {t('taxed_total')}: {order?.total_with_tax} {order?.currency_code}
                        </span>
                        {order.currency_code !== 'TL' && (
                            <span className='text-right px-4'>
                                {t('exchange_rate')}: {order.exchange_rate} TL
                            </span>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Order
