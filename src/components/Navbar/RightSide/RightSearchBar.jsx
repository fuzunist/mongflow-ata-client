import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Popover, Transition } from '@headlessui/react'
import { useWindowSize } from 'react-use'

const RightSearchBar = () => {
    const { t } = useTranslation()
    const { width } = useWindowSize()
    if (width >= 992)
        return (
            <div className='relative'>
                <input
                    placeholder={t('search')}
                    className='rounded-full bg-topsearch-light dark:bg-topsearch-dark border-topbar-light dark:border-topbar-dark py-2 px-6 outline-none'
                />
                <SearchIcon
                    size={14.4}
                    strokeWidth={2}
                    className='absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer pointer-events-none'
                />
            </div>
        )

    return (
        <Popover className='min-[600px]:relative h-full'>
            <Popover.Button
                className={({ open }) =>
                    `h-full px-[15px] max-[428px]:px-3 flex justify-center items-center outline-none gap-2 ${
                        open ? 'bg-light-bg-primary dark:bg-dark-bg-primary' : ''
                    }`
                }
            >
                <SearchIcon
                    size={20}
                    strokeWidth={2}
                />
            </Popover.Button>
            <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
                className='absolute top-full right-0 z-[100] max-[600px]:!left-[10px] max-[600px]:!right-[10px] rounded min-[600px]:w-[320px] bg-light-bg-primary dark:bg-dark-bg-primary shadow-box'
            >
                <Popover.Panel className='flex justify-center items-center p-6'>
                    <input
                        placeholder={t('search')}
                        className='rounded-lg bg-light-input-bg dark:bg-dark-input-bg py-2 px-6 outline-none w-full'
                    />
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default RightSearchBar
