import React, { useContext } from "react";
import Sheared from "../../../ShearedSEction/Sheared";
import { Authcontext } from "../../../AuthProvider/Authprovider";
import Axiospublic from "../../../AxiosPublic/Axiospublic";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const {user} = useContext(Authcontext)
    const useAxiospublic = Axiospublic()
    const {data: payment = [],refetch} = useQuery({
        queryKey:['payment',user?.email],
        queryFn: async () => {
            const res = await useAxiospublic.get(`/payment/${user?.email}`)
            return res.data
        }
    })
  return (
    <div>
      <Sheared Subtitle={"At a Glance"} title={"Payment history"}></Sheared>
      <h1 className="text-3xl font-bold text-center my-8">Total Payments-({payment.length})</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>EMAIL</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>TansictionId</th>
              </tr>
            </thead>
            <tbody>

              {
                payment.map((item,index) => (
                    <tr>
                    <th>{index+1}</th>
                    <td>{item.email}</td>
                    <td>FOOD ODER</td>
                    <td>$ {item.price}</td>
                    <td>{item.tansictionId}</td>
                  </tr>
                ))
              }
             

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
