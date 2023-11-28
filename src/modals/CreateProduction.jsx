import FormikForm from '@/components/FormikForm'
import { addProductionToDB, updateProductionToDB } from '@/services/production'
import { addProduction, addStock, editProduction, editStock } from '@/store/actions/apps'
import { useProducts } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { dateToIsoFormatWithTimezoneOffset } from '@/utils/helpers'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CreateProduction = ({ closeModal, editing = false, selected }) => {
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
        production: {
            tag: 'input',
            type: 'number',
            placeholder: t('production'),
            label: t('production'),
            value: editing ? selected.production : 0,
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
        if (!values.production) errors.production = 'Required'
        if (!values.attributes) errors.attributes = 'Required'
        if (values.attributes.some((attr) => attr.value === 0)) errors.attributes = 'Required'
        return errors
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setError('')
        const attributes = values.attributes.map((attr) => `${attr.id}-${attr.value}`).join(',')
        const response = await addProductionToDB(user.tokens.access_token, values.product_id, attributes, values.date, values.production)
        if (response?.error) return setError(response.error)
        addProduction(response.production)
        if (response.stock.new) addStock(response.stock)
        else editStock(response.stock)
        setSubmitting(false)
        closeModal()
    }

    const onEdit = async (values, { setSubmitting }) => {
        setError('')
        const response = await updateProductionToDB(user.tokens.access_token, selected.production_id, values.production)
        if (response?.error) return setError(response.error)
        editProduction(response.production)
        editStock(response.stock)
        setSubmitting(false)
        closeModal()
    }

    return (
        <FormikForm
            initialValues={initialValues}
            validate={validate}
            onSubmit={editing ? onEdit : onSubmit}
            error={error}
            title={t(editing ? 'editProduction' : 'addProduction')}
        />
    )
}

export default CreateProduction
