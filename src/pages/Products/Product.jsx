import Card from '@/components/Card'
import Col from '@/components/Col'
import { setProduct } from '@/store/actions/apps'

const Product = ({ product, authenticate }) => {
    const onClickHandle = () => {
        if (!authenticate) return console.log('Product onClick Handle not permission')
        console.log('Product onClick Handle')
        setProduct(product.product_id)
    }

    return (
        <Col variant='full'>
            <Card>
                <Card.Body
                    onClick={onClickHandle}
                    style={{ cursor: !authenticate ? 'default' : 'pointer' }}
                >
                    <div className='flex items-center justify-between max-[768px]:flex-col gap-y-2 select-none'>
                        <h5 className='min-[768px]:px-2 text-lg text-text-dark-light dark:text-text-dark-dark font-medium w-1/5 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {product?.product_name}
                        </h5>
                        <div className='min-[768px]:flex-1 max-[768px]:w-full flex justify-start items-center gap-x-4 min-[768px]:p-2 py-2 overflow-x-auto scroller'>
                            {product?.attributes?.map((attr, index) => (
                                <div
                                    key={index}
                                    className='text-base font-normal relative border-2 border-border-light dark:border-border-dark rounded p-4'
                                >
                                    <span className='absolute -top-[8.1px] left-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap'>
                                        {attr.attribute_name}
                                    </span>
                                    <div className='flex justify-center items-center gap-4'>
                                        {attr.values.map((val, valIndex) => (
                                            <div
                                                key={valIndex}
                                                className='py-2 px-3 border-2 border-border-light dark:border-border-dark rounded whitespace-nowrap'
                                            >
                                                {val.value}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Product
