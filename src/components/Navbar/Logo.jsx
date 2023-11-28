import { Link } from 'react-router-dom'
// import { useWindowSize } from 'react-use'

// import LogoSM from '@/assets/img/logo-sm.png'
// import LogoDark from '@/assets/img/logo-dark.png'
// import LogoLight from '@/assets/img/logo-light.png'
import NewLogo from '@/assets/img/logo-mg.png'
// import { useDarkMode } from '@/store/hooks/theme'

const Logo = () => {
    // const { width } = useWindowSize()

    // const darkMode = useDarkMode()

    return (
        <Link
            to='/'
            className='max-[992px]:w-[70px] w-[240px] float-left flex justify-center items-center h-full bg-leftbar-light dark:bg-leftbar-dark'
        >
            <img
                // src={width < 992 ? LogoSM : darkMode ? LogoLight : LogoDark}
                src={NewLogo}
                // className='max-[992px]:h-[22px] h-4'
                width='60%'
            />
        </Link>
    )
}

export default Logo
