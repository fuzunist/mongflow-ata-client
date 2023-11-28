import { configureStore } from '@reduxjs/toolkit'
import user from './reducers/user'
import leftsidebar from './reducers/leftsidebar'
import theme from './reducers/theme'
import apps from './reducers/apps'
import notifications from './reducers/notifications'

const store = configureStore({
    reducer: {
        user,
        leftsidebar,
        theme,
        apps,
        notifications
    },
    devTools: import.meta.env.DEV
})

export default store
