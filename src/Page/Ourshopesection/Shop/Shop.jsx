import React, { useState } from "react";
import Cover from "../../../ShearedSEction/Cover/Cover";
import shopeBg from "../../../assets/shop/banner2.jpg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useHook from "../../../Hooks/Usehooks";
import ShopCard from "../../../ShearedSEction/ShopFoodCard/ShopCard";
import { useParams } from "react-router-dom";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";

const Shop = () => {
  const { category } = useParams();
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

  const initialIndex = category
    ? Math.max(0, categories.indexOf(category.toLowerCase()))
    : 0;

  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [menu, loading] = useHook();

  const filterAndSort = (items) => {
    let result = items;
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.recipe && item.recipe.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  };

  const salads = filterAndSort(menu.filter((d) => d.category === "salad"));
  const pizzas = filterAndSort(menu.filter((d) => d.category === "pizza"));
  const soups = filterAndSort(menu.filter((d) => d.category === "soup"));
  const desserts = filterAndSort(menu.filter((d) => d.category === "dessert"));
  const drinks = filterAndSort(menu.filter((d) => d.category === "drinks"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Cover
        title="OUR GOURMET SHOP"
        img={shopeBg}
        subtitle="Order freshly prepared artisanal dishes delivered right to your dining room or available for swift contactless pickup."
      />

      {/* Filter and Search Controls */}
      <div className="my-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="relative w-full md:w-2/3">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search our gourmet shop..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-amber-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 text-sm shadow-md"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FaSortAmountDown className="text-amber-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-slate-900 border border-amber-500/30 rounded-full text-white text-sm focus:outline-none focus:border-amber-400"
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
            <TabList className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
              <Tab>Salads ({salads.length})</Tab>
              <Tab>Pizzas ({pizzas.length})</Tab>
              <Tab>Soups ({soups.length})</Tab>
              <Tab>Desserts ({desserts.length})</Tab>
              <Tab>Drinks ({drinks.length})</Tab>
            </TabList>

            {/* Salads */}
            <TabPanel>
              {salads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {salads.map((item, index) => (
                    <ShopCard key={item._id || index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-lg">No salads found matching your search.</p>
                </div>
              )}
            </TabPanel>

            {/* Pizzas */}
            <TabPanel>
              {pizzas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pizzas.map((item, index) => (
                    <ShopCard key={item._id || index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-lg">No pizzas found matching your search.</p>
                </div>
              )}
            </TabPanel>

            {/* Soups */}
            <TabPanel>
              {soups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {soups.map((item, index) => (
                    <ShopCard key={item._id || index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-lg">No soups found matching your search.</p>
                </div>
              )}
            </TabPanel>

            {/* Desserts */}
            <TabPanel>
              {desserts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {desserts.map((item, index) => (
                    <ShopCard key={item._id || index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-lg">No desserts found matching your search.</p>
                </div>
              )}
            </TabPanel>

            {/* Drinks */}
            <TabPanel>
              {drinks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {drinks.map((item, index) => (
                    <ShopCard key={item._id || index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-lg">No drinks found matching your search.</p>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Shop;
