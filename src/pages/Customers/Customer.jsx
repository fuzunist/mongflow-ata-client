import { Link } from 'react-router-dom'
import Card from '@/components/Card'
import Col from '@/components/Col'
import { setCustomer } from '@/store/actions/apps'

const Customer = ({ customer, authenticate }) => {
    const onClickHandle = () => {
        if (!authenticate) return null
        setCustomer(customer.customerid)
    }

    return (
        <Col variant='full'>
            <Card>
                <Card.Body
                    onClick={onClickHandle}
                    style={{ cursor: authenticate ? 'pointer' : 'default' }}
                >
                    <div className='flex items-center justify-between max-[768px]:flex-col gap-y-2 select-none'>
                        {/* Customer Name (left) */}
                        <h5 className='min-[768px]:px-2 text-lg text-text-dark-light dark:text-text-dark-dark font-medium w-1/5 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {customer?.customername}
                        </h5>

                        {/* Email (next column) */}
                        <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`mailto:${customer?.email}`}
                            className='min-[768px]:px-2 text-lg text-link-fg-light hover:text-link-hover-light transition-colors w-1/5 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap'
                        >
                            {customer?.email}
                        </Link>

                        {/* Company Name (next column) */}
                        <span className='min-[768px]:px-2 text-lg w-1/5 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {customer?.companyname}
                        </span>

                        {/* Phone (next column) */}
                        <span className='min-[768px]:px-2 text-lg w-1/5 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {customer?.phone}
                        </span>

                        {/* Address (right) */}
                        <p className='min-[768px]:px-2 text-lg w-1/5 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                            {customer?.address}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Customer
