import FormikForm from '@/components/FormikForm'
import { forgetPassword } from '@/services/auth'
import { LockIcon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    const { t } = useTranslation()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const initialValues = {
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
        if (!values.email) errors.email = 'Required'
        return errors
    }

    const onSubmitHandle = async (values) => {
        const response = await forgetPassword(values.email)
        if (response?.error) return setError('hata')

        setSuccess('Bağlantınız gönderilmiştir.')
    }

    return (
        <>
            <Helmet>
                <title>Adminto - {t('resetPassword')}</title>
            </Helmet>
            <div className='flex flex-col p-9 bg-card-bg-light dark:bg-card-bg-dark w-full rounded-md'>
                <div className='text-center font-semibold uppercase mb-6 text-lg text-text-dark-light dark:text-text-dark-dark'>
                    {t('resetPassword')}
                </div>
                <p className='text-[13px] text-center mb-9 px-2'>{t('enterEmail')}</p>
                <FormikForm
                    initialValues={initialValues}
                    onSubmit={onSubmitHandle}
                    error={error}
                    validate={validate}
                />
            </div>
            <div className='mt-6'>
                <Link to='/auth/login'>{t('backTo')}</Link>
            </div>
        </>
    )
}

export default ForgetPassword
