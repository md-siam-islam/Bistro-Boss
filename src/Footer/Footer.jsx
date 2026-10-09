import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUtensils, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    Swal.fire({
      icon: "success",
      title: "Welcome to Bistro Boss Club",
      text: "Thank you for subscribing! Check your inbox for your 15% VIP welcome voucher.",
      confirmButtonColor: "#d97706",
      background: "#0f172a",
      color: "#ffffff",
    });
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#05070b] border-t border-amber-500/20 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <FaUtensils className="text-slate-950 text-base" />
              </div>
              <div>
                <span className="font-cinzel text-2xl font-extrabold tracking-wider text-white">
                  BISTRO <span className="text-amber-400">BOSS</span>
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gray-400 uppercase font-sans">
                  Fine Dining & Lounge
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting unforgettable culinary memories since 2018. Where artisanal mastery meets organic local terroir and unparalleled hospitality.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-400/30">
                ✦ Michelin Star Recognition · Farm to Table
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-cinzel text-lg font-bold text-white tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              EXPLORE
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500/50">›</span> Home Sanctuary
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500/50">›</span> Artisanal Menu
                </Link>
              </li>
              <li>
                <Link to="/shop/salad" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500/50">›</span> Gourmet Online Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500/50">›</span> Table Reservation
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500/50">›</span> VIP Diner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 className="font-cinzel text-lg font-bold text-white tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              VISIT US
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                <span>124 Gourmet Boulevard, Culinary Quarter, Foodie Haven</span>
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-400 shrink-0" />
                <a href="tel:+8801951737356" className="hover:text-amber-400 transition-colors">
                  +880 1951-737356
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a href="mailto:concierge@bistroboss.com" className="hover:text-amber-400 transition-colors">
                  concierge@bistroboss.com
                </a>
              </p>
              <div className="pt-2 border-t border-gray-800">
                <p className="flex items-start gap-3 text-xs text-gray-400">
                  <FaClock className="text-amber-400 mt-0.5 shrink-0" />
                  <span>
                    Mon - Fri: 11:00 AM – 11:00 PM<br />
                    Sat - Sun: 10:00 AM – 12:00 Midnight
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div>
            <h4 className="font-cinzel text-lg font-bold text-white tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              GASTRONOMY CLUB
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive chef tasting invites, seasonal menu launches, and private sommelier notes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 bg-slate-900/90 border border-amber-500/30 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300"
              >
                Join VIP Club
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-slate-900 border border-amber-500/20 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-slate-900 border border-amber-500/20 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-slate-900 border border-amber-500/20 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-110 transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-slate-900 border border-amber-500/20 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Bistro Boss Restaurant & Bar. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Dining</a>
            <a href="#allergy" className="hover:text-amber-400 transition-colors">Allergen Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
