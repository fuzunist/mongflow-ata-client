import Card from '@/components/Card'
import { addSetToDB, delSetFromDB, editSetToDB } from '@/services/sets'
import { addSet, delSelectSet, delSet, editSet } from '@/store/actions/apps'
import { useSelectedSets } from '@/store/hooks/apps'
import { useUser } from '@/store/hooks/user'
import { useEffect } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Set = ({ editingSet }) => {
    const user = useUser()
    const selectedSets = useSelectedSets()
    const [setName, setSetName] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { t } = useTranslation()

    const products = useMemo(() => {
        return selectedSets.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_type: product.product_type,
            quantity: product.quantity,
            productType: product.productType,
            attributes: product?.attributes
        }))
    }, [selectedSets])

    useEffect(() => {
        if (editingSet) {
            setSetName(editingSet.set_name)
        }
    }, [editingSet])

    const onSubmit = async () => {
        console.log(selectedSets)
        setError('')
        if (!setName) return setError('You must enter the name of the set')
        if (!selectedSets.length) return setError('You must add at least 1 product')
        const response = await addSetToDB(user.tokens.access_token, setName, products)

        if (response?.error) return setError(response.error)
        addSet(response)
        setSuccessMessage('The set has been created successfully')
        setTimeout(() => {
            navigate('/apps/products')
        }, 1000)
    }

    const onEdit = async () => {
        console.log(selectedSets)
        setError('')
        if (!setName) return setError('You must enter the name of the set')
        if (!selectedSets.length) return setError('You must add at least 1 product')
        const response = await editSetToDB(user.tokens.access_token, editingSet.set_id, setName, products)

        if (response?.error) return setError(response.error)
        console.log(response)
        editSet(response)
        setSuccessMessage('The set has been updated successfully')
        setTimeout(() => {
            navigate('/apps/products')
        }, 1000)
    }

    const onDelete = async () => {
        setError('')
        const response = await delSetFromDB(user.tokens.access_token, editingSet.set_id)
        if (response?.error) return setError(response.error)
        delSet(editingSet.set_id)
        setSuccessMessage('The set has been deleted successfully')
        setTimeout(() => {
            navigate('/apps/products')
        }, 1000)
    }

    return (
        <Card>
            <Card.Body>
                <div className='flex flex-col gap-4 text-lg mb-4'>
                    <div className='flex justify-center items-center gap-8'>
                        <span className='font-semibold'>{t('setName')}:</span>
                        <input
                            value={setName}
                            onChange={(e) => setSetName(e.target.value)}
                            className='py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                        />
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />
                    <div className='flex flex-wrap text-center font-semibold'>
                        <span className='basis-[calc(35%_-_0.5rem)] mx-1 px-2'>{t('product')}</span>
                        <span className='basis-[calc(50%_-_0.5rem)] mx-1 px-2'>{t('attributes')}</span>
                        <span className='basis-[calc(15%_-_0.5rem)] mx-1 px-2'>{t('unit')}</span>
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />

                    <div className='flex flex-col gap-2'>
                        {selectedSets.length === 0 && <div className='flex-1 py-2 px-4 text-center'>{t('No products added yet')}</div>}
                        {selectedSets.map((product, index) => (
                            <div
                                className='flex flex-wrap text-center items-center'
                                key={index}
                            >
                                <span
                                    className='basis-[calc(35%_-_0.5rem)] mx-1 px-2 hover:line-through hover:text-red-500 cursor-pointer'
                                    onClick={() => delSelectSet(index)}
                                >
                                    {product.product_name}
                                </span>
                                <span className='basis-[calc(50%_-_0.5rem)] mx-1 px-2 flex flex-col text-sm'>
                                    {Object.entries(product.attributes).map(([attrName, attrValue], index) => (
                                        <span key={index}>
                                            {attrName}: {attrValue}
                                        </span>
                                    ))}
                                </span>
                                <span className='basis-[calc(15%_-_0.5rem)] mx-1 px-2'>
                                    {product.quantity} {t(product.productType)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <hr className='w-full border-border-light dark:border-border-dark' />
                </div>
                {successMessage && (
                    <div className='flex justify-center items-center py-2 px-4 bg-success border border-green-700 mb-4'>
                        <p className='text-white font-semibold'>{t(successMessage)}</p>
                    </div>
                )}
                {error && (
                    <div className='flex justify-center items-center py-2 px-4 bg-alert-danger-fg-light border border-alert-danger-fg-dark mb-4'>
                        <p className='text-white font-semibold'>{t(error)}</p>
                    </div>
                )}
                <div className='flex flex-wrap justify-end text-center gap-2 px-4'>
                    <button
                        onClick={editingSet ? onEdit : onSubmit}
                        className='py-2 px-4 rounded bg-purple hover:bg-purple-hover text-white font-semibold'
                    >
                        {t(editingSet ? 'update' : 'create')}
                    </button>
                    {editingSet && (
                        <button
                            onClick={onDelete}
                            className='py-2 px-4 rounded bg-alert-danger-fg-light hover:bg-alert-danger-fg-dark text-white font-semibold'
                        >
                            {t('delete')}
                        </button>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Set
