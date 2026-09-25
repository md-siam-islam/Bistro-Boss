import React, { useContext, useState } from "react";
import Sheared from "../../../ShearedSEction/Sheared";
import { Authcontext } from "../../../AuthProvider/Authprovider";
import Axiospublic from "../../../AxiosPublic/Axiospublic";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const { user } = useContext(Authcontext);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const useAxiospublic = Axiospublic();

  const handleSubmitreview = (e) => {
    e.preventDefault();
    const recipe = e.target.recipe.value;
    const suggestion = e.target.suggestion.value;
    const shortway = e.target.shortway.value;

    const review = {
      recipe,
      suggestion,
      details: shortway,
      rating,
      name: user?.displayName || "Anonymous Diner",
      email: user?.email || "diner@bistroboss.com",
      avatar: user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
      position: "Verified Diner",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    useAxiospublic.post("/review", review).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for your valuable culinary review!",
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#fff",
        });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Sheared Subtitle="Share Your Experience" title="RATE YOUR DINING VISIT" />

      <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <h3 className="font-cinzel text-xl font-bold text-white text-center mb-2">
          How Was Your Culinary Experience?
        </h3>
        <p className="text-gray-400 text-xs text-center mb-8">
          Your feedback guides our master chefs and helps maintain our Michelin-level culinary standards.
        </p>

        {/* Interactive Star Rating */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl transition-transform hover:scale-125 focus:outline-none"
            >
              <FaStar
                className={`${
                  star <= (hoverRating || rating)
                    ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                    : "text-gray-600"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-amber-400 font-bold text-lg font-cinzel">
            {rating}.0 / 5.0
          </span>
        </div>

        <form onSubmit={handleSubmitreview} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Which Dish Did You Enjoy Most?
            </label>
            <input
              type="text"
              name="recipe"
              required
              placeholder="e.g. Pan Roasted Duck Magret, Truffle Burrata, Wagyu Ribeye..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Suggestions for Sommelier or Head Chef
            </label>
            <input
              type="text"
              name="suggestion"
              placeholder="e.g. More vintage Bourdeaux by the glass, faster dessert pairing..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Your Review in Detail *
            </label>
            <textarea
              name="shortway"
              required
              rows="5"
              placeholder="Describe the aroma, flavor depth, temperature, wine balance, and hospitality during your evening..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            ></textarea>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
            >
              Submit Gastronomy Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
