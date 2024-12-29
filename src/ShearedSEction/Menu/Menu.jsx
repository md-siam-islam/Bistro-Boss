import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ item}) => {
    const { image, price, name, recipe } = item;

    return (
        <div>

        <div className="flex gap-6 items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
           
            <div  className="w-28 h-24">
                <img 
                    src={image} 
                    alt={name}
                    style={{borderRadius:"0 200px 200px 200px"}} 
                    className="w-full h-full object-cover rounded-lg" 
                />
            </div>

            
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{name}---------------</h2>
                <p className="text-sm text-gray-500 mt-1">{recipe}</p>
            </div>


            <div className="text-xl font-bold  text-[#BB8506]">
                ${price}
            </div>
        </div>
        </div>
    );
};

export default Menu;
