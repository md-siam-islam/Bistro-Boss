import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  FaCartPlus,
  FaHome,
  FaCalendar,
  FaWallet,
  FaList,
  FaUtensils,
  FaArrowLeft,
} from "react-icons/fa";
import { FaBagShopping, FaUser } from "react-icons/fa6";
import { MdReviews, MdEmail } from "react-icons/md";
import useCart from "../../TanstakeHook/useCart";
import useAdmin from "../../AdminCheack/useAdmin";

const Dashbord = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const activeClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25"
        : "text-gray-300 hover:text-amber-400 hover:bg-slate-900/60"
    }`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#070a10] text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#0b0f19] border-b md:border-b-0 md:border-r border-amber-500/20 px-6 py-8 flex flex-col justify-between shrink-0 shadow-2xl">
        <div>
          {/* Brand Emblem */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <FaUtensils />
            </div>
            <div>
              <span className="font-cinzel text-xl font-bold tracking-widest text-white">
                BISTRO <span className="text-amber-400">BOSS</span>
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-gray-400 uppercase font-sans">
                {isAdmin ? "Admin Executive Portal" : "VIP Diner Portal"}
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {isAdmin ? (
              <>
                <NavLink to="/dashboard/adminHome" className={activeClass}>
                  <FaHome className="text-base" /> Admin Overview
                </NavLink>
                <NavLink to="/dashboard/additems" className={activeClass}>
                  <FaUtensils className="text-base" /> Add Culinary Item
                </NavLink>
                <NavLink to="/dashboard/manageItems" className={activeClass}>
                  <FaList className="text-base" /> Manage All Items
                </NavLink>
                <NavLink to="/dashboard/users" className={activeClass}>
                  <FaUser className="text-base" /> Manage Users
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard/userHome" className={activeClass}>
                  <FaHome className="text-base" /> Diner Sanctuary
                </NavLink>
                <NavLink to="/dashboard/cart" className={activeClass}>
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-3">
                      <FaCartPlus className="text-base" /> My Orders Cart
                    </span>
                    {cart.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </NavLink>
                <NavLink to="/dashboard/payment" className={activeClass}>
                  <FaCalendar className="text-base" /> Complete Payment
                </NavLink>
                <NavLink to="/dashboard/paymentHistory" className={activeClass}>
                  <FaWallet className="text-base" /> Payment Records
                </NavLink>
                <NavLink to="/dashboard/review" className={activeClass}>
                  <MdReviews className="text-base" /> Leave a Review
                </NavLink>
              </>
            )}

            {/* Public Quick Links */}
            <div className="pt-6 my-6 border-t border-gray-800 space-y-1.5">
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 px-4 mb-2 font-bold">
                Restaurant Shortcuts
              </span>
              <NavLink to="/" className={activeClass}>
                <FaHome className="text-base" /> Home Sanctuary
              </NavLink>
              <NavLink to="/menu" className={activeClass}>
                <FaList className="text-base" /> Artisanal Menu
              </NavLink>
              <NavLink to="/shop/salad" className={activeClass}>
                <FaBagShopping className="text-base" /> Gourmet Shop
              </NavLink>
              <NavLink to="/contact" className={activeClass}>
                <MdEmail className="text-base" /> Concierge & Table
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Back Link at bottom */}
        <div className="pt-6 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 font-semibold"
          >
            <FaArrowLeft /> Back to Main Dining Room
          </Link>
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashbord;