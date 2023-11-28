import store from '@/store'
import { _setDarkMode } from '../reducers/theme'

export const setDarkMode = (status) => store.dispatch(_setDarkMode(status))
