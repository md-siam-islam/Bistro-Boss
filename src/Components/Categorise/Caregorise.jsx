import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Sheared from "../../ShearedSEction/Sheared";

import slider1 from "../../assets/home/slide1.jpg";
import slider2 from "../../assets/home/slide2.jpg";
import slider3 from "../../assets/home/slide3.jpg";
import slider4 from "../../assets/home/slide4.jpg";
import slider5 from "../../assets/home/slide5.jpg";

const categories = [
  {
    name: "Artisan Salads",
    slug: "salad",
    image: slider1,
    desc: "Farm-fresh organic greens, burrata & truffle emulsions",
  },
  {
    name: "Wood-Fired Pizzas",
    slug: "pizza",
    image: slider2,
    desc: "Fermented sourdough crusts & San Marzano tomatoes",
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
    desc: "Belgian lava cakes, crèmes brûlées & tiramisus",
  },
  {
    name: "Handcrafted Drinks",
    slug: "drinks",
    image: slider5,
    desc: "Infused mocktails, saffron elixirs & cold brews",
  },
];

const Caregorise = () => {
  return (
    <section className="my-24">
      <Sheared
        Subtitle="Curated Culinary Journey"
        title="ORDER BY CATEGORY"
      />

      <div className="mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-14"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/shop/${cat.slug}`}
                className="group relative block h-[380px] rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl transition-all duration-500 hover:border-amber-400 hover:shadow-gold-glow"
              >
                {/* Background Food Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40 backdrop-blur-md mb-2">
                    Gourmet Selection
                  </span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-300 text-xs mt-2 line-clamp-2 font-light">
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
      </div>
    </section>
  );
};

export default Caregorise;

