import React from 'react';

const Sheared = ({ Subtitle, title }) => {
  return (
    <div className="text-center my-14 max-w-4xl mx-auto px-4">
      {/* Decorative Subtitle */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-amber-400"></span>
        <span className="text-amber-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase font-sans">
          {Subtitle}
        </span>
        <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-amber-400"></span>
      </div>

      {/* Main Title - stays in 1 single line */}
      <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide sm:tracking-wider uppercase py-2 sm:whitespace-nowrap">
        {title}
      </h2>

      {/* Luxury Gold Divider */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400"></span>
        <span className="text-amber-400 text-xs">✦</span>
        <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400"></span>
      </div>
    </div>
  );
};

export default Sheared;