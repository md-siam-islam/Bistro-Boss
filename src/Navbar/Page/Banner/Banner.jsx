import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { FaUtensils, FaStar, FaAward, FaCalendarCheck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

import img1 from "../../../assets/home/01.jpg";
import img2 from "../../../assets/home/02.jpg";
import img3 from "../../../assets/home/03.png";
import img4 from "../../../assets/home/04.jpg";

const slides = [
  {
    image: img1,
    badge: "Master Culinary Artistry",
    title: "Artisanal Flavors, Crafted with Pure Passion",
    subtitle: "Experience French & Mediterranean gastronomic brilliance reimagined with organic local terroir and modern technique.",
    link1: "/menu",
    linkText1: "Explore Artisanal Menu",
    link2: "/shop/salad",
    linkText2: "Order Online",
  },
  {
    image: img2,
    badge: "Michelin Standard Hospitality",
    title: "An Atmosphere of Rare Elegance & Indulgence",
    subtitle: "From wood-fired sourdough pizzas to pan-roasted Atlantic haddock, every dish is an intimate celebration of flavor.",
    link1: "/contact",
    linkText1: "Reserve A Table",
    link2: "/menu",
    linkText2: "View Today's Offer",
  },
  {
    image: img3,
    badge: "Farm to Table Excellence",
    title: "Seasonal Harvests & Handpicked Delicacies",
    subtitle: "Immerse yourself in fresh heirloom salads, decadent molten Belgian chocolate, and vintage cellar wines.",
    link1: "/shop/salad",
    linkText1: "Gourmet Shop",
    link2: "/contact",
    linkText2: "Find Our Location",
  },
  {
    image: img4,
    badge: "Award Winning Gastronomy",
    title: "Where Every Bite Tells An Inspiring Story",
    subtitle: "Honored with international recognition for extraordinary sauce craftsmanship, aged cuts, and warm hospitality.",
    link1: "/menu",
    linkText1: "Discover Specialties",
    link2: "/shop/salad",
    linkText2: "Order Takeaway",
  },
];

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden border-b border-amber-500/20">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 md:!w-7 md:!h-2 md:!rounded-full transition-all"></span>`;
          },
        }}
        navigation={true}
        loop={true}
        className="hero-slider w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[580px] sm:h-[640px] md:h-[720px] lg:h-[780px]">
              {/* High-Resolution Immersive Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover scale-105 animate-pulse-slow"
              />

              {/* Multi-Layer Cinematic Gradient Overlay for 100% Contrast & Luxury */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080b11] via-[#080b11]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-[#080b11]/40"></div>

              {/* Centered Content Container */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
                  <div className="max-w-2xl lg:max-w-3xl space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-md">
                      <HiSparkles className="text-amber-400 text-sm" />
                      {slide.badge}
                    </div>

                    {/* Headline */}
                    <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-wide drop-shadow-md">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <Link
                        to={slide.link1}
                        className="px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2"
                      >
                        <FaUtensils className="text-xs" />
                        {slide.linkText1}
                      </Link>

                      <Link
                        to={slide.link2}
                        className="px-8 py-3.5 rounded-full font-semibold text-white bg-slate-950/80 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 hover:scale-105 transition-all duration-300 text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md flex items-center gap-2"
                      >
                        <FaCalendarCheck className="text-amber-400 text-xs" />
                        {slide.linkText2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Accolades Bar (Spanning Full Width with Responsive Alignment) */}
      <div className="w-full bg-[#05070a]/95 border-t border-amber-500/20 backdrop-blur-md py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="flex items-center justify-center gap-3 pt-3 md:pt-0">
              <FaStar className="text-amber-400 text-2xl shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm sm:text-base">4.9 / 5.0 Rating</p>
                <p className="text-xs text-gray-400">Over 3,500+ verified diner reviews</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3 md:pt-0">
              <FaUtensils className="text-amber-400 text-2xl shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm sm:text-base">108+ Creations</p>
                <p className="text-xs text-gray-400">Handcrafted artisanal recipes</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3 md:pt-0">
              <FaAward className="text-amber-400 text-2xl shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm sm:text-base">Michelin Inspired</p>
                <p className="text-xs text-gray-400">Excellence in Gastronomy</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3 md:pt-0">
              <HiSparkles className="text-amber-400 text-2xl shrink-0" />
              <div className="text-left">
                <p className="text-white font-bold text-sm sm:text-base">100% Organic Terroir</p>
                <p className="text-xs text-gray-400">Daily local fresh farm harvests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
