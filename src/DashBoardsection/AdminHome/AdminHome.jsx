import React, { useContext } from "react";
import { Authcontext } from "../../AuthProvider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import UseAxiossecure from "../../Useaxios/UseAxiossecure";
import { FaProductHunt, FaUser,FaJediOrder } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useContext(Authcontext);
  const Axiossecure = UseAxiossecure();

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ["adminHomeData"],
    queryFn: async () => {
      const res = await Axiossecure.get("/adminhome");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div>
      <span className="uppercase flex items-center gap-2 ">
        <h1 className="text-2xl font-semibold">Hi Welcome</h1>
        <h1 className="text-2xl font-semibold">
          {user ? user.displayName : "Back"}
        </h1>
      </span>

      <div className="stats shadow my-10">

        <div className="stat bg-[#BB34F5FF]">
          <div className="stat-figure text-secondary">
          </div>
          <div className="stat-title uppercase font-bold text-white">Customers</div>
          <div className="flex items-center justify-center gap-4"><div><FaUser className="text-3xl text-white"></FaUser></div>
          <div className="stat-value text-white">
          {items.users}
          </div></div>
         
        </div>

        <div className="stat bg-[#FE4880]">
          <div className="stat-figure text-secondary">
          </div>
          <div className="stat-title text-white font-bold uppercase">Products</div>
          <div className="flex items-center justify-center gap-4">
          <div className="stat-desc"><FaProductHunt className="text-3xl text-white"></FaProductHunt></div>
          <div className="stat-value text-white">{items.menus}</div>
          </div>
        </div>

        <div className="stat bg-[#6AAEFF]">
          <div className="stat-figure text-secondary">
          </div>
          <div className="stat-title text-white font-bold uppercase">orders</div>
          <div className="flex items-center justify-center gap-4">
          <div className="stat-desc"><FaJediOrder className="text-3xl text-white"></FaJediOrder></div>
          <div className="stat-value text-white">{items.menus}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
