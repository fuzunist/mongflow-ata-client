import classNames from 'classnames'
import LabelError from '../LabelError'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

const FormInput = ({ type, value, placeholder, onChange, onBlur, name, errors, _label = '', touched, readOnly, disabled, min, max }) => {
    const [_type, _setType] = useState(type)
    return (
        <>
            <label className={`flex flex-col ${readOnly && 'pointer-events-none'}`}>
                <span className='font-medium mb-2'>{_label}</span>
                {type !== 'password' ? (
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className={classNames('py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded', {
                            'border-input-border-light dark:border-input-border-dark': !errors[name],
                            'border-danger': !!errors[name]
                        })}
                        disabled={disabled}
                        min={min}
                        max={max}
                    />
                ) : (
                    <div className='relative flex'>
                        <input
                            type={_type}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            placeholder={placeholder}
                            className={classNames(
                                'flex-1 py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded-tl rounded-bl',
                                {
                                    'border-input-border-light dark:border-input-border-dark': !errors[name],
                                    'border-danger': !!errors[name]
                                }
                            )}
                        />
                        <div
                            className='select-none border border-l-0 cursor-default border-input-border-light dark:border-input-border-dark rounded-br rounded-tr py-2 px-3 flex justify-center items-center'
                            onClick={() => _setType(_type === 'password' ? 'text' : 'password')}
                        >
                            {_type === 'password' ? (
                                <EyeIcon
                                    size={14}
                                    strokeWidth={2}
                                />
                            ) : (
                                <EyeOffIcon
                                    size={14}
                                    strokeWidth={2}
                                />
                            )}
                        </div>
                    </div>
                )}
            </label>
            <LabelError
                errors={errors}
                value={name}
                touched={touched}
            />
        </>
    )
}

export default FormInput
