import Hamburger from './Hamburger'
import Logo from './Logo'
import RightSide from './RightSide'
import Title from './Title'

const Navbar = () => {
    return (
        <div className='bg-topbar-light dark:bg-topbar-dark pr-3 fixed left-0 right-0 h-[70px] z-[1001] text-'>
            <RightSide />
            <Logo />
            <Hamburger />
            <Title />
        </div>
    )
}

export default Navbar
