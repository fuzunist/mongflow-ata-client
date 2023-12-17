import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

import { verify } from "../services/auth";
import { setUser } from "../store/actions/user";
import { promiseAll } from "../store/actions/apps";

import Loader from "../components/Loader";

const Root = () => {
  const navigate = useNavigate();
  let beforePathname;
  let [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookies] = useCookies(["access_token", "refresh_token"]);

  const verifyHandle = async () => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    console.log("access_token from search params: ", access_token);
    console.log("refresh_token from search params: ", refresh_token);

    if (access_token && refresh_token) {
      setCookies("access_token", access_token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      setCookies("refresh_token", refresh_token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    }
    beforePathname = sessionStorage.getItem("beforePathname");
    console.log("verifyHandle - beforePathnam: ", beforePathname);

    console.log("access_token from cookies: ", cookies.access_token);
    console.log("refresh_token from cookies: ", cookies.refresh_token);

    if (access_token === "undefined" && !cookies?.access_token) {
      console.log("36 line patladı");

      return navigate("/auth/logout");
    }
    const response = await verify(access_token ?? cookies?.access_token);
    console.log("48th line response: ", response);
    if (response?.error) {
      console.log("44 line patladı");
      console.log(response?.error);

      return navigate("/auth/logout");
      // window.location.href = import.meta.env.VITE_CENTRAL_URL;
    }
    setUser({
      ...response,
      tokens: {
        access_token: access_token ?? cookies?.access_token,
        refresh_token: access_token ?? cookies?.refresh_token,
      },
    });
    promiseAll(access_token ?? cookies?.access_token, response.usertype);
    navigate(beforePathname ?? "/dashboard");
  };

  useEffect(() => {
    verifyHandle();
  }, []);

  return <Loader />;
};

export default Root;
