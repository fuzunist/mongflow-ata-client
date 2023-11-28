import ResetPassword from '@/modals/ResetPassword'
import { KeyRoundIcon, LogOutIcon, UserIcon } from 'lucide-react'

export default [
    {
        key: 'welcome',
        isTitle: true
    },
    {
        key: 'myAccount',
        icon: UserIcon,
        url: '/profile'
    },
    {
        key: 'resetPassword',
        icon: KeyRoundIcon,
        modal: ResetPassword
    },
    {
        key: 'hr',
        isHr: true
    },
    {
        key: 'logOut',
        icon: LogOutIcon,
        url: '/auth/logout'
    }
]
