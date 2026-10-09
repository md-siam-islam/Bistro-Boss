import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../AuthProvider/Authprovider";
import useCart from "../TanstakeHook/useCart";
import useAdmin from "../AdminCheack/useAdmin";
import { FaUtensils, FaBars, FaTimes, FaUserCircle, FaShoppingBag, FaCrown } from "react-icons/fa";

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
    `relative px-3.5 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
      isActive
        ? "text-amber-400 font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-amber-400 after:rounded-full after:shadow-[0_0_8px_#f59e0b]"
        : "text-gray-300 hover:text-amber-400"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080b11]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
            : "bg-[#080b11]/70 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform duration-300">
                <FaUtensils className="text-slate-950 text-base" />
              </div>
              <div>
                <span className="font-cinzel text-xl md:text-2xl font-extrabold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                  BISTRO <span className="text-amber-400">BOSS</span>
                </span>
                <span className="block text-[9px] tracking-[0.28em] text-gray-400 uppercase font-sans -mt-1">
                  Fine Dining & Lounge
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/menu" className={navLinkClass}>
                Menu
              </NavLink>
              <NavLink to="/shop/salad" className={navLinkClass}>
                Order Online
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Reservations
              </NavLink>
              {user && (
                <NavLink
                  to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>
              )}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <Link
                to={user ? "/dashboard/cart" : "/login"}
                className="relative p-2.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 transition-all group"
                title="View Cart"
              >
                <FaShoppingBag className="w-4 h-4 text-amber-400 transition-colors" />
                {cart && cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-[11px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#080b11] shadow-lg">
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
                    className="flex items-center gap-2 p-1 rounded-full border border-amber-500/30 hover:border-amber-400 transition cursor-pointer"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-400/50"
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-amber-400" />
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-3 shadow-2xl bg-slate-950/95 border border-amber-500/30 backdrop-blur-xl rounded-2xl w-64 z-[100] mt-3 space-y-1.5 text-gray-200"
                  >
                    <li className="px-3 py-2 border-b border-gray-800">
                      <p className="font-bold text-white truncate text-sm flex items-center gap-2">
                        <FaCrown className="text-amber-400 text-xs shrink-0" />
                        {user.displayName || "Valued Diner"}
                      </p>
                      <p className="text-xs text-amber-400/80 truncate">
                        {user.email}
                      </p>
                    </li>
                    <li>
                      <Link
                        to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                        className="hover:text-amber-400 hover:bg-slate-900 py-2 rounded-xl transition"
                      >
                        Dashboard Portal
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/cart"
                        className="hover:text-amber-400 hover:bg-slate-900 py-2 rounded-xl transition flex justify-between"
                      >
                        <span>My Order Items</span>
                        <span className="text-amber-400 text-xs font-bold">({cart.length})</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/payment"
                        className="hover:text-amber-400 hover:bg-slate-900 py-2 rounded-xl transition"
                      >
                        Secure Checkout
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/40 py-2 rounded-xl font-medium transition"
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
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-amber-400 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-300"
                  >
                    Book / Join VIP
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 hover:text-white"
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
          <div className="lg:hidden bg-slate-950/95 border-b border-amber-500/20 backdrop-blur-2xl px-6 py-6 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-slate-900 hover:text-amber-400"
              >
                HOME
              </NavLink>
              <NavLink
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-slate-900 hover:text-amber-400"
              >
                OUR MENU
              </NavLink>
              <NavLink
                to="/shop/salad"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-slate-900 hover:text-amber-400"
              >
                ORDER ONLINE
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-slate-900 hover:text-amber-400"
              >
                RESERVATIONS
              </NavLink>
              {user && (
                <NavLink
                  to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-400 hover:bg-slate-900"
                >
                  DASHBOARD
                </NavLink>
              )}

              {!user && (
                <div className="pt-4 border-t border-gray-800 flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-3 text-center text-xs uppercase tracking-wider font-bold text-gray-300 border border-gray-700 rounded-full hover:border-amber-400"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-3 text-center text-xs uppercase tracking-wider font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
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
