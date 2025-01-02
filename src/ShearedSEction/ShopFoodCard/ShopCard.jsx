import axios from "axios";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { Authcontext } from "../../AuthProvider/Authprovider";
import { useNavigate } from "react-router-dom";
import useAxiossecure from "../../Useaxios/useAxiossecure";
import useCart from "../../TanstakeHook/useCart";

const ShopCard = ({ item }) => {
  const {user} = useContext(Authcontext)
  const { name, recipe, image, price, _id } = item;
  const navigate = useNavigate()
  const Axiossecure = useAxiossecure()
  const [,refetch]= useCart()

  const handleCart = () => {

    if(user && user.email){
      const menuData = {
        menuId: _id,
        name: name,
        recipe: recipe,
        image: image,
        price: price,
        email:user.email
      };
  
      Axiossecure.post("/carts", menuData).then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name},Add successfull`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
        refetch()
      });
    }
    else{
      Swal.fire({
        title: "You are Not Login",
        text: "Place Login to add to tahe cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      });
    }
    
  };
  return (
    <div>
      <div className="w-80 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 relative">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
            ${price}
          </div>
        </div>

        <div className="bg-gray-200">
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 mt-2">{recipe}</p>
          </div>

          <div className="p-4 text-center">
            <button
              onClick={handleCart}
              className="w-full text-[#BB8506] font-semibold btn border-b-4 border-[#BB8506] border-0 py-2 px-4 rounded-lg transition duration-300"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
