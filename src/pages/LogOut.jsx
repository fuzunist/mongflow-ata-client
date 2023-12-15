import Loader from "@/components/Loader";
import { setLogOut } from "@/store/actions/user";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const [cookies, __, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);

  useEffect(() => {
    const performLogout = async () => {
      try {
        removeCookie("access_token");
        removeCookie("refresh_token");
        sessionStorage.removeItem("beforePathname");
        setLogOut();
        if (!cookies?.refresh_token && !cookies?.access_token) {
          window.location.href = import.meta.env.VITE_CENTRAL_URL;
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    performLogout();
  }, []);

  return <Loader className="fixed top-0 left-0 z-[9999]" />;
};

export default LogOut;
