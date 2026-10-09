import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useHook from "../../Hooks/Usehooks";
import { Authcontext } from "../../AuthProvider/Authprovider";
import useCart from "../../TanstakeHook/useCart";
import Axiospublic from "../../AxiosPublic/Axiospublic";
import Swal from "sweetalert2";
import {
  FaStar,
  FaCartPlus,
  FaArrowLeft,
  FaUtensils,
  FaShieldAlt,
  FaLeaf,
  FaFire,
  FaCheck,
  FaShareAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import ShopCard from "../../ShearedSEction/ShopFoodCard/ShopCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [menu, loading] = useHook();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useContext(Authcontext);
  const [, refetch] = useCart();
  const useAxiospublic = Axiospublic();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuantity(1);
  }, [id]);

  // Find the dish by _id or fallback matching
  const item = menu.find(
    (dish) =>
      String(dish._id) === String(id) ||
      dish.name.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );

  const handleAddToCart = (redirectAfter = false) => {
    if (!item) return;

    if (user && user.email) {
      setIsAdding(true);
      const parsedPrice =
        typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;

      // Create cart promises based on quantity
      const cartItem = {
        menuId: item._id,
        name: item.name,
        recipe: item.recipe || item.description,
        image: item.image,
        price: parsedPrice,
        quantity: quantity,
        email: user.email,
      };

      useAxiospublic
        .post("/carts", cartItem)
        .then((res) => {
          setIsAdding(false);
          if (res.data?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${quantity}x ${item.name} added to your cart!`,
              showConfirmButton: false,
              timer: 2000,
              background: "#0f172a",
              color: "#fff",
            });
            refetch();

            if (redirectAfter) {
              navigate("/dashboard/payment");
            }
          }
        })
        .catch(() => {
          setIsAdding(false);
        });
    } else {
      Swal.fire({
        title: "Sign in Required",
        text: "Please sign in to add dishes to your cart or order online.",
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.name,
        text: `Discover ${item?.name} at Bistro Boss Restaurant!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Link copied to clipboard!",
        showConfirmButton: false,
        timer: 1500,
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-amber-400"></span>
          <p className="text-amber-400 font-cinzel text-lg">Curating culinary details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl mb-4">
          <FaUtensils />
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-3">
          Dish Not Found
        </h2>
        <p className="text-gray-400 text-sm max-w-md mb-6">
          The culinary creation you are seeking may be seasonal or currently being refined by our executive chef.
        </p>
        <Link
          to="/shop/salad"
          className="px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-600 hover:shadow-lg text-xs uppercase tracking-wider"
        >
          Return to Gourmet Shop
        </Link>
      </div>
    );
  }

  // Related items from same category
  const relatedItems = menu
    .filter(
      (d) =>
        d.category === item.category &&
        String(d._id) !== String(item._id)
    )
    .slice(0, 3);

  const itemPrice =
    typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="w-full overflow-x-hidden pb-20 pt-4">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/menu" className="hover:text-amber-400 transition-colors">
            Artisanal Menu
          </Link>
          <span>/</span>
          <Link
            to={`/shop/${item.category || "all"}`}
            className="hover:text-amber-400 capitalize transition-colors"
          >
            {item.category || "Specialty"}
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold truncate max-w-[200px]">
            {item.name}
          </span>
        </div>
      </div>

      {/* Main Details Presentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Hero Showcase Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-slate-900 group">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>

              {/* Floating Category Badge */}
              <span className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/85 text-amber-400 border border-amber-400/40 backdrop-blur-md shadow-lg">
                ✦ {item.category || "Artisanal Specialty"}
              </span>

              {/* Floating Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-5 right-5 p-3 rounded-full bg-slate-950/80 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-lg backdrop-blur-md"
                title="Share this dish"
              >
                <FaShareAlt className="text-sm" />
              </button>

              {/* Bottom Image Ribbon */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  Executive Chef Curated
                </span>
                <span className="px-4 py-1.5 rounded-full text-base font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-xl">
                  ${itemPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Culinary Quality Assurance Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center">
                <FaLeaf className="text-amber-400 text-lg mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">100% Organic</p>
                <p className="text-[10px] text-gray-400">Terroir Ingredients</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center">
                <FaFire className="text-amber-400 text-lg mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">Freshly Prepared</p>
                <p className="text-[10px] text-gray-400">Cooked to Order</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center">
                <FaShieldAlt className="text-amber-400 text-lg mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">Thermal Insulated</p>
                <p className="text-[10px] text-gray-400">Peak Temperature</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center">
                <HiSparkles className="text-amber-400 text-lg mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">Michelin Inspired</p>
                <p className="text-[10px] text-gray-400">World-Class Taste</p>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Details, Story & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Gold Accolade Header */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/30 text-xs font-semibold tracking-widest uppercase mb-3">
                <HiSparkles />
                Bistro Boss Signature Dish
              </div>

              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                {item.name}
              </h1>

              {/* Rating and Price Header */}
              <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-1.5 text-amber-400 text-sm">
                  <div className="flex items-center text-amber-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <span className="font-bold text-white ml-1">
                    {item.rating || 5.0}
                  </span>
                  <span className="text-gray-400 text-xs">
                    (148+ verified diner reviews)
                  </span>
                </div>

                <span className="hidden sm:inline text-gray-700">|</span>

                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <FaCheck className="text-[10px]" /> Available for Immediate Order
                </div>
              </div>
            </div>

            {/* Price Tag Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/20 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 block mb-0.5">
                  Artisanal Price
                </span>
                <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-amber-400">
                  ${itemPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 ml-2">/ portion</span>
              </div>

              {quantity > 1 && (
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Total Price:</span>
                  <span className="font-cinzel text-xl font-bold text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Gastronomic Description */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-base font-bold text-white tracking-wider uppercase text-amber-400">
                The Gastronomic Story
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                {item.description || item.recipe}
              </p>
              {item.recipe && item.description && item.recipe !== item.description && (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-gray-800 text-xs text-gray-400 leading-relaxed">
                  <strong className="text-white">Culinary Preparation Notes: </strong>
                  {item.recipe}
                </div>
              )}
            </div>

            {/* Dietary & Ingredient Highlights */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 block mb-2 font-semibold">
                Dietary Highlights & Allergens
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-gray-800 text-gray-300">
                  🌿 100% Farm Fresh
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-gray-800 text-gray-300">
                  👨‍🍳 Artisan Craftsmanship
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-gray-800 text-gray-300">
                  🧀 Authentic Origin
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-gray-800 text-gray-300">
                  🚫 No Artificial Preservatives
                </span>
              </div>
            </div>

            {/* Quantity Selector and Order Action Row */}
            <div className="pt-4 border-t border-gray-800 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Select Quantity:
                </span>
                <div className="inline-flex items-center rounded-full bg-slate-900 border border-amber-500/40 p-1">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 disabled:opacity-30 disabled:hover:bg-transparent font-bold transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-white text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => handleAddToCart(false)}
                  disabled={isAdding}
                  className="flex-1 py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition-all uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  {isAdding ? (
                    <span className="loading loading-spinner loading-sm text-slate-950"></span>
                  ) : (
                    <>
                      <FaCartPlus className="text-base" />
                      Add to Cart ({quantity}) · ${totalPrice.toFixed(2)}
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleAddToCart(true)}
                  disabled={isAdding}
                  className="flex-1 py-4 rounded-full font-bold text-white bg-slate-900 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 hover:scale-[1.02] transition-all uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <FaUtensils className="text-amber-400 text-xs" />
                  Order & Checkout Now
                </button>
              </div>
            </div>

            {/* Back to Shop Link */}
            <div className="pt-2">
              <Link
                to={`/shop/${item.category || "salad"}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-amber-400 transition-colors uppercase tracking-wider"
              >
                <FaArrowLeft className="text-[10px]" /> Back to {item.category || "Shop"} Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Pairings Section */}
        {relatedItems.length > 0 && (
          <div className="mt-28 pt-16 border-t border-gray-800/80">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.28em] text-amber-400 font-bold block mb-1">
                Complementary Selections
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
                YOU MIGHT ALSO ENJOY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedItems.map((dish) => (
                <ShopCard key={dish._id} item={dish} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
