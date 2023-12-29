import ReactDOM from "react-dom/client";
import "./assets/css/globals.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import "./i18n";
import "./utils/socket";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);

sessionStorage.setItem(
  "beforePathname",
  location.pathname === "/" ? "/dashboard" : location.pathname
);

