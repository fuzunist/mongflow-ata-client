import { PlusIcon } from 'lucide-react'
import { TrashIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LabelError from '../LabelError'

const FormOrderStatus = ({ value, onChange, onBlur, name, options, errors, _label = '', touched, disabled }) => {
    const { t } = useTranslation()

    const addOrderStatus = () => {
        const newValue = [...value, { quantity: 0, type: options[0] }]
        onChange({ target: { name, value: newValue } })
        onBlur({ target: { name, value: newValue } })
    }

    const changeOrderQuantity = (quantity, index) => {
        const newValue = [...value]
        newValue[index].quantity = quantity
        onChange({ target: { name, value: newValue } })
    }

    const changeOrderType = (type, index) => {
        const newValue = [...value]
        newValue[index].type = type
        onChange({ target: { name, value: newValue } })
    }

    const delOrderStatus = (index) => {
        let newValue = [...value]
        newValue = newValue.filter((status, indx) => indx !== index)
        onChange({ target: { name, value: newValue } })
    }

    return (
        <div className='flex flex-col gap-2'>
            <span className='text-base font-semibold'>{_label}</span>
            <button
                type='button'
                onClick={addOrderStatus}
                className='flex justify-center items-center gap-2 rounded p-2 bg-success/[0.5] text-white hover:bg-success/[0.7] transition-colors text-base font-semibold'
                disabled={disabled}
            >
                <PlusIcon
                    size={16}
                    strokeWidth={3}
                />
                {t('addOrderStatus')}
            </button>
            <div className='flex-1 max-h-[300px] overflow-y-auto flex flex-col gap-1'>
                {value.map((orderStatus, orderStatusIndex) => (
                    <div
                        key={orderStatusIndex}
                        className='flex flex-col gap-2 p-2 border border-input-focusborder-light dark:border-input-focusborder-dark rounded'
                    >
                        <div className='flex gap-2'>
                            <input
                                type='number'
                                value={orderStatus.quantity}
                                onChange={(e) => changeOrderQuantity(e.target.valueAsNumber, orderStatusIndex)}
                                className='w-full py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border border-input-border-light dark:border-input-border-dark rounded'
                                disabled={disabled}
                            />
                            <select
                                value={orderStatus.type}
                                onChange={(e) => changeOrderType(e.target.value, orderStatusIndex)}
                                className='w-full py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark'
                            >
                                {options.map((option, index) => (
                                    <option
                                        value={option}
                                        key={index}
                                    >
                                        {t(option)}
                                    </option>
                                ))}
                            </select>
                            <button
                                type='button'
                                onClick={() => delOrderStatus(orderStatusIndex)}
                                className='px-4 py-2 bg-danger hover:bg-alert-danger-fg-light text-white rounded transition-colors'
                                disabled={disabled}
                            >
                                <TrashIcon
                                    size={16}
                                    strokeWidth={3}
                                />
                            </button>
                        </div>
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

export default FormOrderStatus
