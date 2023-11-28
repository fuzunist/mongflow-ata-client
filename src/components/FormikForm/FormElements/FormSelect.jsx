import classNames from 'classnames'
import LabelError from '../LabelError'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const FormSelect = ({ value, options, onChange, onBlur, name, errors, _label = '', touched, disabled, readOnly }) => {
    const [firstTime, setFirstTime] = useState(true)
    const { t } = useTranslation()

    useEffect(() => {
        firstTime && value && onChange({ target: { value, name } }) && setFirstTime(false)
    }, [firstTime])

    return (
        <>
            <label className='flex flex-col'>
                <span className='font-medium mb-2'>{_label}</span>
                <select
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    className={classNames('py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded', {
                        'border-input-border-light dark:border-input-border-dark': !errors[name],
                        'border-danger': !!errors[name]
                    })}
                    disabled={disabled || readOnly}
                >
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option.key ?? option}
                        >
                            {typeof option.value === 'object' ? `${option.value.name} (${option.value.extraPrice})` : option.value ?? t(option)}
                        </option>
                    ))}
                </select>
            </label>
            <LabelError
                errors={errors}
                value={name}
                touched={touched}
            />
        </>
    )
}

export default FormSelect
