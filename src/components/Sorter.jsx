import { useSorter } from '@/store/hooks/apps'
import { setSorter } from '@/store/actions/apps'
import { useTranslation } from 'react-i18next'

const Sorter = () => {
    const sorter = useSorter()
    const { t } = useTranslation()

    // const sorterOptions = ['suggested', 'orderStatus_AHHS', 'orderStatus_SHHA', 'date_old_to_new', 'date_new_to_old']
    const sorterOptions = ['suggested', 'date_old_to_new', 'date_new_to_old']

    return (
        <div className='relative flex gap-2 items-center'>
            <span className='font-medium text-lg'>{t('sort')}: </span>
            <select
                className='py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                value={sorter}
                onChange={(e) => setSorter(e.target.value)}
            >
                {sorterOptions.map((option, index) => (
                    <option
                        key={index}
                        value={option}
                    >
                        {t(option)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Sorter
