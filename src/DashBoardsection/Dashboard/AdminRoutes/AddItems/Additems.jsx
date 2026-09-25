import { useForm } from "react-hook-form";
import Sheared from "../../../../ShearedSEction/Sheared";
import { FaUtensils, FaImage } from "react-icons/fa6";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";
import UseAxiossecure from "../../../../Useaxios/UseAxiossecure";
import Swal from "sweetalert2";
import { useState } from "react";

const Additems = () => {
  const imagekey = "6f830635465660e6fbef1d712018f776";
  const image_hosting_api_key = `https://api.imgbb.com/1/upload?key=${imagekey}`;
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const useAxiospublic = Axiospublic();
  const Axiossecure = UseAxiossecure();

  const onSubmit = async (data) => {
    if (!data.image || !data.image[0]) {
      Swal.fire({
        icon: "warning",
        title: "Please choose an image",
        text: "Every gourmet dish requires an appetizing photograph.",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }

    setUploading(true);
    const imageFile = { image: data.image[0] };

    try {
      const res = await useAxiospublic.post(image_hosting_api_key, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const menuItems = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.Details,
          image: res.data.data.display_url,
        };

        Axiossecure.post("/menu", menuItems).then((postRes) => {
          setUploading(false);
          reset();
          if (postRes.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Artisanal Dish Added to Menu!",
              showConfirmButton: false,
              timer: 2000,
              background: "#0f172a",
              color: "#fff",
            });
          }
        });
      }
    } catch (error) {
      setUploading(false);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please verify internet connection or try a smaller image size.",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Sheared title="ADD AN ARTISANAL DISH" Subtitle="New Culinary Creation" />

      <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Recipe Name *
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="e.g. Pan-Seared Atlantic Turbot with Saffron Caviar"
              className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Category *
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="salad">Artisan Salad</option>
                <option value="pizza">Wood-Fired Pizza</option>
                <option value="soup">Gourmet Soup</option>
                <option value="dessert">Decadent Dessert</option>
                <option value="drinks">Handcrafted Drinks</option>
                <option value="popular">Popular Signature</option>
                <option value="offered">Special Offer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Price (USD $) *
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                step="0.01"
                placeholder="e.g. 28.50"
                className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Recipe Details & Tasting Notes *
            </label>
            <textarea
              {...register("Details", { required: true })}
              rows="4"
              placeholder="Detail the sauce reduction, heirloom garnish, cooking technique, and tasting profile..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Dish Photograph (Upload File) *
            </label>
            <div className="flex items-center gap-4">
              <input
                {...register("image")}
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-500 text-sm text-gray-400"
              />
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={uploading}
              className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 mx-auto"
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Publishing Dish...
                </>
              ) : (
                <>
                  <FaUtensils /> Publish to Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Additems;
