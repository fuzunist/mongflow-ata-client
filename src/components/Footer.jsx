import { Link } from 'react-router-dom'

const navs = [
    {
        title: 'About Us',
        to: '/'
    },
    {
        title: 'Help',
        to: '/'
    },
    {
        title: 'Contact Us',
        to: '/'
    }
]

const Footer = () => {
    return (
        <footer className='-mx-3 bg-footer-bg-light dark:bg-footer-bg-dark text-footer-fg-light dark:text-footer-fg-dark pt-[19px] px-[15px] pb-5 flex justify-between max-[768px]:justify-center items-center'>
            <div>
                2023 © MG Demir Çelik Yazılımı{' '}
                <Link
                    to='/'
                    className='text-link-fg-light dark:text-link-fg-dark hover:text-link-hover-light hover:dark:text-link-hover-dark transition-colors'
                >
                    Mongery Yazılım tarafından yapılmıştır.
                </Link>
            </div>
            <div className='flex justify-end items-center gap-4 max-[768px]:hidden'>
                {navs.map((nav, index) => (
                    <Link
                        key={index}
                        to={nav.to}
                        className='hover:text-footer-hover-light dark:hover:text-footer-hover-dark'
                    >
                        {nav.title}
                    </Link>
                ))}
            </div>
        </footer>
    )
}

export default Footer
