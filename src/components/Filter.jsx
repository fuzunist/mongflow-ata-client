import { useFilter } from '@/store/hooks/apps'
import { setFilter } from '@/store/actions/apps'
import { useTranslation } from 'react-i18next'

const Filter = () => {
    const filter = useFilter()
    const { t } = useTranslation()

    const options = ['all', 'İş Alındı', 'Hazırlıklar Başladı', 'İş Tamamen Bitti']

    return (
        <div className='relative flex gap-2 items-center'>
            <span className='font-medium text-lg'>{t('filter')}: </span>
            <div className='flex flex-col gap-1 text-sm leading-none select-none'>
                {options.map((option, index) => (
                    <label key={index}>
                        <input
                            type='radio'
                            value={index}
                            checked={filter === index}
                            onChange={(e) => setFilter(parseInt(e.target.value))}
                        />{' '}
                        {t(option)}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default Filter
