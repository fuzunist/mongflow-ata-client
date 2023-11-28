import FormikForm from '@/components/FormikForm'
import { resetPassword } from '@/services/auth'
import { useUser } from '@/store/hooks/user'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
    const user = useUser()
    const [error, setError] = useState('')
    const { t } = useTranslation()

    const initialValues = {
        password: {
            tag: 'input',
            type: 'password',
            value: ''
        },
        againPassword: {
            tag: 'input',
            type: 'password',
            value: ''
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.password) errors.password = 'Required'
        if (!values.againPassword) errors.againPassword = 'Required'

        if (values.password !== values.againPassword) {
            errors.password = 'does not match againPassword'
            errors.againPassword = 'does not match password'
        }

        return errors
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setError('')
        const response = await resetPassword(user.token, values.password)
        if (response?.error) setError(response.error)
        setSubmitting(false)
    }

    return (
        <FormikForm
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            error={error}
            title={t('resetPassword')}
        />
    )
}

export default ResetPassword
