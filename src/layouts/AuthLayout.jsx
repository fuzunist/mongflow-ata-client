import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

// import LogoDark from '@/assets/img/logo-dark.png'
// import LogoLight from '@/assets/img/logo-light.png'
import NewLogo from '@/assets/img/logo-mg.png'

const AuthLayout = () => {
    // const mode = document.body.classList.contains('dark') ? 'dark' : 'light'

    useEffect(() => {
        document.querySelector('#root').classList.add('authenticated-bg')
        return () => {
            document.querySelector('#root').classList.remove('authenticated-bg')
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center py-[72px]'>
            <div className='authcontainer'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center gap-4 px-4 min-[1200px]:w-1/3 min-[992px]:w-1/2 min-[768px]:w-2/3 w-full'>
                        {/* <div className='flex flex-col items-center justify-center'>
                            <Link
                                to='/'
                                className='flex justify-center items-center'
                            >
                                <img
                                    // src={mode === 'dark' ? LogoLight : LogoDark}
                                    src={NewLogo}
                                    // height={22}
                                    // width={134.75}
                                    width='60%'
                                    alt=''
                                />
                            </Link>
                            <p className='mb-9 mt-3 text-light-fg-secondary dark:text-dark-fg-secondary'>Responsive Admin Dashboard</p>
                        </div> */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
