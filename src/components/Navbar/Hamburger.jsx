import { useWindowSize } from 'react-use'
import { MenuIcon } from 'lucide-react'
import { useLeftSideBarIsOpen } from '@/store/hooks/leftsidebar'
import { closeLeftSideBar, openLeftSideBar } from '@/store/actions/leftsidebar'

const Hamburger = () => {
    const { width } = useWindowSize()
    const isOpen = useLeftSideBarIsOpen()
    if (width >= 992) return null
    return (
        <button
            className='flex w-[70px] h-full justify-center items-center'
            onClick={isOpen ? closeLeftSideBar : openLeftSideBar}
        >
            <MenuIcon
                size={28}
                strokeWidth={2}
            />
        </button>
    )
}

export default Hamburger
