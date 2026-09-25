import React, { useState } from "react";
import Cover from "../../ShearedSEction/Cover/Cover";
import coverImg from "../../assets/contact/banner.jpg";
import Sheared from "../../ShearedSEction/Sheared";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUserFriends, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2 Guests",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingRef = "BB-" + Math.floor(100000 + Math.random() * 900000);

    Swal.fire({
      icon: "success",
      title: "Reservation Request Received!",
      html: `
        <div class="text-left space-y-2 text-sm text-gray-300">
          <p><strong class="text-amber-400">Confirmation Code:</strong> ${bookingRef}</p>
          <p><strong class="text-white">Diner Name:</strong> ${formData.name}</p>
          <p><strong class="text-white">Date & Time:</strong> ${formData.date || "Upcoming"} at ${formData.time}</p>
          <p><strong class="text-white">Party Size:</strong> ${formData.guests}</p>
          <p class="text-xs text-gray-400 pt-2 border-t border-gray-700">Our VIP Maitre d' will phone you shortly to confirm table placement and wine preferences.</p>
        </div>
      `,
      confirmButtonColor: "#d97706",
      background: "#0f172a",
      color: "#fff",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "19:00",
      guests: "2 Guests",
      notes: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Cover
        img={coverImg}
        title="RESERVATIONS & CONCIERGE"
        subtitle="Secure your table in our main dining hall, private chef salon, or garden courtyard for an evening of culinary splendor."
      />

      <Sheared Subtitle="Visit Our Sanctuary" title="OUR LOCATION & HOURS" />

      {/* 3 Luxury Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 text-center shadow-xl hover:border-amber-400 hover:shadow-gold-glow transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto text-xl shadow-lg shadow-amber-500/20 mb-5">
            <FaPhoneAlt />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white tracking-wider mb-2">
            TELEPHONE CONCIERGE
          </h3>
          <p className="text-amber-400 font-bold text-base">+880 1951-737356</p>
          <p className="text-gray-400 text-xs mt-1">Direct Maitre d' & Private Dining Desk</p>
        </div>

        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 text-center shadow-xl hover:border-amber-400 hover:shadow-gold-glow transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto text-xl shadow-lg shadow-amber-500/20 mb-5">
            <FaMapMarkerAlt />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white tracking-wider mb-2">
            DINING HAVEN
          </h3>
          <p className="text-white font-medium text-sm">124 Gourmet Boulevard</p>
          <p className="text-gray-400 text-xs mt-1">Culinary Quarter, Foodie Haven</p>
        </div>

        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 text-center shadow-xl hover:border-amber-400 hover:shadow-gold-glow transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto text-xl shadow-lg shadow-amber-500/20 mb-5">
            <FaClock />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white tracking-wider mb-2">
            SERVICE HOURS
          </h3>
          <p className="text-white font-medium text-xs">Mon – Fri: 11:00 AM – 11:00 PM</p>
          <p className="text-white font-medium text-xs mt-0.5">Sat – Sun: 10:00 AM – 12:00 MN</p>
          <p className="text-amber-400 text-[11px] font-semibold mt-1">Kitchen closes 45m before closing</p>
        </div>
      </div>

      <Sheared Subtitle="Online Reservation Desk" title="BOOK A TABLE OR SEND AN INQUIRY" />

      {/* Reservation Form */}
      <div className="max-w-4xl mx-auto my-12 rounded-3xl bg-slate-900/90 border border-amber-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lord Marcus Sterling"
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. guest@luxurymail.com"
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +880 1951-737356"
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Party Size *
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="1 Guest">1 Diner (Solo Culinary Experience)</option>
                <option value="2 Guests">2 Guests (Intimate Romance Table)</option>
                <option value="4 Guests">4 Guests (Family or Business Dinner)</option>
                <option value="6 Guests">6 Guests (Celebration Round Table)</option>
                <option value="8+ Private Dining">8+ Guests (Private Dining Salon)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Preferred Dining Time *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="12:00">12:00 PM (Lunch Service)</option>
                <option value="13:30">01:30 PM (Afternoon Tasting)</option>
                <option value="18:00">06:00 PM (Early Dinner)</option>
                <option value="19:30">07:30 PM (Prime Dinner)</option>
                <option value="21:00">09:00 PM (Late Gastronomy)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Dietary Preferences, Allergies, or Anniversary Occasion
            </label>
            <textarea
              rows="4"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Gluten allergy, celebrating our 5th wedding anniversary, preferred window booth table..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Confirm Reservation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
