import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Authcontext } from "../../AuthProvider/Authprovider";
import { useNavigate, Link } from "react-router-dom";
import useCart from "../../TanstakeHook/useCart";
import Axiospublic from "../../AxiosPublic/Axiospublic";
import { FaCartPlus, FaStar, FaEye, FaArrowRight } from "react-icons/fa";

const ShopCard = ({ item }) => {
  const { user } = useContext(Authcontext);
  const { name, recipe, description, image, price, _id, category, rating } = item;
  const navigate = useNavigate();
  const useAxiospublic = Axiospublic();
  const [, refetch] = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const parsedPrice =
    typeof price === "number" ? price : parseFloat(price) || 0;

  const handleCart = (e) => {
    e.stopPropagation();
    if (user && user.email) {
      setIsAdding(true);
      const menuData = {
        menuId: _id,
        name: name,
        recipe: recipe || description,
        image: image,
        price: parsedPrice,
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
              title: `${name} added to cart!`,
              showConfirmButton: false,
              timer: 1800,
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
        text: "Please sign in to add dishes to your cart",
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

  const handleDetails = () => {
    navigate(`/item/${_id}`);
  };

  return (
    <div
      onClick={handleDetails}
      className="group cursor-pointer w-full rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 hover:border-amber-400/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Upper Visual Section */}
      <div className="p-3">
        <div className="relative h-56 sm:h-60 rounded-2xl overflow-hidden bg-slate-950">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          {/* Floating Category Pill */}
          {category && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/85 text-amber-400 border border-amber-400/30 backdrop-blur-md shadow-md">
              {category}
            </span>
          )}

          {/* Floating Gold Price Pill */}
          <span className="absolute top-3 right-3 px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg">
            ${parsedPrice.toFixed(2)}
          </span>

          {/* Hover Quick View Center Pill */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-400/50 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <FaEye /> Quick View
            </span>
          </div>
        </div>
      </div>

      {/* Card Info & Actions */}
      <div className="px-5 pb-5 pt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating Strip */}
          <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-2">
            <div className="flex items-center">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="font-bold text-white text-xs ml-1">
              {rating || 5.0}
            </span>
            <span className="text-gray-400 text-[11px]">
              (Chef's Special)
            </span>
          </div>

          {/* Dish Name */}
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {name}
          </h3>

          {/* Recipe / Description */}
          <p className="text-gray-300 text-xs sm:text-sm font-light mt-1.5 leading-relaxed line-clamp-2">
            {recipe || description}
          </p>
        </div>

        {/* Dual Interactive Buttons */}
        <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center gap-2">
          {/* View Details Button */}
          <button
            onClick={handleDetails}
            className="flex-1 py-2.5 px-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider text-amber-400 bg-slate-900/90 border border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-1.5"
            title="View Details"
          >
            <FaEye className="text-xs" />
            <span>Details</span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleCart}
            disabled={isAdding}
            className="flex-1 py-2.5 px-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
          >
            {isAdding ? (
              <span className="loading loading-spinner loading-xs text-slate-950"></span>
            ) : (
              <>
                <FaCartPlus className="text-xs" />
                <span>Add Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
