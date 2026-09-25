import React, { useState } from "react";
import Sheared from "../../../../ShearedSEction/Sheared";
import { useQuery } from "@tanstack/react-query";
import UseAxiossecure from "../../../../Useaxios/UseAxiossecure";
import { MdDeleteForever } from "react-icons/md";
import { FaUser, FaUserShield, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";

const Users = () => {
  const Axiossecure = UseAxiossecure();
  const useAxiospublic = Axiospublic();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await useAxiospublic.get("/user");
        return res.data || [];
      } catch {
        return [];
      }
    },
  });

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Delete user account?",
      text: `Are you sure you want to remove ${name || "this user"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete",
      background: "#0f172a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        Axiossecure.delete(`user/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User account removed.",
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

  const handleMakeAdmin = (id, name) => {
    Swal.fire({
      title: "Grant Admin Privileges?",
      text: `Make ${name || "this user"} an executive admin of Bistro Boss?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, promote to Admin",
      background: "#0f172a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        Axiossecure.patch(`user/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Promoted!",
              text: `${name || "User"} is now an Admin.`,
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

  const filteredUsers = users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      <Sheared Subtitle="Account Management" title="ALL REGISTERED DINERS" />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-white">
            Total Diners ({users.length})
          </h3>
          <p className="text-gray-400 text-xs">Registered diners and staff credentials</p>
        </div>

        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
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
                  <th className="py-4 px-6">Diner Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {filteredUsers.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-500">{index + 1}</td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {item.name || "Valued Diner"}
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-xs">
                      {item.email}
                    </td>
                    <td className="py-4 px-6">
                      {item.role === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-400/40">
                          <FaUserShield /> Admin
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(item._id, item.name)}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-gray-300 hover:text-amber-400 hover:bg-slate-750 border border-gray-700 transition"
                          title="Click to promote to Admin"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        className="p-2.5 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white border border-red-800/40 transition-all"
                        title="Delete user"
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

export default Users;
