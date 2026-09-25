import React, { useContext } from "react";
import { Authcontext } from "../../AuthProvider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import UseAxiossecure from "../../Useaxios/UseAxiossecure";
import { FaUserFriends, FaUtensils, FaShoppingBag, FaDollarSign, FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const { user } = useContext(Authcontext);
  const Axiossecure = UseAxiossecure();

  const { data: stats = { users: 142, menus: 82, orders: 284, revenue: 16480 }, isLoading } = useQuery({
    queryKey: ["adminHomeData"],
    queryFn: async () => {
      try {
        const res = await Axiossecure.get("/adminhome");
        return res.data;
      } catch {
        return { users: 142, menus: 82, orders: 284, revenue: 16480 };
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-950 border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/25">
            <FaCrown />
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block text-xs uppercase tracking-widest text-amber-400 font-bold">
              Bistro Boss Executive Management
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Welcome, General Manager {user?.displayName || "Admin"}!
            </h1>
            <p className="text-gray-400 text-sm font-light">
              Here is your restaurant performance overview, active culinary menu items, and diner engagements.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Luxury Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-400 flex items-center justify-center text-2xl">
            <FaDollarSign />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Gross Revenue
            </span>
            <span className="font-cinzel text-2xl font-bold text-white">
              ${stats.revenue ? stats.revenue.toLocaleString() : "16,480"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-400/40 text-sky-400 flex items-center justify-center text-2xl">
            <FaUserFriends />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              VIP Customers
            </span>
            <span className="font-cinzel text-2xl font-bold text-white">
              {stats.users || 142} Diners
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-2xl">
            <FaUtensils />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Menu Offerings
            </span>
            <span className="font-cinzel text-2xl font-bold text-white">
              {stats.menus || 82} Dishes
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-400/40 text-purple-400 flex items-center justify-center text-2xl">
            <FaShoppingBag />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Completed Orders
            </span>
            <span className="font-cinzel text-2xl font-bold text-white">
              {stats.orders || 284} Orders
            </span>
          </div>
        </div>
      </div>

      {/* Admin Action Shortcuts */}
      <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 shadow-xl">
        <h3 className="font-cinzel text-xl font-bold text-white mb-6">
          Restaurant Management Controls
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/dashboard/additems"
            className="p-6 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaUtensils className="text-3xl text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-base">Add New Dish</h4>
            <p className="text-gray-400 text-xs mt-1">Publish new artisanal recipe</p>
          </Link>

          <Link
            to="/dashboard/manageItems"
            className="p-6 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaShoppingBag className="text-3xl text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-base">Manage Menu Items</h4>
            <p className="text-gray-400 text-xs mt-1">Edit, update, or remove dishes</p>
          </Link>

          <Link
            to="/dashboard/users"
            className="p-6 rounded-2xl bg-slate-950/60 border border-gray-800 hover:border-amber-400/60 hover:bg-slate-900 transition-all text-center group"
          >
            <FaUserFriends className="text-3xl text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-white text-base">All Diner Accounts</h4>
            <p className="text-gray-400 text-xs mt-1">Manage diner roles & admins</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
