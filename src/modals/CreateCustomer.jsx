import FormikForm from '@/components/FormikForm'
import { addCustomerToDB, delCustomerFromDB, editCustomerToDB } from '@/services/customer'
import { addCustomer, delCustomer, editCustomer } from '@/store/actions/apps'
import { useUser } from '@/store/hooks/user'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CreateCustomer = ({ closeModal, selectedCustomer }) => {
    const user = useUser()
    const [error, setError] = useState('')
    const { t } = useTranslation()

    const initialValues = {
        customername: {
            tag: 'input',
            type: 'text',
            placeholder: t('customername'),
            label: t('customername'),
            value: selectedCustomer?.customername ?? ''
        },
        companyname: {
            tag: 'input',
            type: 'text',
            placeholder: t('companyname'),
            label: t('companyname'),
            value: selectedCustomer?.companyname ?? ''
        },
        email: {
            tag: 'input',
            type: 'email',
            placeholder: t('emailAddress'),
            label: t('emailAddress'),
            value: selectedCustomer?.email ?? ''
        },
        phone: {
            tag: 'input',
            type: 'phone',
            placeholder: t('phone'),
            label: t('phone'),
            value: selectedCustomer?.phone ?? ''
        },
        address: {
            tag: 'input',
            type: 'text',
            placeholder: t('address'),
            label: t('address'),
            value: selectedCustomer?.address ?? ''
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.customername) errors.customername = 'Required'
        if (!values.companyname) errors.companyname = 'Required'
        if (!values.email) errors.email = 'Required'
        if (!values.phone) errors.phone = 'Required'
        if (!values.address) errors.address = 'Required'
        return errors
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setError('')
        const response = await addCustomerToDB(
            user.tokens.access_token,
            values.customername,
            values.companyname,
            values.email,
            values.phone,
            values.address
        )
        if (response?.error) return setError(response.error)
        addCustomer(response)
        setSubmitting(false)
        closeModal()
    }

    const onEdit = async (values, { setSubmitting }) => {
        setError('')
        console.log(values.customername, values.companyname, values.email, values.phone, values.address)
        const response = await editCustomerToDB(
            user.tokens.access_token,
            selectedCustomer.customerid,
            values.customername,
            values.companyname,
            values.email,
            values.phone,
            values.address
        )
        if (response?.error) return setError(response.error)
        console.log(response)
        editCustomer(response)
        setSubmitting(false)
        closeModal()
    }

    const onDelete = async () => {
        console.log('customer editing: del')
        setError('')
        const response = await delCustomerFromDB(user.tokens.access_token, selectedCustomer.customerid)
        if (response?.error) return setError(response.error)
        delCustomer(selectedCustomer.customerid)
        closeModal()
    }

    return (
        <>
            <FormikForm
                initialValues={initialValues}
                validate={validate}
                onSubmit={selectedCustomer ? onEdit : onSubmit}
                error={error}
                title={t(selectedCustomer ? 'editCustomer' : 'addCustomer')}
            />
            {selectedCustomer && (
                <button
                    className='py-2 px-3 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white w-full mt-4 rounded'
                    onClick={onDelete}
                >
                    {t('delete')}
                </button>
            )}
        </>
    )
}

export default CreateCustomer
