import React from 'react';
import { FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Callus = () => {
  return (
    <section className="my-28 max-w-7xl mx-auto px-4">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-8 md:p-14 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Info */}
          <div className="space-y-3">
            <span className="inline-block text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
              Immediate VIP Table Reservations & Inquiries
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              Planning a Memorable Evening?
            </h2>
            <p className="text-gray-400 text-sm max-w-xl font-light">
              Speak directly with our Maitre d' for private dining rooms, chef tasting menus, or bespoke anniversary reservations.
            </p>
          </div>

          {/* Right Action Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:+8801951737356"
              className="px-6 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center">
                <FaPhoneAlt className="text-slate-950 text-xs" />
              </div>
              <span>+880 1951-737356</span>
            </a>

            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full font-semibold text-white bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2"
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