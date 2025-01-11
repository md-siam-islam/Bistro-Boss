import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Authcontext } from "../AuthProvider/Authprovider";
import UseAxiossecure from "../Useaxios/UseAxiossecure";


const useAdmin = () => {
    const { user } = useContext(Authcontext);
    const Axiossecure = UseAxiossecure();
    const { data: isAdmin = false ,isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, "isAdmin"],
        queryFn: async () => {
            const res = await Axiossecure.get(`/user/${user?.email}`);
            return res.data.admin; 
        },
        enabled: !!user?.email, 
    });
    return [isAdmin,isAdminLoading];
};


export default useAdmin;