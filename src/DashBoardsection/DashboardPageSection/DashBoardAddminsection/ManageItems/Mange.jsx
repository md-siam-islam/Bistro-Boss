import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";

const Mange = () => {
  const useAxiospublic = Axiospublic()

  const { data: menu = [], refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await useAxiospublic.get("/menu");
      return res.data;
    },
  });
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
        useAxiospublic.delete(`/menu/${id}`)
        .then((res) => {
          // console.log(res);
          if (res.data.deletedCount) {
            refetch()
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM IMAGE</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              {/* <th>ACTION</th> */}
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>

                {/* todo section update ar kaj kore hobe*/}
                {/* <td>
                  <button className="btn btn-ghost btn-lg">
                    <FaEdit></FaEdit>
                  </button>
                </td> */}
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn bg-red-600"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mange;
