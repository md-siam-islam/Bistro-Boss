import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FaUtensils, FaStar, FaAward } from "react-icons/fa";
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
    linkText1: "Explore Full Menu",
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
    linkText1: "Order Now",
    link2: "/contact",
    linkText2: "Find Our Location",
  },
  {
    image: img4,
    badge: "Award Winning Gastronomy 2025",
    title: "Where Every Bite Tells An Inspiring Story",
    subtitle: "Honored with international recognition for extraordinary sauce craftsmanship, aged cuts, and warm hospitality.",
    link1: "/menu",
    linkText1: "Discover Specialties",
    link2: "/shop/salad",
    linkText2: "Gourmet Shop",
  },
];

const Banner = () => {
  return (
    <div className="relative mb-20 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        className="hero-carousel"
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[560px] md:h-[680px] w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark & Gold Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40 flex items-center">
              <div className="max-w-3xl px-6 sm:px-12 md:px-16 text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
                  <HiSparkles className="text-amber-400 text-sm" />
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-wide mb-4">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.link1}
                    className="px-7 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300 text-sm tracking-wider uppercase flex items-center gap-2"
                  >
                    <FaUtensils className="text-xs" />
                    {slide.linkText1}
                  </Link>
                  <Link
                    to={slide.link2}
                    className="px-7 py-3.5 rounded-full font-semibold text-white bg-slate-900/80 border border-amber-400/40 hover:bg-amber-500/20 hover:border-amber-400 hover:scale-105 transition-all duration-300 text-sm tracking-wider uppercase backdrop-blur-md"
                  >
                    {slide.linkText2}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Floating Metrics Strip */}
      <div className="hidden lg:grid grid-cols-3 divide-x divide-amber-500/20 bg-slate-950/80 backdrop-blur-xl border-t border-amber-500/20 py-4 px-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <FaStar className="text-amber-400 text-xl" />
          <div className="text-left">
            <p className="text-white font-bold text-sm">4.9 / 5.0 Rating</p>
            <p className="text-xs text-gray-400">Over 3,500+ verified diner reviews</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <FaUtensils className="text-amber-400 text-xl" />
          <div className="text-left">
            <p className="text-white font-bold text-sm">80+ Artisanal Creations</p>
            <p className="text-xs text-gray-400">Fresh daily handcrafted recipes</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <FaAward className="text-amber-400 text-xl" />
          <div className="text-left">
            <p className="text-white font-bold text-sm">Michelin Recommended</p>
            <p className="text-xs text-gray-400">Awarded for culinary excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

