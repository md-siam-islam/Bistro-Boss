import React, { useState } from 'react';
import Cover from '../../ShearedSEction/Cover/Cover';
import bannerImg from "../../assets/menu/banner3.jpg";
import Sheared from '../../ShearedSEction/Sheared';
import Menucategory from '../../Usecategorise/Menucategory';
import useHook from '../../Hooks/Usehooks';

import saladImg from "../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import { FaSearch, FaUtensils } from 'react-icons/fa';

const Menu = () => {
  const [menu, loading] = useHook();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenu = searchTerm
    ? menu.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.recipe && item.recipe.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : menu;

  const offered = filteredMenu.filter((data) => data.category === "offered" || data.category === "popular");
  const burger = filteredMenu.filter((data) => data.category === "burger");
  const pasta = filteredMenu.filter((data) => data.category === "pasta");
  const platter = filteredMenu.filter((data) => data.category === "platter");
  const pizza = filteredMenu.filter((data) => data.category === "pizza");
  const salad = filteredMenu.filter((data) => data.category === "salad");
  const soup = filteredMenu.filter((data) => data.category === "soup");
  const dessert = filteredMenu.filter((data) => data.category === "dessert");
  const drinks = filteredMenu.filter((data) => data.category === "drinks");

  return (
    <div className="w-full overflow-x-hidden pb-16">
      {/* 1. Full-Width Main Hero Cover */}
      <Cover
        img={bannerImg}
        title="OUR ARTISANAL MENU"
        subtitle="Embark on a culinary voyage of handcrafted French gastronomy, Mediterranean classics, and contemporary fine dining creations."
      />

      {/* Interactive Search & Quick Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto my-10">
          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-400 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes by name or ingredients (e.g. Truffle, Wagyu, Lobster, Burrata)..."
              className="w-full pl-12 pr-20 py-4 bg-slate-900/90 border border-amber-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition shadow-2xl text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-20">
          <span className="loading loading-spinner loading-lg text-amber-400"></span>
        </div>
      ) : (
        <>
          {/* Today's Special Offers */}
          <div id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Sheared Subtitle="Don't Miss" title="TODAY'S SPECIAL OFFERS" />
            <Menucategory items={offered} />
          </div>

          {/* Luxury Burgers if available */}
          {burger.length > 0 && (
            <div id="burgers">
              <Menucategory
                items={burger}
                img="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80"
                title="Burger"
                subtitle="Prime dry-aged Wagyu beef and artisanal buttermilk chicken burgers served on golden toasted brioche."
              />
            </div>
          )}

          {/* Fresh Handcrafted Pastas */}
          {pasta.length > 0 && (
            <div id="pastas">
              <Menucategory
                items={pasta}
                img="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=80"
                title="Pasta"
                subtitle="Hand-rolled egg ribbons, saffron reductions, black truffles, and slow-simmered Chianti ragù."
              />
            </div>
          )}

          {/* Grand Platters */}
          {platter.length > 0 && (
            <div id="platters">
              <Menucategory
                items={platter}
                img="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
                title="Platter"
                subtitle="Grand banquet platters of Tomahawk steaks, royal chilled seafood plateaus, and artisan charcuterie boards."
              />
            </div>
          )}

          {/* Sourdough Pizzas */}
          <div id="pizzas">
            <Menucategory
              items={pizza}
              img={pizzaImg}
              title="Pizza"
              subtitle="Wood-fired artisanal sourdough pizzas topped with San Marzano tomatoes, Fior di Latte, and gourmet truffles."
            />
          </div>

          {/* Fresh Organic Salads */}
          <div id="salads">
            <Menucategory
              items={salad}
              img={saladImg}
              title="Salad"
              subtitle="Crisp heirloom greens, Italian burrata, and light citrus emulsions crafted for refreshing balance."
            />
          </div>

          {/* Slow-Simmered Soups */}
          <div id="soups">
            <Menucategory
              items={soup}
              img={soupImg}
              title="Soup"
              subtitle="Velvety bisques, rich consommés, and seasonal broths simmered for hours to extract deep umami essence."
            />
          </div>

          {/* Decadent Desserts */}
          <div id="desserts">
            <Menucategory
              items={dessert}
              img={dessertImg}
              title="Dessert"
              subtitle="End on an exquisite note with artisanal chocolate lava domes, golden crèmes brûlées, and delicate pastries."
            />
          </div>

          {/* Handcrafted Drinks */}
          {drinks.length > 0 && (
            <div id="drinks">
              <Menucategory
                items={drinks}
                img={bannerImg}
                title="Drinks"
                subtitle="Botanical mocktails, cold brews, and house saffron elixirs crafted by our master mixologists."
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;