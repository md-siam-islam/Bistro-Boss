import React from "react";

const Cover = ({ img, title, subtitle }) => {
  return (
    <div className="relative mb-16 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
      <div
        className="relative min-h-[380px] md:min-h-[450px] bg-cover bg-center bg-fixed flex items-center justify-center p-6"
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50"></div>

        {/* Center Plaque */}
        <div className="relative z-10 max-w-2xl w-full bg-slate-950/85 backdrop-blur-xl border border-amber-500/30 rounded-3xl px-8 py-10 md:px-14 md:py-12 text-center shadow-gold-glow">
          {/* Subtle gold diamond ornament */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-400"></span>
            <span className="text-amber-400 text-xs">✦</span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-400"></span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-4">
            {title}
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            {subtitle ||
              "Handcrafted with seasonal organic ingredients, refined culinary techniques, and a devotion to gastronomic excellence."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cover;

