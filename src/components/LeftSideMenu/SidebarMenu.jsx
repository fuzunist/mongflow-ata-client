import SiderbarMenuItems from '@/constants/SiderbarMenuItems'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Badge from '../Badge'
import { useUser } from '@/store/hooks/user'

const SideBarMenu = () => {
    const { t } = useTranslation()
    const user = useUser()
    return (
        <div className='mt-8 flex flex-col text-leftbar-navbar-item-fg-light dark:text-leftbar-navbar-item-fg-dark'>
            {SiderbarMenuItems.map((item) => {
                if (item?.isTitle)
                    return (
                        <div
                            key={item.key}
                            className='text-[11px] px-5 py-2 uppercase'
                        >
                            {t(item.key)}
                        </div>
                    )

                if (item?.authenticate?.type === 'username' && !item.authenticate.value.includes(user.username)) return null
                if (item?.authenticate?.type === 'usertype' && !item.authenticate.value.includes(user.usertype)) return null
                let keyTitle=null;
                if(item?.key==="pending-orders"){
                    if(user.usertype==="production_manager"){
                        keyTitle="pending-recipes"
                    }
                }
                return (
                    <NavLink
                        key={item.key}
                        to={item.url}
                        className={({ isActive }) =>
                            `relative px-6 py-2 ${
                                isActive ? 'text-leftbar-navbar-item-active-fg-light dark:text-leftbar-navbar-item-active-fg-dark' : ''
                            } hover:text-leftbar-navbar-item-fg-hover-light hover:dark:text-leftbar-navbar-item-fg-hover-dark transition-colors duration-300 ease-in-out flex items-center gap-2`
                        }
                    >
                        <item.icon
                            size={14}
                            strokeWidth={2}
                        />
                        {t(keyTitle ?? item.key)}
                        {item?.badge && (
                            <div className='absolute right-0 mr-6'>
                                <Badge variant={item.badge.variant}>{item.badge.text}</Badge>
                            </div>
                        )}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default SideBarMenu
