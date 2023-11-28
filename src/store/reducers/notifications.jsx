import { dateToIsoFormatWithTimezoneOffset } from '@/utils/helpers'
import { createSlice } from '@reduxjs/toolkit'

const localNotifications = localStorage.getItem('notifications')
    ? JSON.parse(localStorage.getItem('notifications'))
    : {
          orders: {
              news: [],
              reads: []
          },
          stocks: {
              news: [],
              reads: []
          },
          productions: {
              news: [],
              reads: []
          },
          lastReads: ''
      }

const initialState = {
    orders: localNotifications?.orders || {
        news: [],
        reads: []
    },
    stocks: localNotifications?.stocks || {
        news: [],
        reads: []
    },
    productions: localNotifications?.productions || {
        news: [],
        reads: []
    },
    lastReads: localNotifications?.lastReads ?? ''
}

const notifications = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        _addNotification: (state, action) => {
            state[`${action.payload.type}s`].news.push(action.payload.id)
        },

        _delNotification: (state, action) => {
            state[`${action.payload.type}s`].reads = state[`${action.payload.type}s`].reads.filter((id) => id !== parseInt(action.payload.id))
            state[`${action.payload.type}s`].news = state[`${action.payload.type}s`].news.filter((id) => id !== parseInt(action.payload.id))

            localStorage.setItem(
                'notifications',
                JSON.stringify({ orders: state.orders, stocks: state.stocks, productions: state.productions, lastReads: state.lastReads })
            )
        },

        _setRead: (state) => {
            state.orders.reads = [...state.orders.news, ...state.orders.reads]
            state.orders.news = []
            state.stocks.reads = [...state.stocks.news, ...state.stocks.reads]
            state.stocks.news = []
            state.productions.reads = [...state.productions.news, ...state.productions.reads]
            state.productions.news = []

            state.lastReads = dateToIsoFormatWithTimezoneOffset(new Date())

            localStorage.setItem(
                'notifications',
                JSON.stringify({ orders: state.orders, stocks: state.stocks, productions: state.productions, lastReads: state.lastReads })
            )
        },

        _clearReads: (state) => {
            state.orders.reads = []
            state.stocks.reads = []
            state.productions.reads = []

            state.lastReads = ''

            localStorage.setItem(
                'notifications',
                JSON.stringify({ orders: state.orders, stocks: state.stocks, productions: state.productions, lastReads: state.lastReads })
            )
        }
    }
})

export const { _addNotification, _delNotification, _setRead, _clearReads } = notifications.actions
export default notifications.reducer
