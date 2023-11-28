import { useSelector } from 'react-redux'

export const useDarkMode = () => useSelector((state) => state.theme.dark)
