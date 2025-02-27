import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Authcontext } from "../AuthProvider/Authprovider";
import useCart from "../TanstakeHook/useCart";
import useAdmin from "../AdminCheack/useAdmin";

const Navbar = () => {
  const { user, Usersignout } = useContext(Authcontext);
  const [isAdmin] = useAdmin();

  const [cart] = useCart();

  return (
    <div className="">
      <div className="navbar  w-full px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">HOME</NavLink>
              </li>
              <li>
                <NavLink to="/menu" className="px-3 font-bold">
                  OUR MENU
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="px-3 font-bold">
                  CONTACT US
                </NavLink>
              </li>

              <li>
                <NavLink to="/shop/salad" className="px-3 font-bold">
                  OUR SHOP
                </NavLink>
              </li>
              {user && !isAdmin && (
                <li>
                  <NavLink
                    to={"/dashboard/userHome"}
                    className="px-3 font-bold"
                  >
                    DASHBOARD
                  </NavLink>
                </li>
              )}
              {user && isAdmin && (
                <li>
                  <NavLink
                    to={"/dashboard/adminHome"}
                    className="px-3 font-bold"
                  >
                    DASHBOARD
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl">
            BISTRO<span className="text-[#FFA500]">BOSS</span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className="px-3 font-bold">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="px-3 font-bold">
                OUR MENU
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/salad" className="px-3 font-bold">
                OUR SHOP
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="px-3 font-bold">
                CONTACT US
              </NavLink>
            </li>
            {user && !isAdmin && (
              <li>
                <NavLink to={"/dashboard/userHome"} className="px-3 font-bold">
                  DASHBOARD
                </NavLink>
              </li>
            )}
            {user && isAdmin && (
              <li>
                <NavLink to={"/dashboard/adminHome"} className="px-3 font-bold">
                  DASHBOARD
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Navber end section */}
        <div className="navbar-end gap-3">
          {user && user?.email ? (
            <div className="flex items-center gap-4">
              <NavLink to={"/dashboard/cart"}>
                <button className="font-bold flex items-center justify-center relative">
                  <img
                    className="w-8"
                    src="https://img.icons8.com/?size=48&id=j3XI41kBOIXY&format=png"
                    alt=""
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </div>
                </button>
              </NavLink>
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-700"
                src={user.photoURL}
                alt="User Avatar"
              />
              <NavLink
                onClick={Usersignout}
                className="btn bg-[#FFA500] font-bold text-white"
              >
                Logout
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to={"/login"}
                className="btn bg-[#FFA500] font-bold text-white"
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                className="btn bg-[#FFA500] font-bold text-white"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
