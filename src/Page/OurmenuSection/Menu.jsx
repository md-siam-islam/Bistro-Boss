import React from 'react';
import Cover from '../../ShearedSEction/Cover/Cover';
import img from "../../assets/menu/banner3.jpg"
import Sheared from '../../ShearedSEction/Sheared';
import Menucategory from '../../Usecategorise/Menucategory';
import useHook from '../../Hooks/Usehooks';

import saladImg from "../../assets/menu/salad-bg.jpg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import soupImg from "../../assets/menu/soup-bg.jpg"


const Menu = () => {
    const [menu] =useHook()
    const dessert = menu.filter((data) => data.category == "dessert");
    const salad = menu.filter((data) => data.category == "salad");
    const soup = menu.filter((data) => data.category == "soup");
    const pizza = menu.filter((data) => data.category == "pizza");

    return (
        <div>
            <Cover img={img} title={"our menu"}></Cover>
            <Sheared Subtitle={"Dont miss"} title={"TODAY'S OFFER"}></Sheared>
            <Menucategory items={dessert}></Menucategory>
            <Menucategory items={salad} img={saladImg} title={"salad"}></Menucategory>
            <Menucategory items={pizza} img={pizzaImg} title={"pizza"}></Menucategory>
            <Menucategory items={soup} img={soupImg} title={"soup"}></Menucategory>
            
            
        </div>
    );
};

export default Menu;