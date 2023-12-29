import { useWindowSize } from "react-use";
import SidebarMenu from "./SidebarMenu";
import UserBox from "./UserBox";
import { useLeftSideBarIsOpen } from "@/store/hooks/leftsidebar";
import { useEffect } from "react";
import { closeLeftSideBar } from "@/store/actions/leftsidebar";
import PendingOrderNumbers from "./PendingOrderNumbers";

const LeftSideMenu = () => {
  const { width } = useWindowSize();
  const isOpen = useLeftSideBarIsOpen();

  useEffect(() => {
    if (width >= 992) {
      isOpen && closeLeftSideBar();
    }
  }, [width]);

  if (width < 992 && !isOpen) return null;

  return (
    <div className="w-[240px] bg-leftbar-light dark:bg-leftbar-dark bottom-0 fixed top-[70px] py-5 z-50 overflow-y-auto">
      <UserBox />
      <PendingOrderNumbers />
      <SidebarMenu />
    </div>
  );
};

export default LeftSideMenu;
