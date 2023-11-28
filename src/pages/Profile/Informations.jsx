import FormikForm from '@/components/FormikForm'
import { changeInformationsFromDB } from '@/services/auth'
import { setInformations } from '@/store/actions/user'
import { useState } from 'react'

const Informations = ({ user, t }) => {
    const [error, setError] = useState('')

    const initialValues = {
        fullname: {
            tag: 'input',
            type: 'text',
            placeholder: t('fullname'),
            label: t('fullname'),
            value: user.fullname || ''
        },
        email: {
            tag: 'input',
            type: 'email',
            placeholder: t('email'),
            label: t('email'),
            value: user.email || ''
        },
        company_name: {
            tag: 'input',
            type: 'text',
            placeholder: t('company_name'),
            label: t('company_name'),
            value: user.company_name || ''
        },
        phone: {
            tag: 'input',
            type: 'phone',
            placeholder: t('phone'),
            label: t('phone'),
            value: user.phone || ''
        }
    }

    const onValidate = (values) => {
        const errors = {}
        if (!values.fullname) errors.fullname = 'Required'
        if (!values.email) errors.email = 'Required'
        if (!values.company_name) errors.company_name = 'Required'
        if (!values.phone) errors.phone = 'Required'
        return errors
    }

    const onSubmit = async (values) => {
        setError('')
        const response = await changeInformationsFromDB(user.tokens.access_token, values.fullname, values.email, values.company_name, values.phone)
        if (response?.error) return setError(t(response.error))
        setInformations(response)
    }

    return (
        <FormikForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={onValidate}
            error={error}
            text={'save'}
            title={t('informations')}
        />
    )
}

export default Informations
