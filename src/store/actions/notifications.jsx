import store from '@/store'
import { _addNotification, _clearReads, _delNotification, _setRead } from '../reducers/notifications'

export const addNotification = (type, id) => store.dispatch(_addNotification({ type, id }))
export const delNotification = (type, id) => store.dispatch(_delNotification({ type, id }))
export const setRead = () => store.dispatch(_setRead())
export const clearReads = () => store.dispatch(_clearReads())
