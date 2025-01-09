import axios from 'axios';
import { useContext } from 'react';
import { Authcontext } from '../AuthProvider/Authprovider';
import { useNavigate } from 'react-router-dom';





const Axiossecure = axios.create({
    baseURL:'http://localhost:5000'
})
const UseAxiossecure = () => {
    const {Usersignout}=useContext(Authcontext)
    const navigate = useNavigate()
    
    Axiossecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },function (error) {
        return Promise.reject(error);
    });


    
   
    Axiossecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptor', status);
     
        if (status === 401 || status === 403) {
           await Usersignout()
           navigate("/login")
        }
        return Promise.reject(error);
    })
    
    return Axiossecure
};

export default UseAxiossecure ;