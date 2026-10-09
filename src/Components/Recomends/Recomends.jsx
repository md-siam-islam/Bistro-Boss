import React from 'react';
import Sheared from '../../ShearedSEction/Sheared';
import ShopCard from '../../ShearedSEction/ShopFoodCard/ShopCard';

const chefPicks = [
  {
    _id: "bb_burger_01",
    name: "Truffle Wagyu Brioche Burger",
    category: "Burger",
    price: 24.5,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    recipe: "A5 Japanese Wagyu blend patty, black winter truffle aioli, melted aged Gruyère, and caramelized balsamic onions on toasted brioche.",
    description: "Our signature luxury burger featuring premium A5 Wagyu beef grilled to juicy perfection, paired with real shaved black truffle aioli."
  },
  {
    _id: "bb_pasta_01",
    name: "Lobster & Saffron Tagliolini",
    category: "Pasta",
    price: 36.0,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    recipe: "Handmade fresh egg tagliolini, poached Maine lobster tail medallions, saffron cream reduction, cherry tomatoes, and micro tarragon.",
    description: "Decadent fresh artisan pasta tossed with succulent Maine lobster meat in a golden Spanish saffron and white wine cream emulsion."
  },
  {
    _id: "bb_pizza_01",
    name: "Burrata Tartufo Wood-Fired Pizza",
    category: "Pizza",
    price: 26.5,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    recipe: "72-hour fermented sourdough crust, Fior di latte mozzarella, whole fresh Pugliese burrata, black truffle puree, and fresh micro basil.",
    description: "Baked at 900°F in our Italian volcanic stone oven, topped with a luscious whole torn burrata sphere and aromatic Italian summer truffles."
  }
];

const Recomends = () => {
  return (
    <section className="my-28 max-w-7xl mx-auto px-4">
      <Sheared Subtitle="Handpicked by Head Chef" title="CHEF RECOMMENDS" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {chefPicks.map((dish) => (
          <ShopCard key={dish._id} item={dish} />
        ))}
      </div>
    </section>
  );
};

export default Recomends;
