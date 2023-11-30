import Loader from "@/components/Loader";
import { setLogOut } from "@/store/actions/user";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [_, __, removeCookie] = useCookies(["access_token", "refresh_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    setLogOut();
    sessionStorage.removeItem("beforePathname");
    window.location.href = import.meta.env.VITE_CENTRAL_URL;
  }, []);

  return <Loader className="fixed top-0 left-0 z-[9999]" />;
};

export default LogOut;
