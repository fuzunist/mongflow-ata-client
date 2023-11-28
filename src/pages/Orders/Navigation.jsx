import ordersToExcel from '@/utils/ordersToExcel'
import classNames from 'classnames'

const Navigation = ({ usertype, page, setPage, t, myOrders }) => {
    const pages = ['myOrders', 'allOrders']

    return (
        <div className='flex max-[576px]:flex-col justify-between min-[576px]:items-center gap-y-4 mb-6'>
            {usertype === 'admin' || usertype === 'stock_manager' ? (
                <div className='flex items-center mb-3 -mt-3'>
                    {pages.map((item, index) => (
                        <div
                            key={index}
                            className={classNames('py-2 px-4 cursor-pointer font-semibold', {
                                'border-r border-border-light dark:border-border-dark': index < pages.length - 1,
                                'text-text-dark-light dark:text-text-dark-dark': item === page,
                                'hover:text-text-dark-light dark:hover:text-text-dark-dark': item !== page
                            })}
                            onClick={() => page !== item && setPage(item)}
                        >
                            {t(item)}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='block' />
            )}
            <button
                className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4'
                onClick={() => ordersToExcel(myOrders)}
            >
                {t('saveAsExcel')}
            </button>
        </div>
    )
}

export default Navigation
