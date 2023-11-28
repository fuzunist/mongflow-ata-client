import Sorter from '@/components/Sorter'
import Search from '@/components/Search'
import Filter from '@/components/Filter'

const Header = () => {
    return (
        <div className='flex max-[576px]:flex-col justify-between gap-y-4 mb-6 min-[576px]:items-center'>
            <Search />
            <Filter />
            <Sorter />
        </div>
    )
}

export default Header
