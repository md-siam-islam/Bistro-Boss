import React, { useContext } from "react";
import Sheared from "../../../ShearedSEction/Sheared";
import { Authcontext } from "../../../AuthProvider/Authprovider";
import Axiospublic from "../../../AxiosPublic/Axiospublic";
import { useQuery } from "@tanstack/react-query";
import { FaReceipt, FaCheckCircle } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useContext(Authcontext);
  const useAxiospublic = Axiospublic();

  const { data: payment = [], isLoading } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      try {
        const res = await useAxiospublic.get(`/payment/${user?.email}`);
        return res.data || [];
      } catch {
        return [];
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <Sheared Subtitle="Past Transactions" title="PAYMENT RECORDS" />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-white">
            Total Orders Completed ({payment.length})
          </h3>
          <p className="text-gray-400 text-xs">Official receipts for dining & pickup</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-16">
          <span className="loading loading-spinner loading-lg text-amber-400"></span>
        </div>
      ) : payment.length > 0 ? (
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-amber-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Diner Account</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Amount Paid</th>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {payment.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-500">{index + 1}</td>
                    <td className="py-4 px-6 text-gray-300 font-mono text-xs">
                      {item.email}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      Fine Dining Order
                    </td>
                    <td className="py-4 px-6 font-cinzel text-amber-400 font-bold text-base">
                      ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-400">
                      {item.tansictionId || "TX-PAID"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                        <FaCheckCircle className="text-xs" /> Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-900/60 border border-gray-800 p-14 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400 text-2xl mb-4">
            <FaReceipt />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white mb-2">
            No Past Payments Recorded
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Once you settle an order checkout, your official digital receipts and transaction IDs will be stored here permanently.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
