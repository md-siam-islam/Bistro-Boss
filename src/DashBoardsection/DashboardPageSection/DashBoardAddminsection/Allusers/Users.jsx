import React from "react";
import Sheared from "../../../../ShearedSEction/Sheared";
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../../../../Useaxios/useAxiossecure";
import { MdDeleteForever } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";

const Users = () => {
  const Axiossecure = useAxiossecure();
  const { data: users = [] ,refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await Axiossecure.get("/user");
      return res.data;
    },
  });
  const handleDelete = (id) =>{
    console.log(id);
     Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete User!",
        }).then((result) => {
          if (result.isConfirmed) {
            Axiossecure.delete(`user/${id}`).then((res) => {
              if(res.data.deletedCount > 0) {
                refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: "Your User has been deleted.",
                  icon: "success",
                });
              }
            });
           
          }
        });
  }
  const handlemakeUser = (id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Admin!",
      }).then((result) => {
        if (result.isConfirmed) {
          Axiossecure.patch(`user/${id}`).then((res) => {
            if(res.data.modifiedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your User has been Admin successfull.",
                icon: "success",
              });
            }
          });
         
        }
      });
  }
  return (
    <div>
      <Sheared Subtitle={"How many?"} title={"Manage all users"}></Sheared>
      <div>
        <h1 className="text-2xl font-bold">Total Users : {users.length}</h1>

        <div className=" my-20">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>USER NAME</th>
                <th>EMAIL</th>
                <th>ROLL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <h1 className="btext-2xl font-bold">{item.name}</h1>
                  </td>
                  <td>{item.email}</td>
                  <td>
                  {item.role == "admin" ? 'Admin':<button
                      onClick={() => handlemakeUser(item._id)}
                      className="btn bg-amber-500"
                    >
                      
                     <FaUser className="text-white " />
                      
                    </button>}
                  </td>
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

export default Users;
