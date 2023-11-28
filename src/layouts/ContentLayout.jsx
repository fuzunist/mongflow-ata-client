import Footer from '@/components/Footer'
import LeftSideMenu from '@/components/LeftSideMenu'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import { useLoading } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { socket } from '@/utils/socket'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const ContentLayout = () => {
    const user = useUser()
    const loading = useLoading()

    useEffect(() => {
        return () => {
            socket.disconnect()
        }
    }, [])

    if (!user.tokens.access_token) return <Navigate to='/' />

    if (loading) return <Loader />

    socket.connect()

    return (
        <div className='w-full h-full overflow-hidden'>
            <Navbar />
            <LeftSideMenu />
            <div className='min-[992px]:ml-[240px] min-h-[calc(100vh-70px)] mt-[70px] pt-6 px-3 max-h-[calc(100vh-70px)] overflow-y-auto scroller'>
                <div className='w-full px-3 min-h-[calc(100vh-152.6px)]'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ContentLayout
