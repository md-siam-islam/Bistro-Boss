import React, { useState } from "react";
import Cover from "../../../ShearedSEction/Cover/Cover";
import shopeBg from "../../../assets/shop/banner2.jpg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useHook from "../../../Hooks/Usehooks";
import ShopCard from "../../../ShearedSEction/ShopFoodCard/ShopCard";
import { useParams } from "react-router-dom";
import { FaSearch, FaSortAmountDown, FaUtensils } from "react-icons/fa";

const Shop = () => {
  const { category } = useParams();
  const categoryKeys = [
    "all",
    "burger",
    "pizza",
    "pasta",
    "platter",
    "salad",
    "soup",
    "dessert",
    "drinks",
  ];

  const initialIndex = category
    ? Math.max(0, categoryKeys.indexOf(category.toLowerCase()))
    : 0;

  const [tabIndex, setTabIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [menu, loading] = useHook();

  const filterAndSort = (items) => {
    let result = items;
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.recipe && item.recipe.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) =>
          (typeof a.price === "number" ? a.price : parseFloat(a.price) || 0) -
          (typeof b.price === "number" ? b.price : parseFloat(b.price) || 0)
      );
    } else if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) =>
          (typeof b.price === "number" ? b.price : parseFloat(b.price) || 0) -
          (typeof a.price === "number" ? a.price : parseFloat(a.price) || 0)
      );
    }
    return result;
  };

  const allItems = filterAndSort(menu);
  const burgers = filterAndSort(menu.filter((d) => d.category === "burger"));
  const pizzas = filterAndSort(menu.filter((d) => d.category === "pizza"));
  const pastas = filterAndSort(menu.filter((d) => d.category === "pasta"));
  const platters = filterAndSort(menu.filter((d) => d.category === "platter"));
  const salads = filterAndSort(menu.filter((d) => d.category === "salad"));
  const soups = filterAndSort(menu.filter((d) => d.category === "soup"));
  const desserts = filterAndSort(menu.filter((d) => d.category === "dessert"));
  const drinks = filterAndSort(menu.filter((d) => d.category === "drinks"));

  const tabData = [
    { name: "All Dishes", count: allItems.length, data: allItems },
    { name: "Burgers", count: burgers.length, data: burgers },
    { name: "Pizzas", count: pizzas.length, data: pizzas },
    { name: "Pastas", count: pastas.length, data: pastas },
    { name: "Platters", count: platters.length, data: platters },
    { name: "Salads", count: salads.length, data: salads },
    { name: "Soups", count: soups.length, data: soups },
    { name: "Desserts", count: desserts.length, data: desserts },
    { name: "Drinks", count: drinks.length, data: drinks },
  ];

  return (
    <div className="w-full overflow-x-hidden pb-20">
      {/* 1. Full-Width Cover Banner */}
      <Cover
        title="OUR GOURMET SHOP"
        img={shopeBg}
        subtitle="Order freshly prepared artisanal dishes delivered right to your dining room or available for swift contactless pickup."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter and Search Controls */}
        <div className="my-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="relative w-full md:w-2/3">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes by name or ingredients (e.g. Wagyu, Lobster, Truffle)..."
              className="w-full pl-11 pr-20 py-3.5 bg-slate-900/90 border border-amber-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 text-sm shadow-xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <FaSortAmountDown className="text-amber-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto px-5 py-3.5 bg-slate-900 border border-amber-500/30 rounded-full text-white text-sm focus:outline-none focus:border-amber-400"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <span className="loading loading-spinner loading-lg text-amber-400"></span>
          </div>
        ) : (
          <div className="my-10">
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
              <TabList className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                {tabData.map((tab, idx) => (
                  <Tab key={idx}>
                    {tab.name} ({tab.count})
                  </Tab>
                ))}
              </TabList>

              {tabData.map((tab, idx) => (
                <TabPanel key={idx}>
                  {tab.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {tab.data.map((item, itemIdx) => (
                        <ShopCard key={item._id || itemIdx} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 text-gray-400 bg-slate-900/40 rounded-3xl border border-gray-800">
                      <FaUtensils className="text-3xl text-amber-400/60 mx-auto mb-3" />
                      <p className="text-lg font-cinzel text-white">No dishes found in this selection</p>
                      <p className="text-sm text-gray-500 mt-1">Try clearing your search term or exploring other categories.</p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-4 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-amber-400 border border-amber-500/30"
                        >
                          Clear Search
                        </button>
                      )}
                    </div>
                  )}
                </TabPanel>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
