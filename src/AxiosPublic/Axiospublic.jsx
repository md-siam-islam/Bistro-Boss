import axios from 'axios';

const useAxiospublic = axios.create({
    baseURL:"http://localhost:5000"
})
const Axiospublic = () => {
    return useAxiospublic

};

export default Axiospublic;