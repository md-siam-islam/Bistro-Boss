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
          (item.recipe && item.recipe.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : menu;

  const offered = filteredMenu.filter((data) => data.category === "offered" || data.category === "popular");
  const dessert = filteredMenu.filter((data) => data.category === "dessert");
  const pizza = filteredMenu.filter((data) => data.category === "pizza");
  const salad = filteredMenu.filter((data) => data.category === "salad");
  const soup = filteredMenu.filter((data) => data.category === "soup");
  const drinks = filteredMenu.filter((data) => data.category === "drinks");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Hero Cover */}
      <Cover
        img={bannerImg}
        title="OUR ARTISANAL MENU"
        subtitle="Embark on a culinary voyage of handcrafted French gastronomy, Mediterranean classics, and contemporary fine dining creations."
      />

      {/* Interactive Search & Quick Filter Bar */}
      <div className="max-w-2xl mx-auto my-10 px-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dish by name or ingredient (e.g. Truffle, Duck, Burrata, Pizza)..."
            className="w-full pl-11 pr-4 py-3.5 bg-slate-900/90 border border-amber-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition shadow-lg text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-20">
          <span className="loading loading-spinner loading-lg text-amber-400"></span>
        </div>
      ) : (
        <>
          {/* Today's Special Offers */}
          <div id="offers">
            <Sheared Subtitle="Don't Miss" title="TODAY'S SPECIAL OFFERS" />
            <Menucategory items={offered} />
          </div>

          {/* Sourdough Pizzas */}
          <div id="pizzas">
            <Menucategory
              items={pizza}
              img={pizzaImg}
              title="Pizza"
              subtitle="Wood-fired artisanal sourdough pizzas topped with San Marzano tomatoes, Fior di Latte, and gourmet toppings."
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
              subtitle="Velvety bisques, rich consommes, and seasonal broths simmered for hours to extract deep umami essence."
            />
          </div>

          {/* Decadent Desserts */}
          <div id="desserts">
            <Menucategory
              items={dessert}
              img={dessertImg}
              title="Dessert"
              subtitle="End on an exquisite note with artisanal chocolate fondants, golden crèmes brûlées, and delicate pastries."
            />
          </div>

          {/* Handcrafted Drinks if available */}
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