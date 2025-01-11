import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-288px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
