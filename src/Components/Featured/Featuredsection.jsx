import React from "react";
import img from "../../../src/assets/home/featured.jpg";
import Sheared from "../../ShearedSEction/Sheared";
import { Link } from "react-router-dom";
import { FaUtensils, FaCalendarAlt, FaStar } from "react-icons/fa";

const Featuredsection = () => {
  return (
    <section className="w-full my-28 relative border-y border-amber-500/20 shadow-2xl bg-img2 bg-cover bg-center bg-fixed">
      {/* Dark & Gold Overlay across 100% full width */}
      <div className="w-full bg-[#080b11]/85 backdrop-blur-[2px] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Sheared
            Subtitle="Seasonal Spotlight Tasting"
            title="THE ART OF GASTRONOMY"
          />

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 mt-12">
            {/* Featured Image */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.25)]">
                <img
                  src={img}
                  alt="Pan Roasted Duck Magret"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-950/90 border border-amber-400 text-amber-400 text-xs font-bold shadow-2xl backdrop-blur-md">
                <FaCalendarAlt />
                <span>Available This Weekend Only</span>
              </div>
            </div>

            {/* Featured Copy & Details */}
            <div className="w-full lg:w-1/2 text-left space-y-5">
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-amber-400 uppercase bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-400/30">
                Chef de Cuisine Feature
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Pan-Roasted Duck Magret with Griottine Cherry Jus
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Succulent French Moulard duck breast scored and crisped to golden perfection, served medium-rare over velvety Dauphinoise potato gratin and finished with a rich tart-sweet cherry reduction sauce.
              </p>
              
              <div className="pt-2 text-xs text-amber-300/90 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-amber-500/20">
                  🍷 Sommelier Pairing: 2019 Pinot Noir
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-amber-500/20">
                  <FaStar className="text-amber-400" /> Chef Signature Selection
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/shop/salad"
                  className="px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <FaUtensils className="text-xs" />
                  Order This Dish
                </Link>
                <Link
                  to="/menu"
                  className="px-8 py-3.5 rounded-full font-semibold text-white bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md"
                >
                  View Full Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featuredsection;
