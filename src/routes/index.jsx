import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Root from "./Root";
import NotFound from "@/pages/not-found";

//layouts
import AuthLayout from "@/layouts/AuthLayout";
import ContentLayout from "@/layouts/ContentLayout";

//navigation
import Dasboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import PendingOrders from "@/pages/PendingOrders";

//apps
import ProformaInvoice from "@/pages/ProformaInvoice";
import Products from "@/pages/Products";
import Sets from "@/pages/Sets";
import Customers from "@/pages/Customers";
import Orders from "@/pages/Orders";
import Stocks from "@/pages/Stocks";
import DailyProductions from "@/pages/DailyProductions";
import Productions from "@/pages/Productions";


//auth
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import LogOut from "@/pages/LogOut";
import ForgetPassword from "@/pages/ForgetPassword";
import Profile from "@/pages/Profile";
import Materials from "@/pages/Materials";
import Expenses from "@/pages/Expenses";
import RecipeMaterialStocks from "@/pages/RecipeMaterialStocks";
import RawMaterialStocks from "@/pages/RawMaterialStocks";
import MaterialStocks from "@/pages/MaterialStocks";
import DailyContacts from "@/pages/DailyContacts";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "logout",
        element: <LogOut />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <ContentLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dasboard />,
        errorElement: <NotFound />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <NotFound />,
      },
      {
        path: "users",
        element: <Users />,
        errorElement: <NotFound />,
      },
      {
        path: "pending-orders",
        element: <PendingOrders />,
      },
      {
        path: "apps/proforma-invoice",
        element: <ProformaInvoice />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/customers",
        element: <Customers />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/contacts/daily",
        element: <DailyContacts />,
        errorElement: <NotFound />,
      },
     
      {
        path: "apps/products",
        element: <Products />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/products/create-set",
        element: <Sets />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/products/edit-set/:editingSetID",
        element: <Sets />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/orders",
        element: <Orders />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/orders/:editingOrderNumber",
        element: <ProformaInvoice />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/stocks",
        element: <Stocks />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/productions/daily",
        element: <DailyProductions />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/productions",
        element: <Productions />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/materials",
        element: <Materials />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/expenses",
        element: <Expenses />,
        errorElement: <NotFound />,
      },
      {
        path: "apps/rawmaterials-stocks",
        element: <MaterialStocks />,
        errorElement: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
