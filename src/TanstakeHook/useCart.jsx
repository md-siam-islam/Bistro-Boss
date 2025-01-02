import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../Useaxios/useAxiossecure";
import { useContext } from "react";
import { Authcontext } from "../AuthProvider/Authprovider";

const useCart = () => {
  const Axiossecure = useAxiossecure();
  const {user} = useContext(Authcontext)
  const { refetch,data: cart = [] } = useQuery({
    queryKey: ["cart",user?.email],
    queryFn: async () => {
      const res = await Axiossecure.get(`/cart?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart,refetch];
};

export default useCart;
