import store from '@/store'
import { _setTokens, _setUser, _logOut, _setPhoto, _setInformations } from '../reducers/user'

export const setUser = (data) => store.dispatch(_setUser(data))
export const setInformations = (data) => store.dispatch(_setInformations(data))
export const setLogOut = () => store.dispatch(_logOut())
export const setTokens = (tokens) => store.dispatch(_setTokens(tokens))

export const setPhoto = (photo) => store.dispatch(_setPhoto(photo))
