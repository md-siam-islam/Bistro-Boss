import React from "react";

const Cover = ({ img, title, subtitle }) => {
  return (
    <div className="relative w-full mb-16 overflow-hidden border-y border-amber-500/20 shadow-2xl">
      <div
        className="relative min-h-[420px] md:min-h-[500px] bg-cover bg-center bg-fixed flex items-center justify-center px-4 py-16"
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* Dark Vignette Overlay for Depth & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/75 to-[#080b11]/50 backdrop-blur-[2px]"></div>

        {/* Center Luxury Glass Plaque */}
        <div className="relative z-10 max-w-3xl w-full bg-[#080b11]/85 backdrop-blur-xl border border-amber-500/40 rounded-3xl px-6 py-10 md:px-14 md:py-14 text-center shadow-[0_0_35px_rgba(245,158,11,0.2)]">
          {/* Subtle gold diamond ornament */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400"></span>
            <span className="text-amber-400 text-sm">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400"></span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-4 drop-shadow-md">
            {title}
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
            {subtitle ||
              "Handcrafted with seasonal organic ingredients, refined culinary techniques, and a devotion to gastronomic excellence."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
