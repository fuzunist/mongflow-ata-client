import FormikForm from '@/components/FormikForm'
import UserTypes from '@/constants/UserTypes'
import { register } from '@/services/auth'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [error, setError] = useState('')

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
        },
        email: {
            tag: 'input',
            type: 'email',
            placeholder: t('emailAddress'),
            label: t('emailAddress'),
            value: ''
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.username) errors.username = 'Required'
        if (!values.password) errors.password = 'Required'
        if (!values.email) errors.email = 'Required'
        return errors
    }

    const onSubmitHandle = async (values) => {
        const response = await register(values.username, values.email, values.password)
        if (response?.error) return setError(response.error?.detail || response.error)

        navigate('/auth/login')
    }
    return (
        <>
            <Helmet>
                <title>Adminto - {t('register')}</title>
            </Helmet>
            <div className='flex flex-col p-9 bg-card-bg-light dark:bg-card-bg-dark w-full rounded-md'>
                <div className='text-center font-semibold uppercase mb-9 text-lg text-text-dark-light dark:text-text-dark-dark'>{t('register')}</div>
                <FormikForm
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={onSubmitHandle}
                    error={error}
                />
            </div>
            <div className='mt-6'>
                {t('alreadyHaveAccount')}
                <Link
                    to='/auth/login'
                    className='text-text-dark-light dark:text-text-dark-dark font-bold'
                >
                    {` `}
                    {t('signIn')}
                </Link>
            </div>
        </>
    )
}

export default Register
