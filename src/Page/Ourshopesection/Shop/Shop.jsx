import React, { useState } from "react";
import Cover from "../../../ShearedSEction/Cover/Cover";
import shopeBg from "../../../assets/shop/banner2.jpg";
import { Tab ,TabList,TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import useHook from "../../../Hooks/Usehooks";
import ShopCard from "../../../ShearedSEction/ShopFoodCard/ShopCard";

const Shop = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] =useHook()
    const dessert = menu.filter((data) => data.category == "dessert");
    const salad = menu.filter((data) => data.category == "salad");
    const soup = menu.filter((data) => data.category == "soup");
    const pizza = menu.filter((data) => data.category == "pizza");
    const drinks = menu.filter((data) => data.category == "drinks");
  return (
    <div>
      <Cover title={"our shop"} img={shopeBg}></Cover>

     <div className="my-14 flex items-center justify-center">
     <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {
            salad.map(item => <ShopCard item={item}></ShopCard>)
          }
         </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {
            pizza.map(item => <ShopCard item={item}></ShopCard>)
          }
         </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {
            soup.map(item => <ShopCard item={item}></ShopCard>)
          }
         </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {
            dessert.map(item => <ShopCard item={item}></ShopCard>)
          }
         </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {
            drinks.map(item => <ShopCard item={item}></ShopCard>)
          }
         </div>
        </TabPanel>
      </Tabs>
     </div>
    </div>
  );
};

export default Shop;
