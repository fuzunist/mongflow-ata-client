import Languages from '@/constants/Languages'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation()

    const onClick = async (close, lang) => {
        await i18n.changeLanguage(lang)
        close()
    }

    return (
        <Popover className='min-[600px]:relative h-full'>
            <Popover.Button
                className={({ open }) =>
                    `flex justify-center items-center gap-2 h-full px-[15px] max-[428px]:px-3 cursor-pointer transition-colors outline-none ${
                        open ? 'bg-navlink-light/[0.05] dark:bg-navlink-dark/[0.05]' : ''
                    }`
                }
            >
                {({ open }) => (
                    <>
                        <span>
                            {
                                Languages[
                                    i18n.language === 'en-US' || i18n.language === 'en-GB' ? 'en' : i18n.language === 'tr-TR' ? 'tr' : i18n.language
                                ]
                            }
                        </span>
                        {open ? (
                            <ChevronUpIcon
                                size={14}
                                className='max-[768px]:hidden'
                            />
                        ) : (
                            <ChevronDownIcon
                                size={14}
                                className='max-[768px]:hidden'
                            />
                        )}
                    </>
                )}
            </Popover.Button>
            <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
                className='absolute top-full z-[100] rounded min-w-full max-[600px]:!left-[10px] max-[600px]:!right-[10px] right-0 bg-dropdown-bg-light dark:bg-dropdown-bg-dark shadow-box'
            >
                <Popover.Panel className='flex flex-col py-2 gap-2 max-h-32'>
                    {({ close }) =>
                        Object.entries(Languages).map(([key, value], index) => (
                            <span
                                key={index}
                                className='w-full py-2 px-4 rounded cursor-pointer select-none text-dropdown-link-fg-light dark:text-dropdown-link-fg-dark hover:bg-dropdown-link-hover-bg-light hover:text-dropdown-link-hover-fg-light hover:dark:text-dropdown-link-hover-fg-dark hover:dark:bg-dropdown-link-hover-bg-dark'
                                onClick={() => onClick(close, key)}
                            >
                                {value}
                            </span>
                        ))
                    }
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default LanguageSwitcher
