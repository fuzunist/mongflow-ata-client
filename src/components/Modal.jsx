import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { useEffect } from 'react'
import { createElement } from 'react'
import { useState, Fragment } from 'react'

const Modal = ({ as = 'button', className = '', text, children, directRender = false, closeModal, width = 'md' }) => {
    let [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        console.log('directRender: ', directRender)
        setIsOpen(directRender)
    }, [directRender])

    // Add the logging statement here
    console.log('Modal rendered with isOpen:', isOpen)

    const open = () => setIsOpen(true)
    const close = closeModal ?? (() => setIsOpen(false))

    return (
        <>
            {!directRender &&
                createElement(
                    as,
                    {
                        className,
                        onClick: open
                    },
                    text
                )}
            <Transition
                appear
                show={isOpen}
                as={Fragment}
            >
                <Dialog
                    as='div'
                    className='relative z-[1002]'
                    onClose={close}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black dark:bg-white bg-opacity-25 dark:bg-opacity-25' />
                    </Transition.Child>
                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel
                                    className={classNames(
                                        'w-full transform overflow-hidden rounded-md bg-card-bg-light dark:bg-card-bg-dark text-text-dark-light dark:text-text-dark-dark shadow-box p-6 text-left align-middle transition-all',
                                        {
                                            'max-w-md': width === 'md',
                                            'max-w-lg': width === 'lg',
                                            'max-w-xl': width === 'xl',
                                            'max-w-2xl': width === '2xl',
                                            'max-w-3xl': width === '3xl',
                                            'max-w-4xl': width === '4xl',
                                            'max-w-5xl': width === '5xl'
                                        }
                                    )}
                                >
                                    {typeof children === 'function' ? children({ close }) : children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal
