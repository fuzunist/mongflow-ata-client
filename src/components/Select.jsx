import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import classNames from 'classnames'

const Select = ({ options = [], value = '', className = 'relative', onChange }) => {
    return (
        <Listbox
            value={value}
            onChange={onChange}
        >
            <div className={className}>
                <Listbox.Button
                    className={({ open }) =>
                        classNames(
                            'flex items-center justify-between gap-2 py-2 px-3 transition-all outline-none bg-input-bg-light dark:bg-input-bg-dark border rounded border-input-border-light dark:border-input-border-dark w-full',
                            {
                                'border-b-input-bg-light dark:border-b-input-bg-dark rounded-bl-none rounded-br-none': open
                            }
                        )
                    }
                >
                    {({ open }) => (
                        <>
                            {options?.find?.((item) => item?.key === value)?.value ?? value}
                            {open ? (
                                <ChevronUpIcon
                                    size={18}
                                    strokeWidth={3}
                                />
                            ) : (
                                <ChevronDownIcon
                                    size={18}
                                    strokeWidth={3}
                                />
                            )}
                        </>
                    )}
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Listbox.Options className='absolute w-full top-full z-[999] max-h-60 overflow-y-auto scroller rounded-md rounded-tl-none rounded-tr-none bg-input-bg-light dark:bg-input-bg-dark border border-t-0 border-input-border-light dark:border-input-border-dark py-1 shadow-lg outline-none'>
                        {options?.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                value={option?.key ?? option}
                                className='py-2 px-4 bg-input-bg-light dark:bg-input-bg-dark hover:bg-border-light dark:hover:bg-border-dark select-none cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap'
                            >
                                {option?.value ?? option}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default Select
