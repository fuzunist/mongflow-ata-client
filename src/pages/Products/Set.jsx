import Card from '@/components/Card'
import Col from '@/components/Col'
import { useNavigate } from 'react-router-dom'

const Set = ({ set, authenticate }) => {
    const navigate = useNavigate()

    const onClickHandle = () => {
        if (!authenticate) return console.log('Set onClick Handle not permission')
        console.log('Set onClick Handle')
        navigate(`edit-set/${set.set_id}`)
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
                            {set?.set_name}
                        </h5>
                        <div className='min-[768px]:flex-1 max-[768px]:w-full flex flex-col justify-center items-start gap-x-4 min-[768px]:p-2 py-2 overflow-x-auto scroller'>
                            {set?.products.map((product, indx) => (
                                <div
                                    key={indx}
                                    className='flex justify-center items-center gap-4 whitespace-nowrap min-w-max'
                                >
                                    <span className='text-base font-bold text-text-dark-light dark:text-text-dark-dark'>
                                        {product.product_name}
                                        {` `}
                                        <span className='text-sm font-medium text-body-fg-light dark:text-body-fg-dark'>
                                            x{product.quantity} ({product.productType})
                                        </span>
                                    </span>
                                    {`==>`}
                                    <div className='flex-1 flex justify-start items-center gap-x-4'>
                                        {Object.entries(product?.attributes)
                                            .map(([attrName, attrValue]) => `${attrName}: ${attrValue}`)
                                            .join(', ')}
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

export default Set
