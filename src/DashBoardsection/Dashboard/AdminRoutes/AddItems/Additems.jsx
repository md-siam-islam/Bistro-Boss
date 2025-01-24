import { useForm } from "react-hook-form";
import Sheared from "../../../../ShearedSEction/Sheared";
import { FaUtensils } from "react-icons/fa6";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";
import UseAxiossecure from "../../../../Useaxios/UseAxiossecure";
import Swal from "sweetalert2";

const Additems = () => {
    const imagekey = "6f830635465660e6fbef1d712018f776"
    
    const image_hosting_api_key = `https://api.imgbb.com/1/upload?key=${imagekey}`
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const useAxiospublic = Axiospublic()
  const Axiossecure = UseAxiossecure()

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
  
    if (!data.image || !data.image[0]) {
      console.error("No file selected!");
      return;
    }
  
    const imageFile = {image:data.image[0]}
  
    try {
      const res = await useAxiospublic.post(image_hosting_api_key, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Response:", res.data);
      if(res.data.success){
        const menuItems = {
          name : data.name,
          category:data.category,
          price:parseFloat(data.price),
          details:data.Details,
          image:res.data.data.display_url
        }
        Axiossecure.post("/menu",menuItems)
        .then((res) =>{
          reset()
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Items Added Successfull",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  
  return (
    <div>
      <Sheared title={"add an items"} Subtitle={"What's new?"}></Sheared>

      <div className="w-full flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Recipi Name</span>
          </label>
          <input
            {...register("name",{required:true})}
            type="text"
            placeholder="Recipe Name"
            className="input input-bordered w-full "
          />

          <div className="flex gap-2 my-6">
            <div className="w-1/2">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <select
                {...register("category",{required:true})}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="soup">soup</option>
                <option value="drink">Drink</option>
              </select>
            </div>

            <div className="w-1/2 ">
              <label className="label">
                <span className="label-text">Recipi Price</span>
              </label>
              <input
                {...register("price",{required:true})}
                type="text"
                placeholder="price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="w-full my-6">
          <label className="form-control">
          <span className="label-text">Recipi Details</span>
          </label>
            <textarea
                {...register("Details",{required:true})}
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Details"
            ></textarea>
          </div>

          <div className="my-6">
          <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
          </div>

         <button className="btn bg-blue-600 flex items-center gap-2">
            Add Item <FaUtensils></FaUtensils>
         </button>
        </form>
      </div>
    </div>
  );
};

export default Additems;
