import React, { useEffect, useState } from "react";
import Sheared from "../../ShearedSEction/Sheared";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar, FaCheckCircle } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Axiospublic from "../../AxiosPublic/Axiospublic";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const useAxiospublic = Axiospublic();

  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((localReviews) => {
        setReviews(localReviews);
        // Also fetch from API to merge if there are customer reviews submitted
        useAxiospublic
          .get("/review")
          .then((res) => {
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
              const localIds = new Set(localReviews.map((r) => r._id || r.name));
              const remoteExtra = res.data
                .filter((r) => r.details && r.details.trim().length > 0 && !localIds.has(r._id || r.name))
                .map((r) => ({
                  ...r,
                  avatar:
                    r.avatar ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
                  position: r.position || "Verified Diner",
                }));
              if (remoteExtra.length > 0) {
                setReviews([...localReviews, ...remoteExtra]);
              }
            }
          })
          .catch(() => {});
      })
      .catch(() => {
        useAxiospublic
          .get("/review")
          .then((res) => setReviews(res.data || []))
          .catch(() => setReviews([]));
      });
  }, []);

  return (
    <section className="my-28 max-w-7xl mx-auto px-4">
      <Sheared
        Subtitle="Echoes of Delight & Satisfaction"
        title="VALUED GUEST TESTIMONIALS"
      />

      <div className="mt-12 relative max-w-4xl mx-auto">
        <Swiper
          spaceBetween={40}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className="pb-16"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <div className="relative rounded-3xl bg-slate-900/80 border border-amber-500/20 p-8 sm:p-12 md:p-14 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:border-amber-400/40">
                {/* Luxury Quote Mark */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-400 text-xl shadow-md mb-6">
                  <FaQuoteLeft />
                </div>

                {/* Star Rating */}
                <div className="flex items-center justify-center gap-1.5 text-amber-400 text-lg mb-6">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <FaStar key={i} className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-base sm:text-lg md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto mb-8">
                  "{item.details}"
                </p>

                {/* Reviewer Bio */}
                <div className="flex flex-col items-center justify-center">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/60 shadow-lg shadow-amber-500/20 mb-3"
                    />
                  )}
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    {item.name}
                    <FaCheckCircle className="text-amber-400 text-sm" title="Verified Diner" />
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-400/90 font-medium mt-0.5">
                    {item.position || "Gourmet Diner"}
                  </p>
                  {item.dish && (
                    <span className="mt-2 text-[11px] font-sans px-3 py-0.5 rounded-full bg-slate-800 text-gray-300 border border-gray-700">
                      Dishes enjoyed: {item.dish}
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

