import { UserIcon, UsersIcon, LayoutDashboardIcon } from 'lucide-react'

export default [
    {
        key: 'navigation',
        isTitle: true
    },
    {
        key: 'dashboard',
        icon: LayoutDashboardIcon,
        // badge: {
        //     variant: 'success',
        //     text: '9+'
        // },
        url: '/dashboard'
    },
    {
        key: 'users',
        icon: UsersIcon,
        url: '/users',
        authenticate: {
            type: 'usertype',
            value: ['admin']
        }
    },
    {
        key: 'pending-orders',
        icon: UsersIcon,
        url: '/pending-orders',
        authenticate: {
            type: 'usertype',
            value: ['admin', 'boss', 'domestic_market_manager', 'foreign_market_manager']
        }
    },
    {
        key: 'apps',
        isTitle: true
    },
    {
        key: 'apps-proforma-invoice',
        icon: UserIcon,
        url: '/apps/proforma-invoice',
        authenticate: {
            type: 'usertype',
            value: [
                'admin',
                'boss',
                'domestic_market_manager',
                'foreign_market_manager',
                'domestic_market_marketing',
                'foreign_market_marketing',
                'stock_manager'
            ]
        }
    },
    {
        key: 'apps-customers',
        icon: UserIcon,
        url: '/apps/customers'
    },
    {
        key: 'apps-products',
        icon: UserIcon,
        url: '/apps/products'
    },
    {
        key: 'apps-orders',
        icon: UserIcon,
        url: '/apps/orders',
        authenticate: {
            type: 'usertype',
            value: [
                'admin',
                'boss',
                'domestic_market_manager',
                'foreign_market_manager',
                'domestic_market_marketing',
                'foreign_market_marketing',
                'stock_manager'
            ]
        }
    },
    {
        key: 'apps-stocks',
        icon: UserIcon,
        url: '/apps/stocks',
        authenticate: {
            type: 'usertype',
            value: ['admin', 'stock_manager']
        }
    },
    {
        key: 'apps-productions',
        icon: UserIcon,
        url: '/apps/productions',
        authenticate: {
            type: 'usertype',
            value: ['admin', 'stock_manager']
        }
    }
]
