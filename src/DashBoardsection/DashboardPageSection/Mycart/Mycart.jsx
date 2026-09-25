import React from "react";
import useCart from "../../../TanstakeHook/useCart";
import Sheared from "../../../ShearedSEction/Sheared";
import { MdDeleteForever } from "react-icons/md";
import { FaCreditCard, FaShoppingBag } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Axiospublic from "../../../AxiosPublic/Axiospublic";

const Mycart = () => {
  const [cart, refetch] = useCart();
  const useAxiospublic = Axiospublic();

  const totalPrice = cart.reduce(
    (total, item) => total + (typeof item.price === "number" ? item.price : parseFloat(item.price) || 0),
    0
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from order?",
      text: "Are you sure you want to remove this culinary selection?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, remove it",
      background: "#0f172a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiospublic.delete(`cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "The dish was removed from your cart.",
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

  return (
    <div className="max-w-6xl mx-auto">
      <Sheared Subtitle="Your Selection" title="MY GOURMET CART" />

      {/* Summary Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-amber-500/20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
            Order Total
          </span>
          <h2 className="font-cinzel text-3xl font-extrabold text-white">
            ${totalPrice.toFixed(2)}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {cart.length} {cart.length === 1 ? "dish" : "dishes"} selected for preparation
          </p>
        </div>

        {cart.length > 0 ? (
          <Link
            to="/dashboard/payment"
            className="px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-2"
          >
            <FaCreditCard /> Proceed to Checkout
          </Link>
        ) : (
          <button
            disabled
            className="px-8 py-3.5 rounded-full font-bold text-gray-500 bg-gray-800 text-sm uppercase tracking-wider cursor-not-allowed"
          >
            Cart is Empty
          </button>
        )}
      </div>

      {/* Cart Items Table */}
      {cart.length > 0 ? (
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-amber-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Dish Preview</th>
                  <th className="py-4 px-6">Culinary Name</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {cart.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-400">{index + 1}</td>
                    <td className="py-4 px-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-amber-500/30 shadow-md"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-cinzel text-base font-bold text-white">{item.name}</p>
                      {item.recipe && (
                        <p className="text-gray-400 text-xs line-clamp-1 font-light max-w-sm">
                          {item.recipe}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 font-cinzel text-amber-400 font-bold text-base">
                      ${(typeof item.price === "number" ? item.price : parseFloat(item.price) || 0).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2.5 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white border border-red-800/40 transition-all"
                        title="Remove dish"
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
      ) : (
        <div className="rounded-3xl bg-slate-900/60 border border-gray-800 p-14 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400 text-2xl mb-4">
            <FaShoppingBag />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white mb-2">
            Your Gourmet Cart is Currently Empty
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
            Explore our artisanal menu to discover Michelin-recommended duck confit, fresh burrata salads, wood-fired pizzas, and decadent desserts.
          </p>
          <Link
            to="/shop/salad"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all text-xs uppercase tracking-wider"
          >
            Explore Gourmet Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default Mycart;
