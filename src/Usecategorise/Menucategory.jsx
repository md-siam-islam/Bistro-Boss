import React from "react";
import Menu from "../ShearedSEction/Menu/Menu";
import Cover from "../ShearedSEction/Cover/Cover";


const Menucategory = ({ items,img,title }) => {
  return (
    <div>
        {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 items-center my-20">
        {items.map((item) => (
          <Menu item={item}></Menu>
        ))}
      </div>
    </div>
  );
};

export default Menucategory;
