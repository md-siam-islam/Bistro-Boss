import React, { useEffect, useState } from "react";
import Menu from "../../ShearedSEction/Menu/Menu";
import Sheared from "../../ShearedSEction/Sheared";
import { Link } from "react-router-dom";

const Popularitem = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("Menu.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const PopulerItem = data.filter((data) => data.category == "popular");
        setMenu(PopulerItem);
      });
  }, []);
  return (
    <div className="my-32 items-center">
        <Sheared Subtitle={"Check it out"} title={"FROM OUR MENU"}>

        </Sheared>
      <div className="grid md:grid-cols-2 items-center">
        {menu.map((item) => (
          <Menu item={item}></Menu>
        ))}
      </div>
      <div className="flex items-center justify-center my-5">
        <Link className="btn font-semibold  border-b-8 border-black border-0 hover:bg-teal-500">View Full  Menu</Link>
      </div>
    </div>
  );
};

export default Popularitem;
