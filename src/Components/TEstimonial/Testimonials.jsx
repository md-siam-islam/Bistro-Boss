import React, { useEffect, useState } from "react";
import Sheared from "../../ShearedSEction/Sheared";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaUtensils, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
                .filter(
                  (r) =>
                    r.details &&
                    r.details.trim().length > 0 &&
                    !localIds.has(r._id || r.name)
                )
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
    <section className="my-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Sheared
        Subtitle="Echoes of Delight & Satisfaction"
        title="VALUED GUEST TESTIMONIALS"
      />

      <div className="mt-14 relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.1}
          spaceBetween={20}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
          }}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          className="testimonial-swiper !py-8 overflow-visible"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={item._id || index} className="h-auto">
              {/* Card Container modeled after reference image */}
              <div className="testimonial-card h-full bg-white text-slate-900 rounded-3xl p-7 sm:p-9 shadow-2xl border border-stone-200/80 flex flex-col justify-between transition-all duration-500">
                {/* 1. Top Brand / Organization Logo */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 text-xs shadow-sm">
                    <FaUtensils />
                  </div>
                  <span className="font-cinzel text-lg sm:text-xl font-extrabold tracking-wider text-slate-900">
                    BISTRO <span className="text-amber-600">BOSS</span>
                  </span>
                  <span className="text-amber-500 text-xs">✦</span>
                </div>

                {/* 2. Quotation Mark */}
                <div className="text-4xl sm:text-5xl font-serif text-slate-900 leading-none mb-2 select-none">
                  “
                </div>

                {/* 3. Review Paragraph */}
                <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal mb-8 line-clamp-4 flex-1">
                  {item.details}
                </p>

                {/* 4. Bottom Divider and Author Details */}
                <div className="pt-5 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-4 text-left">
                    {/* Circular Avatar */}
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-amber-400/50 shadow-md shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      {/* Name */}
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
                        {item.name}
                      </h4>
                      {/* Designation */}
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                        {item.position || "Verified Gourmet Diner"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows & Pagination Controls BELOW the cards */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            className="testimonial-prev w-11 h-11 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous Review"
            title="Previous Review"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Centered Pagination Indicators */}
          <div className="testimonial-pagination flex items-center justify-center gap-2"></div>

          <button
            className="testimonial-next w-11 h-11 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next Review"
            title="Next Review"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
