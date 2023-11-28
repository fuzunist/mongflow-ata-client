import FormikForm from '@/components/FormikForm'
import { addStockToDB, updateStockToDB } from '@/services/stock'
import { addStock, editStock } from '@/store/actions/apps'
import { useProducts } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { dateToIsoFormatWithTimezoneOffset } from '@/utils/helpers'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CreateStock = ({ closeModal, editing = false, selected }) => {
    const user = useUser()
    const products = useProducts()
    const [error, setError] = useState('')
    const { t } = useTranslation()

    const initialValues = {
        product_id: {
            tag: 'select',
            label: t('productname'),
            value: editing ? selected.product_id : 0,
            readOnly: editing,
            options: (() => {
                const initialOptions = [
                    {
                        key: 0,
                        value: t('choose')
                    }
                ]

                const changedProducts = products.map((product) => ({
                    key: product.product_id,
                    value: product.product_name
                }))

                return initialOptions.concat(changedProducts)
            })()
        },
        attributes: {
            tag: 'stock',
            label: t('attributes'),
            value: editing
                ? selected.attributes.split(',').map((attr) => ({ id: parseInt(attr.split('-')[0]), value: parseInt(attr.split('-')[1]) }))
                : [],
            readOnly: editing,
            products: products.map((product) => ({
                id: product.product_id,
                attributes: product.attributes.map((attr) => ({
                    id: attr.attribute_id,
                    name: attr.attribute_name,
                    values: attr.values.map((val) => ({ id: val.value_id, name: val.value }))
                }))
            }))
        },
        stock: {
            tag: 'input',
            type: 'number',
            placeholder: t('stock'),
            label: t('stock'),
            value: editing ? selected.stock : 0,
            min: 0
        },
        date: {
            tag: 'input',
            type: 'date',
            label: t('date'),
            value: editing ? dateToIsoFormatWithTimezoneOffset(new Date(selected.date)) : dateToIsoFormatWithTimezoneOffset(new Date()),
            readOnly: editing,
            max: dateToIsoFormatWithTimezoneOffset(new Date())
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.product_id) errors.product_id = 'Required'
        if (!values.stock) errors.stock = 'Required'
        if (!values.attributes) errors.attributes = 'Required'
        if (values.attributes.some((attr) => attr.value === 0)) errors.attributes = 'Required'
        return errors
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setError('')
        const attributes = values.attributes.map((attr) => `${attr.id}-${attr.value}`).join(',')
        const response = await addStockToDB(user.tokens.access_token, values.product_id, attributes, values.date, values.stock)
        if (response?.error) return setError(response.error)
        addStock({
            ...response,
            product_name: products.find((product) => product.product_id === parseInt(values.product_id)).product_name,
            constituent_username: user.username,
            last_edited_by_username: user.username
        })
        setSubmitting(false)
        closeModal()
    }

    const onEdit = async (values, { setSubmitting }) => {
        setError('')
        const response = await updateStockToDB(user.tokens.access_token, selected.stock_id, values.stock)
        if (response?.error) return setError(response.error)
        editStock({ ...response, last_edited_by_username: user.username })
        setSubmitting(false)
        closeModal()
    }

    return (
        <FormikForm
            initialValues={initialValues}
            validate={validate}
            onSubmit={editing ? onEdit : onSubmit}
            error={error}
            title={t(editing ? 'editStock' : 'addStock')}
        />
    )
}

export default CreateStock
