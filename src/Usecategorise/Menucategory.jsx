import React from "react";
import Menu from "../ShearedSEction/Menu/Menu";
import Cover from "../ShearedSEction/Cover/Cover";
import { Link } from "react-router-dom";

const Menucategory = ({ items, img, title }) => {
  return (
    <div>
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 items-center my-20">
        {items.map((item) => (
          <Menu item={item}></Menu>
        ))}
      </div>

      <Link to={`/shop/${title}`}>
        <button className=" text-[#BB8506] font-semibold btn border-b-4 border-[#BB8506] border-0 py-2 px-4 rounded-lg transition duration-300 mb-10">
        ORDER YOUR FAVOURITE FOOD
        </button>
      </Link>
    </div>
  );
};

export default Menucategory;
