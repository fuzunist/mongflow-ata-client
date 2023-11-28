import store from '@/store'
import { _close, _open } from '../reducers/leftsidebar'

export const openLeftSideBar = () => store.dispatch(_open())
export const closeLeftSideBar = () => store.dispatch(_close())
