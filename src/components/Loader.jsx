import Logo from '@/assets/img/logo-mg.png'

const Loader = ({ className }) => {
    return (
        <div className={`flex justify-center items-center w-full min-h-screen ${className ?? ''}`}>
            <img
                src={Logo}
                width='35%'
                alt=''
                // className='animate-bounce'
            />
        </div>
    )
}

export default Loader
