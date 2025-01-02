import axios from 'axios';

const Axiossecure = axios.create({
    baseURL:'http://localhost:5000'
})
const useAxiossecure = () => {
    return Axiossecure
};

export default useAxiossecure;