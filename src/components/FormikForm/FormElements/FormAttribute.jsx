import { PlusIcon } from 'lucide-react'
import { TrashIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LabelError from '../LabelError'

const FormAttribute = ({ value, onChange, onBlur, name, errors, _label = '', touched, disabled }) => {
    const { t } = useTranslation()

    const addAttribute = () => {
        const newValue = [...value, { attribute_name: '', attribute_id: undefined, values: [] }]
        onChange({ target: { name, value: newValue } })
        onBlur({ target: { name, value: newValue } })
    }

    const attrNameChange = (attrName, index) => {
        const newValue = [...value]
        newValue[index].attribute_name = attrName
        onChange({ target: { name, value: newValue } })
    }

    const delAttr = (index) => {
        let newValue = [...value]
        newValue = newValue.filter((attr, indx) => indx !== index)
        onChange({ target: { name, value: newValue } })
    }

    const addValue = (attrIndex) => {
        const newValue = [...value]
        newValue[attrIndex].values.push({ value: '', extra_price: '0', value_id: undefined }) // Push an object instead of an empty string
        onChange({ target: { name, value: newValue } })
    }

    const valueChange = (attrIndex, valueIndex, valueName, value_id) => {
        const newValue = [...value]
        if (typeof newValue[attrIndex].values[valueIndex] === 'string' || !newValue[attrIndex].values[valueIndex]) {
            newValue[attrIndex].values[valueIndex] = { value: '', extra_price: '0', value_id }
        }
        newValue[attrIndex].values[valueIndex].value = valueName || ''
        onChange({ target: { name, value: newValue } })
    }

    const delValue = (attrIndex, valueIndex) => {
        const newValue = [...value]
        newValue[attrIndex].values = newValue[attrIndex].values.filter((val, indx) => indx !== valueIndex)
        onChange({ target: { name, value: newValue } })
    }

    // const extraPriceChange = (attrIndex, valueIndex, newExtraPrice, value_id) => {
    //     const newValue = [...value]
    //     if (typeof newValue[attrIndex].values[valueIndex] === 'string' || !newValue[attrIndex].values[valueIndex]) {
    //         newValue[attrIndex].values[valueIndex] = { value: newValue[attrIndex].values[valueIndex], extra_price: '0', value_id }
    //     }
    //     newValue[attrIndex].values[valueIndex].extra_price = newExtraPrice || '0'
    //     onChange({ target: { name, value: newValue } })
    // }

    return (
        <div className='flex flex-col gap-2'>
            <span className='text-base font-semibold'>{_label}</span>
            <button
                type='button'
                onClick={addAttribute}
                className='flex justify-center items-center gap-2 rounded p-2 bg-success/[0.5] text-white hover:bg-success/[0.7] transition-colors text-base font-semibold'
                disabled={disabled}
            >
                <PlusIcon
                    size={16}
                    strokeWidth={3}
                />
                {t('addAttribute')}
            </button>
            <div className='flex-1 max-h-[300px] overflow-y-auto flex flex-col gap-1'>
                {value.map((attr, attrIndex) => (
                    <div
                        key={attrIndex}
                        className='flex flex-col gap-2 p-2 border border-input-focusborder-light dark:border-input-focusborder-dark rounded'
                    >
                        <div className='flex gap-2'>
                            <input
                                type='text'
                                value={attr.attribute_name}
                                onChange={(e) => attrNameChange(e.target.value, attrIndex)}
                                className='py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border border-input-border-light dark:border-input-border-dark rounded flex-1'
                                disabled={disabled}
                            />
                            <button
                                type='button'
                                onClick={() => addValue(attrIndex)}
                                className='px-4 py-2 bg-purple hover:bg-purple-hover text-white rounded transition-colors'
                                disabled={disabled}
                            >
                                <PlusIcon
                                    size={16}
                                    strokeWidth={3}
                                />
                            </button>
                            <button
                                type='button'
                                onClick={() => delAttr(attrIndex)}
                                className='px-4 py-2 bg-danger hover:bg-alert-danger-fg-light text-white rounded transition-colors'
                                disabled={disabled}
                            >
                                <TrashIcon
                                    size={16}
                                    strokeWidth={3}
                                />
                            </button>
                        </div>
                        {attr.values.length > 0 && <hr className='w-full border-input-focusborder-light dark:border-input-focusborder-dark mt-1' />}
                        {attr.values.map((value, valueIndex) => (
                            <div
                                key={valueIndex}
                                className='flex gap-2'
                            >
                                <input
                                    type='text'
                                    value={value.value} // Assuming value is an object with name and extraPrice
                                    onChange={(e) => valueChange(attrIndex, valueIndex, e.target.value, value?.value_id)}
                                    className='py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border border-input-border-light dark:border-input-border-dark rounded w-full'
                                    disabled={disabled}
                                />
                                {/* Extra Price Input */}
                                {/* <input
                                    type='number'
                                    placeholder='Extra Price'
                                    value={value.extra_price}
                                    onChange={(e) => extraPriceChange(attrIndex, valueIndex, e.target.value, value?.value_id)}
                                    className='py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border border-input-border-light dark:border-input-border-dark rounded w-full'
                                    disabled={disabled}
                                /> */}
                                <button
                                    type='button'
                                    onClick={() => delValue(attrIndex, valueIndex)}
                                    className='px-4 py-2 bg-danger hover:bg-alert-danger-fg-light text-white rounded transition-colors'
                                    disabled={disabled}
                                >
                                    <TrashIcon
                                        size={16}
                                        strokeWidth={3}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <LabelError
                errors={errors}
                value={name}
                touched={touched}
            />
        </div>
    )
}

export default FormAttribute
