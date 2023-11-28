import FormikForm from '@/components/FormikForm'
import { changePasswordFromDB } from '@/services/auth'
import { useState } from 'react'

const PasswordChanger = ({ user, t }) => {
    const [error, setError] = useState('')

    const initialValues = {
        oldPassword: {
            tag: 'input',
            type: 'password',
            placeholder: t('oldPassword'),
            label: t('oldPassword'),
            value: ''
        },
        newPassword: {
            tag: 'input',
            type: 'password',
            placeholder: t('newPassword'),
            label: t('newPassword'),
            value: ''
        },
        newPasswordAgain: {
            tag: 'input',
            type: 'password',
            placeholder: t('newPasswordAgain'),
            label: t('newPasswordAgain'),
            value: ''
        }
    }

    const onValidate = (values) => {
        const errors = {}
        if (!values.oldPassword) errors.oldPassword = 'Required'
        if (!values.newPassword) errors.newPassword = 'Required'
        if (!values.newPasswordAgain) errors.newPasswordAgain = 'Required'
        if (values.newPassword !== values.newPasswordAgain) errors.newPasswordAgain = 'New password and new password must be the same again.'
        return errors
    }

    const onSubmit = async (values) => {
        setError('')
        if (values.newPassword === values.oldPassword) return setError(t('Your new password cannot be the same as your old password.'))
        const response = await changePasswordFromDB(user.tokens.access_token, values.oldPassword, values.newPassword, values.newPasswordAgain)
        if (response?.error) return setError(t(response.error))
        setError({ message: t(response.message), variant: 'success' })
        values.oldPassword = ''
        values.newPassword = ''
        values.newPasswordAgain = ''
    }

    return (
        <FormikForm
            initialValues={initialValues}
            validate={onValidate}
            onSubmit={onSubmit}
            error={error}
            title={t('changePassword')}
            text={t('change')}
            variant='danger'
        />
    )
}

export default PasswordChanger
