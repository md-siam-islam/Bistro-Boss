import axios from "axios";

const useAxiospublic = axios.create({
  baseURL: "https://bistro-boss-server-xyz.vercel.app",
});
const Axiospublic = () => {
  return useAxiospublic;
};

export default Axiospublic;
