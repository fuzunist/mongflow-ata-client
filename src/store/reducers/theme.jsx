import { createSlice } from '@reduxjs/toolkit'

const getDarkMode = () => {
    let darkMode = localStorage.getItem('darkMode')
    darkMode !== null && (darkMode = JSON.parse(darkMode))

    if (darkMode) {
        document.body.classList.add('dark')
    }

    return darkMode
}

const initialState = {
    dark: getDarkMode()
}

const theme = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        _setDarkMode: (state, action) => {
            state.dark = action.payload
            if (state.dark) document.body.classList.add('dark')
            else document.body.classList.remove('dark')
            localStorage.setItem('darkMode', state.dark)
        }
    }
})

export const { _setDarkMode } = theme.actions
export default theme.reducer
