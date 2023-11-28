import FormikForm from '@/components/FormikForm'
import { login } from '@/services/auth'
import { promiseAll } from '@/store/actions/apps'
import { setUser } from '@/store/actions/user'
import { LockIcon } from 'lucide-react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
    const { t } = useTranslation()

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const [_, setCookies] = useCookies(['access_token', 'refresh_token'])

    const initialValues = {
        username: {
            tag: 'input',
            type: 'text',
            placeholder: t('username'),
            label: t('username'),
            value: ''
        },
        password: {
            tag: 'input',
            type: 'password',
            placeholder: t('password'),
            label: t('password'),
            value: ''
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.username) errors.username = 'Required'
        if (!values.password) errors.password = 'Required'
        return errors
    }

    const onSubmitHandle = async (values) => {
        const response = await login(values.username, values.password)
        if (response?.error) return setError(response.error)

        setCookies('access_token', response.tokens.access_token, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) })
        setCookies('refresh_token', response.tokens.refresh_token, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) })

        setUser(response)
        promiseAll(response.tokens.access_token, response.usertype)
        navigate('/dashboard')
    }

    return (
        <>
            <Helmet>
                <title>Adminto - {t('signIn')}</title>
            </Helmet>
            <div className='flex flex-col p-9 bg-card-bg-light dark:bg-card-bg-dark w-full rounded-md'>
                <div className='text-center font-semibold uppercase mb-9 text-lg text-text-dark-light dark:text-text-dark-dark'>{t('signIn')}</div>
                <FormikForm
                    initialValues={initialValues}
                    onSubmit={onSubmitHandle}
                    error={error}
                    validate={validate}
                />
            </div>
            <div className='flex flex-col'>
                <div className='mt-6'>
                    <Link
                        to='/auth/forget-password'
                        className='flex gap-2 justify-center items-center'
                    >
                        <LockIcon
                            size={16}
                            strokeWidth={2}
                        />
                        {t('forgetYourPassword')}
                    </Link>
                </div>
                <div className='mt-6'>
                    {t('dontHaveAnAccount')}
                    <Link
                        to='/auth/register'
                        className='text-text-dark-light dark:text-text-dark-dark font-bold'
                    >
                        {` `}
                        {t('signUp')}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Login
