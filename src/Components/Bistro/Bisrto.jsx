import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaCrown, FaUtensils } from 'react-icons/fa';

const Bisrto = () => {
  return (
    <section className="my-28 relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl bg-img bg-cover bg-center bg-fixed min-h-[550px] flex items-center justify-center p-6 md:p-12">
      {/* Dark Ambient Vignette */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"></div>

      {/* Luxury Glass Story Card */}
      <div className="relative z-10 max-w-4xl mx-auto bg-slate-950/85 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 md:p-14 text-center shadow-gold-glow">
        {/* Crown Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-slate-950 text-2xl shadow-lg shadow-amber-500/30 mb-6">
          <FaCrown />
        </div>

        {/* Title */}
        <span className="block text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-amber-400 mb-2">
          Culinary Heritage & Gastronomy
        </span>
        <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-6">
          THE BISTRO BOSS LEGACY
        </h2>

        {/* Story Paragraph */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto mb-8">
          Founded with a devotion to French culinary precision and Mediterranean warmth, Bistro Boss represents the pinnacle of artisanal dining. Every cut of grain-fed Wagyu, every freshly tossed burrata salad, and every slow-simmered bisque is crafted with genuine reverence for flavor, technique, and unforgettable moments.
        </p>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-amber-500/20 mb-8">
          <div className="flex flex-col items-center">
            <FaAward className="text-amber-400 text-xl mb-1" />
            <span className="text-white font-bold text-sm">Triple Gold Culinary Award</span>
            <span className="text-gray-400 text-xs">Excellence in Gastronomy 2024</span>
          </div>
          <div className="flex flex-col items-center">
            <FaUtensils className="text-amber-400 text-xl mb-1" />
            <span className="text-white font-bold text-sm">Farm-to-Table Fresh</span>
            <span className="text-gray-400 text-xs">100% Organic Local Suppliers</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCrown className="text-amber-400 text-xl mb-1" />
            <span className="text-white font-bold text-sm">Master Sommelier Pairing</span>
            <span className="text-gray-400 text-xs">Vintage Cellar Selections</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider"
        >
          Discover Our Story & Menu
        </Link>
      </div>
    </section>
  );
};

export default Bisrto;