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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <div className="w-11/12 mx-auto">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </QueryClientProvider>
    </Authprovider>
  </StrictMode>
);
