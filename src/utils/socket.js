import { io } from 'socket.io-client'
import store from '@/store'
import { addOrder, addProduction, addStock, delOrder, editOrder, editProduction, editStock } from '@/store/actions/apps'
import { addNotification, delNotification } from '@/store/actions/notifications'

export const socket = io(import.meta.env.VITE_API_ENDPOINT, { autoConnect: false })

socket.on('connect', () => {
    console.log('websocket connected')
})

socket.on('notification', (arg) => {
    if (!arg?.type) return
    if (!arg?.userid) return
    if (arg.userid === store.getState().user.userid) return

    switch (arg.type) {
        case 'order':
            addOrder(arg.order)
            addNotification('order', arg.order.order_id)
            break
        case 'order_update':
            editOrder(arg.order)
            break
        case 'order_del':
            delOrder(arg.orderid)
            delNotification('order', arg.orderid)
            break
        case 'stock':
            addStock(arg.stock)
            addNotification('stock', arg.stock.stock_id)
            break
        case 'stock_update':
            editStock(arg.stock)
            break
        case 'production':
            addProduction(arg.production)
            editStock(arg.stock)
            addNotification('production', arg.production.production_id)
            break
        case 'production_update':
            editProduction(arg.production)
            editStock(arg.stock)
            break
    }
})
