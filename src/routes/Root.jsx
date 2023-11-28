import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { verify } from '@/services/auth'
import { setUser } from '@/store/actions/user'
import { promiseAll } from '@/store/actions/apps'

import Loader from '@/components/Loader'

const Root = () => {
    const [cookies] = useCookies(['access_token', 'refresh_token'])
    const navigate = useNavigate()

    const verifyHandle = async () => {
        const beforePathname = sessionStorage.getItem('beforePathname')
        console.log('verifyHandle - beforePathnam: ', beforePathname)

        if (!cookies?.access_token) return navigate('/auth/login')
        const response = await verify(cookies?.access_token)
        if (response?.error) return navigate('/auth/login')
        setUser({ ...response, tokens: { access_token: cookies.access_token, refresh_token: cookies.refresh_token } })
        promiseAll(cookies.access_token, response.usertype)
        navigate('/dashboard')
    }

    useEffect(() => {
        verifyHandle()
    }, [])

    return <Loader />
}

export default Root
