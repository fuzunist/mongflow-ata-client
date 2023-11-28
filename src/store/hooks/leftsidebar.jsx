import { useSelector } from 'react-redux'

export const useLeftSideBarIsOpen = () => useSelector((state) => state.leftsidebar.open)
