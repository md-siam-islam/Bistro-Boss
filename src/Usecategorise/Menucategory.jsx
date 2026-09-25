import React from "react";
import Menu from "../ShearedSEction/Menu/Menu";
import Cover from "../ShearedSEction/Cover/Cover";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const Menucategory = ({ items = [], img, title, subtitle }) => {
  return (
    <div className="my-16">
      {title && img && (
        <Cover
          img={img}
          title={title}
          subtitle={
            subtitle ||
            `Explore our handcrafted selection of ${title} made with organic produce and artisanal ingredients.`
          }
        />
      )}

      {/* Grid of Dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10 max-w-7xl mx-auto">
        {items.slice(0, 8).map((item, index) => (
          <Menu key={item._id || index} item={item} />
        ))}
      </div>

      {/* Order CTA */}
      {title && (
        <div className="flex justify-center my-10">
          <Link
            to={`/shop/${title.toLowerCase()}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
          >
            <FaShoppingBag className="text-xs" />
            Order Your Favourite {title}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menucategory;

