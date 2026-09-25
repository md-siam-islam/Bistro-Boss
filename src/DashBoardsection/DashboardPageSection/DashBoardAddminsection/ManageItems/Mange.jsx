import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";
import Sheared from "../../../../ShearedSEction/Sheared";

const Mange = () => {
  const useAxiospublic = Axiospublic();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: menu = [], refetch, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      try {
        const res = await useAxiospublic.get("/menu");
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          return res.data;
        }
      } catch {}
      const fallback = await fetch("/Menu.json").then((r) => r.json());
      return fallback;
    },
  });

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Delete this dish?",
      text: `Are you sure you want to remove "${name}" from the restaurant menu?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete item",
      background: "#0f172a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiospublic.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${name} has been removed from the menu.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: "#0f172a",
              color: "#fff",
            });
          }
        });
      }
    });
  };

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <Sheared Subtitle="Culinary Catalog" title="MANAGE MENU ITEMS" />

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-white">
            Total Menu Items ({menu.length})
          </h3>
          <p className="text-gray-400 text-xs">Active dishes listed across all categories</p>
        </div>

        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dish..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-gray-700 rounded-full text-white text-sm focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-16">
          <span className="loading loading-spinner loading-lg text-amber-400"></span>
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-amber-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Dish Image</th>
                  <th className="py-4 px-6">Recipe Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {filteredMenu.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-500">{index + 1}</td>
                    <td className="py-4 px-6">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80"}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shadow-md"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-cinzel text-sm sm:text-base font-bold text-white">{item.name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-slate-950 text-amber-400 border border-gray-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-cinzel text-amber-400 font-bold text-base">
                      ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        className="p-2.5 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white border border-red-800/40 transition-all"
                        title="Delete item"
                      >
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mange;
