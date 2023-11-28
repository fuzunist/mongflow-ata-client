import { UserIcon, LogOutIcon } from 'lucide-react'

export default [
    {
        label: 'myAccount',
        icon: UserIcon,
        redirectTo: '/profile'
    },
    {
        label: 'logOut',
        icon: LogOutIcon,
        redirectTo: '/auth/logout'
    }
]
