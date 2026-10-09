import React from 'react';
import { FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Callus = () => {
  return (
    <section className="w-full my-28 relative overflow-hidden bg-gradient-to-r from-[#05070a] via-slate-950 to-[#05070a] border-y border-amber-500/30 py-16 md:py-20 shadow-2xl">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Info */}
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-[0.28em] text-amber-400 uppercase bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-400/30">
              Immediate VIP Table Reservations & Private Dining
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              Planning an Unforgettable Evening?
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-light">
              Speak directly with our Concierge Maitre d' for private dining salons, bespoke chef tasting menus, or anniversary celebrations.
            </p>
          </div>

          {/* Right Action Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:+8801951737356"
              className="px-8 py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center">
                <FaPhoneAlt className="text-slate-950 text-xs" />
              </div>
              <span>+880 1951-737356</span>
            </a>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-full font-semibold text-white bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 hover:scale-105 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 backdrop-blur-md"
            >
              <FaCalendarCheck className="text-amber-400" />
              <span>Book Table Online</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Callus;