import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false
}

const leftsidebar = createSlice({
    name: 'leftsidebar',
    initialState,
    reducers: {
        _close: (state) => {
            state.open = false
        },
        _open: (state) => {
            state.open = true
        }
    }
})

export const { _close, _open } = leftsidebar.actions
export default leftsidebar.reducer
