import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useSearch } from '@/store/hooks/apps'
import { setSearch } from '@/store/actions/apps'

const Search = () => {
    const { t } = useTranslation()
    const searchValue = useSearch()
    return (
        <div className='relative'>
            <input
                placeholder={t('search')}
                className='rounded-full bg-topsearch-light dark:bg-topsearch-dark border-topbar-light dark:border-topbar-dark py-2 px-6 outline-none w-full'
                value={searchValue}
                onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon
                size={14.4}
                strokeWidth={2}
                className='absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer pointer-events-none'
            />
        </div>
    )
}

export default Search
