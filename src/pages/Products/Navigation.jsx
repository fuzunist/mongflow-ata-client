import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const Navigation = ({ page, setPage }) => {
    const pages = ['products', 'otherProducts']
    const { t } = useTranslation()

    return (
        <div className='flex max-[576px]:flex-col justify-between min-[576px]:items-center gap-y-4 mb-6'>
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
        </div>
    )
}

export default Navigation
