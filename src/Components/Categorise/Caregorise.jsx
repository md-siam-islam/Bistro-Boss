import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Sheared from "../../ShearedSEction/Sheared";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import slider1 from "../../assets/home/slide1.jpg";
import slider2 from "../../assets/home/slide2.jpg";
import slider3 from "../../assets/home/slide3.jpg";
import slider4 from "../../assets/home/slide4.jpg";
import slider5 from "../../assets/home/slide5.jpg";

const categories = [
  {
    name: "Luxury Burgers",
    slug: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    desc: "A5 Japanese Wagyu blends, black truffle aioli & brioche",
  },
  {
    name: "Artisan Pastas",
    slug: "pasta",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    desc: "Hand-rolled ribbons, Maine lobster, and wild truffles",
  },
  {
    name: "Grand Platters",
    slug: "platter",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    desc: "Tomahawk steaks & royal chilled ocean plateaus for sharing",
  },
  {
    name: "Wood-Fired Pizzas",
    slug: "pizza",
    image: slider2,
    desc: "Fermented sourdough crusts & San Marzano tomatoes",
  },
  {
    name: "Artisan Salads",
    slug: "salad",
    image: slider1,
    desc: "Farm-fresh organic greens, burrata & truffle emulsions",
  },
  {
    name: "Gourmet Soups",
    slug: "soup",
    image: slider3,
    desc: "Slow-simmered lobster bisque & French consommés",
  },
  {
    name: "Decadent Desserts",
    slug: "dessert",
    image: slider4,
    desc: "24K gold lava domes, mille-feuilles & cheesecakes",
  },
  {
    name: "Handcrafted Drinks",
    slug: "drinks",
    image: slider5,
    desc: "Smoked mocktails, saffron gold elixirs & cold brews",
  },
];

const Caregorise = () => {
  return (
    <section className="my-24">
      {/* Title - strictly in 1 single line */}
      <Sheared
        Subtitle="Curated Culinary Journey"
        title="ORDER BY CATEGORY"
      />

      <div className="mt-12 relative">
        {/* Swiper Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            prevEl: ".category-swiper-prev",
            nextEl: ".category-swiper-next",
          }}
          pagination={{
            clickable: true,
            el: ".category-swiper-pagination",
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="w-full"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/shop/${cat.slug}`}
                className="group relative block h-[400px] rounded-3xl overflow-hidden border border-amber-500/20 shadow-xl transition-all duration-500 hover:border-amber-400 hover:shadow-[0_20px_40px_rgba(245,158,11,0.25)] hover:-translate-y-2 bg-slate-900"
              >
                {/* Background Food Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-center">
                  <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/85 text-amber-300 border border-amber-400/30 backdrop-blur-md mb-2.5">
                    ✦ Gourmet Selection
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-2 line-clamp-2 font-light">
                    {cat.desc}
                  </p>
                  <span className="inline-block mt-4 text-xs font-bold text-amber-400 tracking-widest uppercase group-hover:translate-x-1 transition-transform">
                    Explore Category →
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows & Pagination Controls placed completely BELOW the cards */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            className="category-swiper-prev w-11 h-11 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous Category"
            title="Previous Category"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Centered Pagination Indicators */}
          <div className="category-swiper-pagination flex items-center justify-center gap-2"></div>

          <button
            className="category-swiper-next w-11 h-11 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next Category"
            title="Next Category"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Caregorise;
