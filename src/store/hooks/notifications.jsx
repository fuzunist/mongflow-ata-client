import { useSelector } from 'react-redux'

export const useNotifications = () => useSelector((state) => state.notifications)
