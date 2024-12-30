import React from 'react';
import Cover from '../../ShearedSEction/Cover/Cover';
import img from "../../assets/menu/banner3.jpg"
import Sheared from '../../ShearedSEction/Sheared';

const Menu = () => {
    return (
        <div>
            <Cover img={img} title={"our menu"}></Cover>
            <Sheared Subtitle={"Dont miss"} title={"TODAY'S OFFER"}></Sheared>
            
        </div>
    );
};

export default Menu;