import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080b11] text-gray-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
