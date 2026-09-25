import React from "react";

const Menu = ({ item }) => {
  const { image, price, name, recipe, category } = item;

  return (
    <div className="group p-4 rounded-2xl transition-all duration-300 hover:bg-slate-900/60 border border-transparent hover:border-amber-500/20">
      <div className="flex gap-5 items-start">
        {/* Food Image with Artisan Cutout */}
        <div
          className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden shadow-lg border border-amber-500/30"
          style={{ borderRadius: "0 28px 28px 28px" }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {category && (
            <span className="absolute bottom-1 right-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/80 text-amber-400 font-bold backdrop-blur-xs">
              {category}
            </span>
          )}
        </div>

        {/* Content & Price Leader */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-cinzel text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors tracking-wide truncate">
              {name}
            </h3>
            {/* Elegant Dotted Leader */}
            <span className="hidden sm:inline-block flex-1 border-b border-dotted border-gray-700/80 mx-2"></span>
            {/* Gold Price Tag */}
            <span className="font-cinzel text-lg md:text-xl font-extrabold text-amber-400 shrink-0">
              ${typeof price === "number" ? price.toFixed(2) : price}
            </span>
          </div>

          <p className="text-gray-400 text-xs md:text-sm font-light mt-1.5 leading-relaxed line-clamp-2">
            {recipe}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
