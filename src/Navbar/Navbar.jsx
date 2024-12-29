import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-black fixed z-50 bg-opacity-50 w-11/12 mx-auto text-white">
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
              <NavLink to="/contact" className="px-3 font-bold">
                CONTACT US
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="px-3 font-bold">
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="px-3 font-bold">
                OUR MENU
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className="px-3 font-bold">
                OUR SHOP
              </NavLink>
            </li>
              
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl">
            BISTRO BOSS
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
              <NavLink to="/contact" className="px-3 font-bold">
                CONTACT US
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="px-3 font-bold">
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="px-3 font-bold">
                OUR MENU
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className="px-3 font-bold">
                OUR SHOP
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn">Button</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
