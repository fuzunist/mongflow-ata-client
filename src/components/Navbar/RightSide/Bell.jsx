import Badge from '@/components/Badge'
import { clearReads, setRead } from '@/store/actions/notifications'
import { useOrders, useProductions } from '@/store/hooks/apps'
import { useNotifications } from '@/store/hooks/notifications'
import { dateToIsoFormatWithTimezoneOffset } from '@/utils/helpers'
import { Popover, Transition } from '@headlessui/react'
import { BellIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Bell = () => {
    const { t } = useTranslation()
    const notifications = useNotifications()
    // const stocks = useStocks()
    const productions = useProductions()
    const orders = useOrders()

    useEffect(() => {
        if (!!notifications.lastReads) {
            const date = dateToIsoFormatWithTimezoneOffset(new Date())
            notifications.lastReads !== date && clearReads()
        }
    }, [])

    const notification = useMemo(() => {
        return {
            newCount: notifications.orders.news.concat(notifications.stocks.news).length,
            notifications: {
                // stocks: notifications.stocks.news.concat(notifications.stocks.reads),
                orders: notifications.orders.news.concat(notifications.orders.reads),
                productions: notifications.productions.news.concat(notifications.productions.reads)
            }
        }
    }, [notifications])

    return (
        <Popover className='min-[600px]:relative h-full'>
            <Popover.Button
                className={({ open }) =>
                    `flex justify-center items-center h-full px-[15px] max-[428px]:px-3 cursor-pointer transition-colors outline-none ${
                        open ? 'bg-navlink-light/[0.05] dark:bg-navlink-dark/[0.05]' : ''
                    }`
                }
                onClick={() => setRead()}
            >
                <BellIcon size={20} />
                {!!notification.newCount && (
                    <div className='absolute inline-block top-4 right-4 w-3 h-3'>
                        <Badge variant='danger'>{notification.newCount}</Badge>
                    </div>
                )}
            </Popover.Button>
            <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
                className='absolute top-full z-[100] rounded min-w-[320px] max-[600px]:!left-[10px] max-[600px]:!right-[10px] right-0 bg-dropdown-bg-light dark:bg-dropdown-bg-dark shadow-box'
            >
                <Popover.Panel className='flex flex-col py-2 px-4 gap-2 max-h-32'>
                    {!!(
                        // notification.notifications.stocks.length +
                        notification.notifications.orders.length +
                        notification.notifications.productions.length
                    ) ? (
                        <>
                            {Object.entries(notification.notifications).map(([key, value], indx) => {
                                return value?.map((notification, index) => (
                                    <div key={index + indx * 1000}>
                                        {key === 'orders' &&
                                            `${orders.find((order) => order.order_id === notification)?.username}, ${t('added a new order.')}`}

                                        {/* {key === 'stocks' &&
                                            `${stocks.find((stock) => stock.stock_id === notification).constituent_username}, ${t(
                                                'added a new daily stock.'
                                            )}`} */}

                                        {key === 'productions' &&
                                            `${productions.find((production) => production.production_id === notification).constituent_username}, ${t(
                                                'added a new daily production.'
                                            )}`}
                                    </div>
                                ))
                            })}
                        </>
                    ) : (
                        <div>{t('NotificationNotExist')}</div>
                    )}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default Bell
