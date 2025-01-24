import React, { useEffect, useState } from "react";
import Menu from "../../ShearedSEction/Menu/Menu";
import Sheared from "../../ShearedSEction/Sheared";
import { Link } from "react-router-dom";
import useHook from "../../Hooks/Usehooks";

const Popularitem = () => {

  const [menu] = useHook()

  const PopulerItem = menu.filter((menu) => menu.category == "popular");
  return (
    <div className="my-32 items-center">
        <Sheared Subtitle={"Check it out"} title={"FROM OUR MENU"}>

        </Sheared>
      <div className="grid md:grid-cols-2 items-center">
        {PopulerItem.map((item) => (
          <Menu item={item}></Menu>
        ))}
      </div>
      <div className="flex items-center justify-center my-5">
        <Link to={'/menu'} className="btn font-semibold  border-b-8 border-black border-0 hover:bg-teal-500">View Full  Menu</Link>
      </div>
    </div>
  );
};

export default Popularitem;
