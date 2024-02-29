import Row from '@/components/Row'
import Header from './Header'
import Product from './Product'
import { useProduct, useProducts, useSearch, useSets } from '@/store/hooks/apps'
import { useMemo, useState } from 'react'
import Modal from '@/components/Modal'
import CreateProduct from '@/modals/CreateProduct'
import { setProduct } from '@/store/actions/apps'
import { useUser } from '@/store/hooks/user'
import Set from './Set'

const Products = () => {
    const products = useProducts()
    const sets = useSets()
    const selectedProduct = useProduct()
    const searchValue = useSearch()
    const user = useUser()
    const [page, setPage] = useState('products')

    const authenticate = useMemo(() => ['boss', 'stock_manager'].includes(user.usertype), [user])

    const closeModal = () => setProduct(null)

    const filteredProducts = useMemo(() => {
    

        const normal_products = products.filter((product) => product.product_type === (page === 'products' ? 0 : page==="recipeMaterialProducts" ? 1 : 2))

        if (!searchValue) return normal_products

        return normal_products.filter((product) => product.product_name.toLowerCase().startsWith(searchValue.toLowerCase()))
    }, [searchValue, products, page])

    const filteredSets = useMemo(() => {
        if (page === 'otherProducts') return []
        if (!searchValue) return sets
        return sets.filter((set) => set.set_name.toLowerCase().startsWith(searchValue.toLowerCase()))
    }, [searchValue, sets, page])

    return (
        <>
            <Header
                authenticate={authenticate}
                page={page}
                setPage={setPage}
                type={page === 'products' ? 0 : page==="recipeMaterialProducts" ? 1 : 2}
            />

            <Row>
                {filteredProducts.map((product, index) => (
                    <Product
                        key={index}
                        product={product}
                        authenticate={authenticate}
                    />
                ))}
                {filteredSets.map((set, index) => (
                    <Set
                        key={index}
                        set={set}
                        authenticate={authenticate}
                    />
                ))}
            </Row>
            <Modal
                directRender={!!selectedProduct}
                closeModal={closeModal}
            >
                <CreateProduct
                    closeModal={closeModal}
                    selectedProduct={selectedProduct}
                    type={page === 'products' ? 0 : page==="recipeMaterialProducts" ? 1 : 2}

                />
            </Modal>
        </>
    )
}

export default Products
