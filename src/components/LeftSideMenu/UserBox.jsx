import { useUser } from '@/store/hooks/user'
import { Popover, Transition } from '@headlessui/react'
import { PowerIcon, UserIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProfileMenuItems from '@/constants/ProfileMenuItems'

import DefaultUser from '@/assets/img/default_user.png'

const UserBox = () => {
    const user = useUser()
    const { t } = useTranslation()
    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <img
                src={user.photo || DefaultUser}
                alt=''
                title={user.username}
                className='h-14 w-14 rounded-full bg-inherit border-2 border-userbox-border-light dark:border-userbox-border-dark p-1'
            />
            <div className='flex flex-col justify-center items-center w-full'>
                <Popover className='relative w-full flex justify-center items-center'>
                    <Popover.Button className='outline-none max-w-fit text-leftbar-username-fg-light dark:text-leftbar-username-fg-dark uppercase'>
                        {user.username || 'Nowak Helme'}
                    </Popover.Button>
                    <Transition
                        enter='transition duration-100 ease-out'
                        enterFrom='transform scale-95 opacity-0'
                        enterTo='transform scale-100 opacity-100'
                        leave='transition duration-75 ease-out'
                        leaveFrom='transform scale-100 opacity-100'
                        leaveTo='transform scale-95 opacity-0'
                        className='absolute top-full translate-y-2 w-[80%] left-1/2 -translate-x-1/2 rounded overflow-hidden shadow-box z-[100]'
                    >
                        <Popover.Panel className='bg-popover-light dark:bg-popover-dark py-4 px-2 rounded flex flex-col'>
                            {ProfileMenuItems.map((menu, index) => (
                                <Link
                                    to={menu.redirectTo}
                                    key={index}
                                    className='flex items-center gap-2 py-2 px-6 hover:bg-popover-item-hover-light hover:text-white rounded'
                                >
                                    <menu.icon
                                        size={14}
                                        strokeWidth={2}
                                    />
                                    {t(menu.label)}
                                </Link>
                            ))}
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <span className='text-leftbar-text-muted-light dark:text-leftbar-text-muted-dark'>{t(user.usertype)}</span>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <Link
                    to='/profile'
                    className='text-leftbar-text-muted-light hover:text-leftbar-text-muted-hover-light dark:text-leftbar-text-muted-dark hover:dark:text-leftbar-text-muted-hover-dark'
                    title={t('myAccount')}
                >
                    <UserIcon
                        size={14}
                        strokeWidth={2}
                    />
                </Link>
                <Link
                    to='/auth/logout'
                    className='text-leftbar-text-muted-light hover:text-leftbar-text-muted-hover-light dark:text-leftbar-text-muted-dark hover:dark:text-leftbar-text-muted-hover-dark'
                    title={t('logOut')}
                >
                    <PowerIcon
                        size={14}
                        strokeWidth={2}
                    />
                </Link>
            </div>
        </div>
    )
}

export default UserBox
