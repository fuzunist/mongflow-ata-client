import { useOrders } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const PendingOrderNumbers = () => {
    const user = useUser()
    const orders = useOrders()
    const { t } = useTranslation()

    const myPendingOrders = useMemo(() => {
        if (!user.userid) return []
        if (!orders.length) return []
        return orders.filter((order) => order.userid === user.userid && (order.status.length===2 || order.status.length===3 ))
    }, [user, orders])

    if (myPendingOrders.length === 0) return null

    return (
        <div className='mt-4 -mb-4 flex flex-col justify-center items-center'>
            <span className='text-alert-danger-fg-light dark:text-alert-danger-fg-dark text-sm font-semibold text-center px-4'>
                {t('pendingOrderNumber', { number: myPendingOrders.length })}
            </span>
        </div>
    )
}

export default PendingOrderNumbers
