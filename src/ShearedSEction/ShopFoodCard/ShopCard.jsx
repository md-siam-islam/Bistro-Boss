import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Authcontext } from "../../AuthProvider/Authprovider";
import { useNavigate } from "react-router-dom";
import useCart from "../../TanstakeHook/useCart";
import Axiospublic from "../../AxiosPublic/Axiospublic";
import { FaCartPlus, FaCheck, FaStar } from "react-icons/fa";

const ShopCard = ({ item }) => {
  const { user } = useContext(Authcontext);
  const { name, recipe, image, price, _id, category } = item;
  const navigate = useNavigate();
  const useAxiospublic = Axiospublic();
  const [, refetch] = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleCart = () => {
    if (user && user.email) {
      setIsAdding(true);
      const menuData = {
        menuId: _id,
        name: name,
        recipe: recipe,
        image: image,
        price: typeof price === "number" ? price : parseFloat(price) || 0,
        email: user.email,
      };

      useAxiospublic
        .post("/carts", menuData)
        .then((data) => {
          setIsAdding(false);
          if (data.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to your cart!`,
              showConfirmButton: false,
              timer: 2000,
              background: "#0f172a",
              color: "#fff",
            });
            refetch();
          }
        })
        .catch(() => {
          setIsAdding(false);
        });
    } else {
      Swal.fire({
        title: "Sign in Required",
        text: "Please sign in to add items to your cart",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#d97706",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Sign In",
        background: "#0f172a",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="group w-full rounded-2xl overflow-hidden bg-slate-900/80 border border-amber-500/20 hover:border-amber-400 hover:shadow-gold-glow transition-all duration-500 flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

        {/* Category Pill */}
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950/85 text-amber-400 border border-amber-400/40 backdrop-blur-md">
            {category}
          </span>
        )}

        {/* Price Pill */}
        <span className="absolute top-3 right-3 px-3.5 py-1 rounded-full text-sm font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg">
          ${typeof price === "number" ? price.toFixed(2) : price}
        </span>
      </div>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <span className="text-gray-400 text-[11px] ml-1">5.0</span>
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm font-light mt-1.5 leading-relaxed line-clamp-2">
            {recipe}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-4 mt-3 border-t border-gray-800">
          <button
            onClick={handleCart}
            disabled={isAdding}
            className="w-full py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-slate-800 text-amber-400 border border-amber-500/40 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            {isAdding ? (
              <span className="loading loading-spinner loading-xs text-amber-400"></span>
            ) : (
              <>
                <FaCartPlus className="text-sm" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;

