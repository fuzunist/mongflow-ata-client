import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { useProducts } from '@/store/hooks/apps'
import { setProduct } from '@/store/actions/apps'

import Card from '@/components/Card'
import Col from '@/components/Col'
import { useMemo } from 'react'

const Products = ({ type }) => {
    const { t } = useTranslation()
    const products = useProducts()

    const filteredProducts = useMemo(() => products.filter((product) => product.product_type === type), [products, type])

    return (
        <Col variant='1/2'>
            <Card>
                <Card.Body>
                    <div className='flex items-center justify-between mb-6'>
                        <h4 className='text-text-dark-light dark:text-text-dark-dark text-xl font-semibold py-1.5'>
                            {t(!!type ? 'otherProducts' : 'products')}
                        </h4>
                    </div>
                    <div className='max-h-[300px] overflow-y-auto scroller'>
                        {filteredProducts.map((product, index) => (
                            <div
                                key={index}
                                className={classNames('overflow-hidden py-3 relative', {
                                    'border-b border-dropdown-hr-light dark:border-dropdown-hr-dark': filteredProducts.length - 1 !== index
                                })}
                            >
                                <div
                                    onClick={() => setProduct(product.product_id)}
                                    className='p-2 cursor-pointer select-none rounded'
                                >
                                    <h5 className='text-text-dark-light dark:text-text-dark-dark mb-1 leading-none font-medium'>
                                        {product.product_name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Products
