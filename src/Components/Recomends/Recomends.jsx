import React, { useContext } from 'react';
import Sheared from '../../ShearedSEction/Sheared';
import { Authcontext } from '../../AuthProvider/Authprovider';
import useCart from '../../TanstakeHook/useCart';
import Axiospublic from '../../AxiosPublic/Axiospublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCartPlus } from 'react-icons/fa';

const chefPicks = [
  {
    _id: "chef_pick_01",
    name: "Wagyu Ribeye Steak Au Poivre",
    category: "Chef's Special",
    price: 48.0,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80",
    recipe: "Marble score 8+ Wagyu, cracked black peppercorn crust, cognac reduction, and duck fat fries."
  },
  {
    _id: "chef_pick_02",
    name: "Truffle Burrata & Heirloom Salad",
    category: "Artisan Salad",
    price: 18.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?auto=format&fit=crop&w=600&q=80",
    recipe: "Creamy Italian burrata, heirloom tomatoes, white truffle oil, 25-yr balsamic, and micro basil."
  },
  {
    _id: "chef_pick_03",
    name: "Truffle Wild Mushroom Pizza",
    category: "Wood-Fired",
    price: 24.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    recipe: "Fior di latte, black truffle paste, wild chanterelles, fresh thyme, and shaved 24-mo Parmigiano."
  }
];

const Recomends = () => {
  const { user } = useContext(Authcontext);
  const [, refetch] = useCart();
  const useAxiospublic = Axiospublic();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuId: item._id,
        name: item.name,
        recipe: item.recipe,
        image: item.image,
        price: item.price,
        email: user.email,
      };

      useAxiospublic.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} added to cart!`,
            showConfirmButton: false,
            timer: 2000,
            background: "#0f172a",
            color: "#fff",
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Sign in Required",
        text: "Please sign in to add items to your cart",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#d97706",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Sign In",
        background: "#0f172a",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <section className="my-28 max-w-7xl mx-auto px-4">
      <Sheared Subtitle="Handpicked by Head Chef" title="CHEF RECOMMENDS" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {chefPicks.map((dish) => (
          <div
            key={dish._id}
            className="group rounded-3xl overflow-hidden bg-slate-900/80 border border-amber-500/20 hover:border-amber-400 hover:shadow-gold-glow transition-all duration-500 flex flex-col justify-between"
          >
            {/* Dish Image */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
              {/* Category Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950/80 text-amber-400 border border-amber-400/40 backdrop-blur-md">
                {dish.category}
              </span>

              {/* Price Tag */}
              <span className="absolute top-4 right-4 px-3.5 py-1 rounded-full text-sm font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg">
                ${dish.price.toFixed(2)}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                  <FaStar />
                  <span className="font-bold text-white text-sm">{dish.rating}</span>
                  <span className="text-gray-400 ml-1">(Chef Selection)</span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light mt-2 line-clamp-3 leading-relaxed">
                  {dish.recipe}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-gray-800">
                <button
                  onClick={() => handleAddToCart(dish)}
                  className="w-full py-3 rounded-full font-bold text-sm tracking-wider uppercase bg-slate-800/90 text-amber-400 border border-amber-500/40 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <FaCartPlus className="text-sm" />
                  Add To Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recomends;

