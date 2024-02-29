import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const Navigation = ({ page, setPage }) => {
    const pages = [{id:1, name: "Müşteri"}, {id:2, name: "Tedarikçi"}, {id:3, name: "İhracat"}, {id:4, name: "İthalat"}, {id:5, name: "Yeni Müşteri"}]
    const { t } = useTranslation()

    return (
        <div className='flex max-[576px]:flex-col justify-between min-[576px]:items-center gap-y-4 mb-6 mt-4 '>
            <div className='flex items-center mb-3 -mt-3'>
                {pages.map((item, index) => (
                    <div
                        key={index}
                        className={classNames('py-2 px-4 cursor-pointer font-semibold', {
                            'border-r border-border-light dark:border-border-dark': index < pages.length - 1,
                            'text-text-dark-light dark:text-text-dark-dark': item.id === page,
                            'hover:text-text-dark-light dark:hover:text-text-dark-dark': item.id !== page
                        })}
                        onClick={() => page !== item.id && setPage(item.id)}
                    >
                        {t(item.name)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navigation
