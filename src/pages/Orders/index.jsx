import Row from '@/components/Row'
// No need for Header as you mentioned you don't want it for orders.
import Order from './Order' // Importing the Order component instead of Product
import { useFilter, useOrders, useSearch, useSorter } from '@/store/hooks/apps' // Assuming you have a similar hook for orders
import { useMemo } from 'react'
import { useUser } from '@/store/hooks/user'
import Header from './Header'
import { useEffect } from 'react'
import { setFilter, setSearch, setSorter } from '@/store/actions/apps'
import { useTranslation } from 'react-i18next'
import Navigation from './Navigation'
import { useState } from 'react'

const Orders = () => {
    const user = useUser()
    const orders = useOrders()
    const search = useSearch()
    const filter = useFilter()
    const sorter = useSorter()
    const { t } = useTranslation()
    const [page, setPage] = useState('myOrders')

    // siparişler arasından kullanıcıya ait olanlar ayıklanır.
    const myOrders = useMemo(() => {
        if (!user.userid) return [[], []]
        if (!orders.length) return [[], []]
        return [
            orders.filter((order) => order.userid === user.userid && order.status === 0),
            orders.filter((order) => order.userid !== user.userid && order.status === 0)
        ]
    }, [user, orders])

    const myPendingOrders = useMemo(() => {
        if (!user.userid) return []
        if (!orders.length) return []
        return orders.filter((order) => order.userid === user.userid && order.status !== 0)
    }, [user, orders])

    const searchedOrders = useMemo(() => {
        if (!search) return [myOrders[0], myOrders[1]]
        return [
            myOrders[0].filter(
                (order) =>
                    order.products.some((product) => product.product_name.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr'))) ||
                    order.order_number.startsWith(search) ||
                    order.customer.companyname.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr'))
            ),
            myOrders[1].filter(
                (order) =>
                    order.products.some((product) => product.product_name.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr'))) ||
                    order.order_number.startsWith(search) ||
                    order.customer.companyname.toLocaleLowerCase('tr').startsWith(search.toLocaleLowerCase('tr'))
            )
        ]
    }, [myOrders, search])

    const sortedOrders = useMemo(() => {
        const _searchOrders = [[...searchedOrders[0]], [...searchedOrders[1]]]

        switch (sorter) {
            case 'date_old_to_new':
                return [_searchOrders[0].sort((a, b) => a.order_id - b.order_id), _searchOrders[1].sort((a, b) => a.order_id - b.order_id)]
            case 'date_new_to_old':
                return [_searchOrders[0].sort((a, b) => b.order_id - a.order_id), _searchOrders[1].sort((a, b) => b.order_id - a.order_id)]
            default:
                return [_searchOrders[0], _searchOrders[1]]
        }
    }, [searchedOrders, sorter])

    const filteredOrders = useMemo(() => {
        const _filteredOrders = [[...sortedOrders[0]], [...sortedOrders[1]]]

        switch (filter) {
            case 1:
                return [
                    _filteredOrders[0].filter((order) => order.order_status === 'İş Alındı'),
                    _filteredOrders[1].filter((order) => order.order_status === 'İş Alındı')
                ]
            case 2:
                return [
                    _filteredOrders[0].filter((order) => order.order_status === 'Hazırlıklar Başladı'),
                    _filteredOrders[1].filter((order) => order.order_status === 'Hazırlıklar Başladı')
                ]
            case 3:
                return [
                    _filteredOrders[0].filter((order) => order.order_status === 'İş Tamamen Bitti'),
                    _filteredOrders[1].filter((order) => order.order_status === 'İş Tamamen Bitti')
                ]
            default:
                return [_filteredOrders[0], _filteredOrders[1]]
        }
    }, [sortedOrders, filter])

    useEffect(() => {
        setSearch('')
        setFilter(0)
        setSorter('suggested')

        return () => {
            setSearch('')
            setFilter(0)
            setSorter('suggested')
        }
    }, [])

     console.log("userrr tyyype:", user.usertype)
    return (
        <>
            <Header />
            <Navigation
                usertype={user.usertype}
                page={page}
                setPage={setPage}
                t={t}
                myOrders={[...myOrders[0]].concat(...myPendingOrders)}
            />
            {page === 'myOrders' && myPendingOrders.length > 0 && (
                <Row >
                    <div className='flex flex-col pt-6 px-2 rounded border-2 border-alert-danger-fg-light dark:border-alert-danger-fg-dark w-full mx-4 mb-6 relative'>
                        <span className='absolute -top-5 left-2 py-2 px-4 text-lg font-semibold bg-body-bg-light dark:bg-body-bg-dark'>
                            {/* {user.usertype!=="production_manager" ?  t('pending-orders') : t('pending-recipes') } */}
                           { t('pending-recipes')}
                        </span>
                        {myPendingOrders.map((order, index) => (
                            <Order
                                key={index}
                                order={order}
                            />
                        ))}
                    </div>
                </Row>
            )}
            <Row>
                {filteredOrders[page === 'myOrders' ? 0 : 1].map((order, index) => (
                    <Order
                        key={index}
                        order={order}
                    />
                ))}
            </Row>
        </>
    )
}

export default Orders
