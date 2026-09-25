import React, { useContext } from 'react';
import { Authcontext } from '../../AuthProvider/Authprovider';
import useCart from '../../TanstakeHook/useCart';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCrown, FaShoppingBag, FaStar, FaCalendarCheck, FaUtensils } from 'react-icons/fa';

const UserHome = () => {
  const { user } = useContext(Authcontext);
  const [cart] = useCart();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-950 border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Diner"}
              className="w-24 h-24 rounded-full object-cover border-2 border-amber-400 shadow-xl"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-amber-400 flex items-center justify-center text-amber-400 text-5xl">
              <FaUserCircle />
            </div>
          )}

          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40">
              <FaCrown className="text-amber-400" />
              <span>VIP Gourmet Club Member</span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Welcome back, {user ? user.displayName : "Honored Guest"}!
            </h1>
            <p className="text-gray-400 text-sm font-light">
              Account: {user?.email} • Member ID: BB-9942
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 flex items-center gap-5 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xl">
            <FaShoppingBag />
          </div>
          <div>
            <span className="text-xs uppercase text-gray-400 font-semibold block">Cart Items</span>
            <span className="font-cinzel text-2xl font-bold text-white">{cart.length} Dishes</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 flex items-center gap-5 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xl">
            <FaStar />
          </div>
          <div>
            <span className="text-xs uppercase text-gray-400 font-semibold block">Diner Status</span>
            <span className="font-cinzel text-2xl font-bold text-amber-400">Gold VIP</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 flex items-center gap-5 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xl">
            <FaCalendarCheck />
          </div>
          <div>
            <span className="text-xs uppercase text-gray-400 font-semibold block">Reservations</span>
            <span className="font-cinzel text-2xl font-bold text-white">Confirmed</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 shadow-xl">
        <h3 className="font-cinzel text-xl font-bold text-white mb-6">
          Quick VIP Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/shop/salad"
            className="p-5 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaUtensils className="text-2xl text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Order Food</h4>
            <p className="text-gray-400 text-xs mt-1">Browse gourmet creations</p>
          </Link>

          <Link
            to="/dashboard/cart"
            className="p-5 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaShoppingBag className="text-2xl text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">View Cart</h4>
            <p className="text-gray-400 text-xs mt-1">{cart.length} active selections</p>
          </Link>

          <Link
            to="/dashboard/review"
            className="p-5 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaStar className="text-2xl text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Leave Review</h4>
            <p className="text-gray-400 text-xs mt-1">Share your dining notes</p>
          </Link>

          <Link
            to="/contact"
            className="p-5 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaCalendarCheck className="text-2xl text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-sm">Book Table</h4>
            <p className="text-gray-400 text-xs mt-1">Concierge reservation</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHome;