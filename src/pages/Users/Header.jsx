import Search from '@/components/Search'

const Header = () => {
    return (
        <div className='flex max-[576px]:flex-col justify-between gap-y-4 mb-6'>
            <Search />
        </div>
    )
}

export default Header
