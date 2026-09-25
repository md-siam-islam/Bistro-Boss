import React from "react";
import Menu from "../../ShearedSEction/Menu/Menu";
import Sheared from "../../ShearedSEction/Sheared";
import { Link } from "react-router-dom";
import useHook from "../../Hooks/Usehooks";
import { FaUtensils } from "react-icons/fa";

const Popularitem = () => {
  const [menu, loading] = useHook();

  const popularItems = menu.filter((item) => item.category === "popular").slice(0, 6);

  return (
    <section className="my-28">
      <Sheared Subtitle="Chef's Signature Selection" title="FROM OUR POPULAR MENU" />

      {loading ? (
        <div className="flex justify-center my-12">
          <span className="loading loading-spinner loading-lg text-amber-400"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10 max-w-7xl mx-auto">
          {popularItems.map((item, index) => (
            <Menu key={item._id || index} item={item} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center mt-12">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider"
        >
          <FaUtensils className="text-xs" />
          View Full Artisanal Menu
        </Link>
      </div>
    </section>
  );
};

export default Popularitem;

