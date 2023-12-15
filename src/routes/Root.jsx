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

  let access_token = searchParams.get("access_token");
  let refresh_token = searchParams.get("refresh_token");
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

  const verifyHandle = async () => {
    beforePathname = sessionStorage.getItem("beforePathname");
    console.log("verifyHandle - beforePathnam: ", beforePathname);

    if (!cookies?.access_token) {
      console.log("36 line patladı");
      window.location.href = import.meta.env.VITE_CENTRAL_URL;
    }
    const response = await verify(access_token ?? cookies?.access_token);
    if (response?.error) {
      console.log("44 line patladı");
      console.log(response?.error);
      window.location.href = import.meta.env.VITE_CENTRAL_URL;
    }
    setUser({
      ...response,
      tokens: {
        access_token: access_token ?? cookies?.access_token,
        refresh_token: refresh_token ?? cookies?.refresh_token,
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
