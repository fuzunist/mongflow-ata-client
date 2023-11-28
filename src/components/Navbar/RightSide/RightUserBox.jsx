import Modal from '@/components/Modal'
import NavbarUserMenuItems from '@/constants/NavbarUserMenuItems'
import { useUser } from '@/store/hooks/user'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import DefaultUser from '@/assets/img/default_user.png'

const RightUserBox = () => {
    const { t } = useTranslation()
    const user = useUser()

    return (
        <Popover className='min-[600px]:relative h-full'>
            <Popover.Button
                className={({ open }) =>
                    `h-full px-[15px] max-[428px]:px-3 flex justify-center items-center outline-none gap-2 transition-colors ${
                        open ? 'bg-navlink-light/[0.05] dark:bg-navlink-dark/[0.05]' : ''
                    }`
                }
            >
                <img
                    src={user.photo || DefaultUser}
                    className='rounded-full'
                    height={32}
                    width={32}
                />
                <div className='max-[768px]:hidden uppercase'>{user.username || 'Nowak'}</div>
                <ChevronDownIcon
                    size={14}
                    className='max-[768px]:hidden'
                />
            </Popover.Button>
            <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
                className='absolute top-full z-[100] rounded min-w-[170px] max-[600px]:!left-[10px] max-[600px]:!right-[10px] right-0 bg-dropdown-bg-light dark:bg-dropdown-bg-dark shadow-box'
            >
                <Popover.Panel className='flex flex-col py-2 gap-2'>
                    {NavbarUserMenuItems.map((item) => {
                        if (item?.isHr)
                            return (
                                <hr
                                    key={item.key}
                                    className='border-dropdown-hr-light dark:border-dropdown-hr-dark w-full my-2'
                                />
                            )

                        if (item?.isTitle)
                            return (
                                <span
                                    className='py-2 px-4 text-[13px] text-dropdown-title-light dark:text-dropdown-title-dark'
                                    key={item.key}
                                >
                                    {t(item.key)}
                                </span>
                            )

                        if (item?.modal)
                            return (
                                <Modal
                                    key={item.key}
                                    className='flex items-center gap-2 py-2 px-4 text-dropdown-link-fg-light dark:text-dropdown-link-fg-dark hover:bg-dropdown-link-hover-bg-light hover:text-dropdown-link-hover-fg-light hover:dark:text-dropdown-link-hover-fg-dark hover:dark:bg-dropdown-link-hover-bg-dark'
                                    text={
                                        <Fragment>
                                            <item.icon
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            {t(item.key)}
                                        </Fragment>
                                    }
                                >
                                    <item.modal />
                                </Modal>
                            )

                        return (
                            <Link
                                to={item.url}
                                key={item.key}
                                className='flex items-center gap-2 py-2 px-4 text-dropdown-link-fg-light dark:text-dropdown-link-fg-dark hover:bg-dropdown-link-hover-bg-light hover:text-dropdown-link-hover-fg-light hover:dark:text-dropdown-link-hover-fg-dark hover:dark:bg-dropdown-link-hover-bg-dark'
                            >
                                <item.icon
                                    size={14}
                                    strokeWidth={2}
                                />
                                {t(item.key)}
                            </Link>
                        )
                    })}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default RightUserBox
