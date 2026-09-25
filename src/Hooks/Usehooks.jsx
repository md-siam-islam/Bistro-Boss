import axios from "axios";
import { useEffect, useState } from "react";

const useHook = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Menu.json")
      .then((res) => res.json())
      .then((localData) => {
        setMenu(localData);
        setLoading(false);
        // Also fetch from server to merge any dynamic admin additions
        axios
          .get("https://bistro-boss-server-xyz.vercel.app/menu")
          .then((res) => {
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
              const localIds = new Set(localData.map((i) => i._id || i.name));
              const remoteExtra = res.data.filter(
                (item) => !localIds.has(item._id || item.name)
              );
              setMenu([...localData, ...remoteExtra]);
            }
          })
          .catch(() => {
            // gracefully fallback to local data
          });
      })
      .catch(() => {
        axios
          .get("https://bistro-boss-server-xyz.vercel.app/menu")
          .then((res) => {
            setMenu(res.data || []);
            setLoading(false);
          })
          .catch(() => {
            setMenu([]);
            setLoading(false);
          });
      });
  }, []);

  return [menu, loading];
};

export default useHook;

