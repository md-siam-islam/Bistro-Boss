import React from "react";
import useCart from "../../../TanstakeHook/useCart";
import Sheared from "../../../ShearedSEction/Sheared";
import { MdDeleteForever } from "react-icons/md";

const Mycart = () => {
  const [cart] = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  return (
    <div>
      <Sheared Subtitle={"My Cart"} title={"WANNA ADD MORE?"}></Sheared>
      <div className="flex justify-evenly items-center">
        <h1 className="text-2xl md:text-3xl uppercase">
          Total orders: {cart.length}
        </h1>
        <h1 className="text-2xl md:text-3xl uppercase">
          total price: {totalPrice}
        </h1>
        <button className="btn bg-orange-700">Pay</button>
      </div>

      <div className="my-14 ">
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>ITEM IMAGE</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              
              {
                cart.map((item,index) => <tr>
                    <td>{index+1}</td>
                    
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                
                      <h1 className="btext-2xl font-bold">
                      {item.name}
                      </h1>
                    </td>
                    <td>{item.price}</td>
                    <th>
                      <button className="btn bg-red-600"><MdDeleteForever /></button>
                    </th>
                  </tr>)
              }
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mycart;
