import { useTranslation } from 'react-i18next'
import { PlusIcon } from 'lucide-react'
import classNames from 'classnames'

import { useProducts, useSets } from '@/store/hooks/apps'
import { setProduct, setSet } from '@/store/actions/apps'

import Card from '@/components/Card'
import Col from '@/components/Col'
import Modal from '@/components/Modal'
import CreateProduct from '@/modals/CreateProduct'
import { useUser } from '@/store/hooks/user'
import { useMemo } from 'react'

const Products = () => {
    const { t } = useTranslation()
    const products = useProducts()
    const sets = useSets()
    const user = useUser()

    const filteredProducts = useMemo(() => {
        const _filteredProducts = products.filter((product) => product.product_type === 0)
        _filteredProducts.push(...sets)
        return _filteredProducts
    }, [products, sets])

    return (
        <Col variant='1/2'>
            <Card>
                <Card.Body>
                    <div className='flex items-center justify-between mb-6'>
                        <h4 className='text-text-dark-light dark:text-text-dark-dark text-xl font-semibold py-1.5'>{t('products')}</h4>
                        {(user.usertype === 'admin' || user.usertype === 'stock_manager') && (
                            <Modal
                                className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2'
                                text={
                                    <>
                                        <PlusIcon
                                            size={14}
                                            strokeWidth={2}
                                        />{' '}
                                        {t('addProduct')}
                                    </>
                                }
                            >
                                {({ close }) => <CreateProduct closeModal={close} />}
                            </Modal>
                        )}
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
                                    onClick={() => (!!product.set_name ? setSet(product.set_id) : setProduct(product.product_id))}
                                    className='p-2 cursor-pointer select-none rounded'
                                >
                                    <h5 className='text-text-dark-light dark:text-text-dark-dark mb-1 leading-none font-medium'>
                                        {product.product_name || product.set_name}
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
