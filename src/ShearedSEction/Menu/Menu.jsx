import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Menu = ({ item }) => {
  const { image, price, name, recipe, description, category, _id } = item;
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (_id) {
      navigate(`/item/${_id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer p-4 rounded-3xl transition-all duration-300 bg-slate-900/40 hover:bg-slate-900/90 border border-amber-500/10 hover:border-amber-400/40 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="flex gap-4 sm:gap-5 items-center">
        {/* Food Image with Artisan Cutout */}
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 overflow-hidden shadow-lg border border-amber-500/30"
          style={{ borderRadius: "0 28px 28px 28px" }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {category && (
            <span className="absolute bottom-1 right-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-950/90 text-amber-400 font-bold backdrop-blur-xs border border-amber-400/30">
              {category}
            </span>
          )}
        </div>

        {/* Content & Price Leader */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-cinzel text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors tracking-wide truncate">
              {name}
            </h3>
            {/* Elegant Dotted Leader */}
            <span className="hidden sm:inline-block flex-1 border-b border-dotted border-gray-700/80 mx-2"></span>
            {/* Gold Price Tag */}
            <span className="font-cinzel text-base sm:text-lg md:text-xl font-extrabold text-amber-400 shrink-0">
              ${(typeof price === "number" ? price : parseFloat(price) || 0).toFixed(2)}
            </span>
          </div>

          <p className="text-gray-300 text-xs md:text-sm font-light mt-1 leading-relaxed line-clamp-2">
            {recipe || description}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-400/80 group-hover:text-amber-400 flex items-center gap-1 uppercase tracking-wider">
              <FaEye className="text-[10px]" /> View Recipe Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
