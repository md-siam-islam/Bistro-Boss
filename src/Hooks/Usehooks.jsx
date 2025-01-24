import axios from "axios";
import { useEffect, useState } from "react";

const useHook = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios.get("https://bistro-boss-server-xyz.vercel.app/menu").then((res) => {
      const menuData = res.data;
      setMenu(menuData);
    });
  }, []);

  return [menu];
};

export default useHook;
