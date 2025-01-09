import React from "react";
import useCart from "../../../TanstakeHook/useCart";
import Sheared from "../../../ShearedSEction/Sheared";
import { MdDeleteForever } from "react-icons/md";
import UseAxiossecure from "../../../Useaxios/UseAxiossecure";
import Swal from "sweetalert2";

const Mycart = () => {
  const [cart, refetch] = useCart();
  const Axiossecure = UseAxiossecure();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axiossecure.delete(`cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
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
                <th>#</th>
                <th>ITEM IMAGE</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>

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
                    <h1 className="btext-2xl font-bold">{item.name}</h1>
                  </td>
                  <td>{item.price}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-red-600"
                    >
                      <MdDeleteForever />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mycart;
