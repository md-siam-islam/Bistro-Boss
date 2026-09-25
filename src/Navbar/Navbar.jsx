import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../AuthProvider/Authprovider";
import useCart from "../TanstakeHook/useCart";
import useAdmin from "../AdminCheack/useAdmin";
import { FaUtensils, FaBars, FaTimes, FaUserCircle, FaShoppingBag } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Navbar = () => {
  const { user, Usersignout } = useContext(Authcontext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Usersignout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-semibold tracking-wider transition-all duration-300 ${
      isActive
        ? "text-amber-400 font-bold"
        : "text-gray-300 hover:text-amber-300"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0b0f19]/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl py-3"
            : "bg-gradient-to-b from-[#0b0f19]/90 via-[#0b0f19]/60 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <FaUtensils className="text-slate-950 text-lg" />
              </div>
              <div>
                <span className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors">
                  BISTRO <span className="text-amber-400">BOSS</span>
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gray-400 uppercase font-sans -mt-1">
                  Artisanal Dining
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass}>
                HOME
              </NavLink>
              <NavLink to="/menu" className={navLinkClass}>
                OUR MENU
              </NavLink>
              <NavLink to="/shop/salad" className={navLinkClass}>
                OUR SHOP
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                CONTACT US
              </NavLink>
              {user && (
                <NavLink
                  to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                  className={navLinkClass}
                >
                  <span className="flex items-center gap-1">
                    <HiSparkles className="text-amber-400 text-xs" />
                    DASHBOARD
                  </span>
                </NavLink>
              )}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <Link
                to={user ? "/dashboard/cart" : "/login"}
                className="relative p-2.5 rounded-full bg-slate-900/80 border border-amber-500/20 text-amber-400 hover:border-amber-400 hover:scale-105 transition-all shadow-md group"
                title="View Cart"
              >
                <FaShoppingBag className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                {cart && cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg border border-slate-900 animate-pulse">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* User Authentication state */}
              {user && user.email ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 p-1 rounded-full border border-amber-500/40 hover:border-amber-400 transition cursor-pointer"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-amber-400" />
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-3 shadow-2xl bg-[#0f172a] border border-amber-500/20 rounded-2xl w-60 z-[100] mt-3 space-y-1 text-gray-200"
                  >
                    <li className="px-3 py-2 border-b border-gray-800">
                      <p className="font-bold text-white truncate text-sm">
                        {user.displayName || "Valued Diner"}
                      </p>
                      <p className="text-xs text-amber-400/80 truncate">
                        {user.email}
                      </p>
                    </li>
                    <li>
                      <Link
                        to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                        className="hover:text-amber-400 py-2"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/cart" className="hover:text-amber-400 py-2">
                        My Orders ({cart.length})
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/30 py-2 font-medium"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-200 hover:text-amber-400 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-gray-700 text-gray-200 hover:text-amber-400"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b0f19]/98 border-b border-amber-500/20 px-6 py-5 backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-200 hover:bg-amber-500/10 hover:text-amber-400"
              >
                HOME
              </NavLink>
              <NavLink
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-200 hover:bg-amber-500/10 hover:text-amber-400"
              >
                OUR MENU
              </NavLink>
              <NavLink
                to="/shop/salad"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-200 hover:bg-amber-500/10 hover:text-amber-400"
              >
                OUR SHOP
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-200 hover:bg-amber-500/10 hover:text-amber-400"
              >
                CONTACT US
              </NavLink>
              {user && (
                <NavLink
                  to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 hover:bg-amber-500/10"
                >
                  DASHBOARD
                </NavLink>
              )}

              {!user && (
                <div className="pt-3 border-t border-gray-800 flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2.5 text-center text-sm font-semibold text-gray-200 border border-gray-700 rounded-lg hover:border-amber-400"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2.5 text-center text-sm font-bold text-slate-950 bg-amber-400 rounded-lg"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content is not hidden behind the fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navbar;

