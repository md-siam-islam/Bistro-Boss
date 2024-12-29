import React from 'react';
import Sheared from '../../ShearedSEction/Sheared';
import salad from "../../assets/home/salad-bg.jpg"

const Recomends = () => {
    
    // const sampleItems = [
    //     {
           
    //         name: 'Caesar Salad',
    //         recipe: 'Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.',
    //     },
    //     {
           
    //         name: 'Grilled Salmon',
    //         recipe: 'Fresh Salmon with Vegetables and Lemon Dressing.',
    //     },
    //     {
            
    //         name: 'Pasta Primavera',
    //         recipe: 'Pasta with Fresh Vegetables in Creamy Sauce.',
    //     },
    // ];

    return (
        <div className="my-36">

            <Sheared Subtitle={"Should Try"} title={"CHEF RECOMMENDS"} />

            
            <div className="flex justify-center gap-8 flex-wrap mt-12">
               
                    <div
                        className="w-80 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
                        <img
                            src={salad}
                            alt='salad'
                            className="w-full h-48 object-cover"
                        />

                       <div className='bg-gray-200'>
                       <div className="p-4 text-center ">
                            <h3 className="text-lg font-semibold text-gray-800">
                            Caesar Salad
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                            Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
                            </p>
                        </div>

                        <div className="p-4 text-center">
                            <button className="w-full  text-[#BB8506] font-semibold btn border-b-4 border-[#BB8506] border-0 py-2 px-4 rounded-lg transition duration-300">
                                ADD TO CART
                            </button>
                        </div>
                       </div>
                    </div>
                    <div
                        className="w-80 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
                        <img
                            src={salad}
                            alt='salad'
                            className="w-full h-48 object-cover"
                        />

                       <div className='bg-gray-200'>
                       <div className="p-4 text-center ">
                            <h3 className="text-lg font-semibold text-gray-800">
                            Grilled Salmon
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                            Fresh Salmon with Vegetables and Lemon Dressing.
                            </p>
                        </div>

                        <div className="p-4 text-center">
                            <button className="w-full bg-[#1F2937] text-[#BB8506] font-semibold btn py-2 px-4 rounded-lg transition duration-300">
                                ADD TO CART
                            </button>
                        </div>
                       </div>
                    </div>

                    <div
                        className="w-80 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
                        <img
                            src={salad}
                            alt='salad'
                            className="w-full h-48 object-cover"
                        />

                       <div className='bg-gray-200'>
                       <div className="p-4 text-center ">
                            <h3 className="text-lg font-semibold text-gray-800">
                            Pasta Primavera
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                            Pasta with Fresh Vegetables in Creamy Sauce.
                            </p>
                        </div>

                        <div className="p-4 text-center">
                            <button className="w-full  text-[#BB8506] font-semibold btn border-b-4 border-[#BB8506] border-0 py-2 px-4 rounded-lg transition duration-300">
                                ADD TO CART
                            </button>
                        </div>
                       </div>
                    </div>
              
            </div>
        </div>
    );
};

export default Recomends;
