import Row from '@/components/Row'
import Header from './Header'
import Customer from './Customer'
import { useCustomer, useCustomers, useSearch } from '@/store/hooks/apps'
import Modal from '@/components/Modal'
import CreateCustomer from '@/modals/CreateCustomer'
import { setCustomer } from '@/store/actions/apps'
import { useMemo } from 'react'
import { useUser } from '@/store/hooks/user'

const Customers = () => {
    const customers = useCustomers()
    const selectedCustomer = useCustomer()
    const searchValue = useSearch()
    const user = useUser()

    const authenticate = useMemo(() => ['admin', 'stock_manager'].includes(user.usertype), [user])

    const closeModal = () => setCustomer(null)

    const filteredCustomers = useMemo(() => {
        if (!searchValue) return customers

        return customers.filter((customer) => customer.customername.toLowerCase().startsWith(searchValue.toLowerCase()))
    }, [searchValue, customers])

    return (
        <>
            <Header authenticate={authenticate} />
            <Row>
                {filteredCustomers.map((customer, index) => (
                    <Customer
                        key={index}
                        customer={customer}
                        authenticate={authenticate}
                    />
                ))}
            </Row>
            <Modal
                directRender={!!selectedCustomer}
                closeModal={closeModal}
            >
                <CreateCustomer
                    closeModal={closeModal}
                    selectedCustomer={selectedCustomer}
                />
            </Modal>
        </>
    )
}

export default Customers
