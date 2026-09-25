import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div className="bg-[#0b0f19] text-gray-100 min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      <Navbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
