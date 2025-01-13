import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main/Main";
import Home from "./Home/Home";
import Menu from "./Page/OurmenuSection/Menu";
import Shop from "./Page/Ourshopesection/Shop/Shop";
import Contact from "./Page/ContactSection/Contact";
import Login from "./Page/Login/Login";
import Authprovider from "./AuthProvider/Authprovider";
import Signup from "./Page/SignupPage/Signup";
import Privet from "./PrivetRoute/Privet";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashbord from "./DashBoardsection/Dashboard/Dashbord";
import Mycart from "./DashBoardsection/DashboardPageSection/Mycart/Mycart";
import Users from "./DashBoardsection/DashboardPageSection/DashBoardAddminsection/Allusers/Users";
import Additems from "./DashBoardsection/Dashboard/AdminRoutes/AddItems/Additems";
import AdminRoute from "./AdminRoute/AdminRoute";
import Mange from "./DashBoardsection/DashboardPageSection/DashBoardAddminsection/ManageItems/Mange";
import Payment from "./DashBoardsection/Dashboard/Payment/Payment";
import PaymentHistory from "./DashBoardsection/Dashboard/PaymentHistory/PaymentHistory";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: (
          <Privet>
            <Menu></Menu>
          </Privet>
        ),
      },
      {
        path: "/shop/:category",
        element: <Shop></Shop>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path:'dashboard',
    element:<Privet><Dashbord></Dashbord></Privet>,
    children:[
      {
        path:"cart",
        element:<Mycart></Mycart>
      },
      {
        path:"payment",
        element:<Payment></Payment>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },
      // addmin sectionstart
      {
        path:'users',
        element:<AdminRoute><Users></Users></AdminRoute>
      },
      {
        path:"additems",
        element:<AdminRoute><Additems></Additems></AdminRoute>
      },{
        path:'manageItems',
        element:<AdminRoute><Mange></Mange></AdminRoute>
      }

    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
    
          <RouterProvider router={router}></RouterProvider>
       
      </QueryClientProvider>
    </Authprovider>
  </StrictMode>
);
