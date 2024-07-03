// import React, { useEffect, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";

import MainContainerData from "../../Alldata/MainContainerData"; // Import the data file

function Main_container() {
  

    return (
        <>
       
            <div id="categories" className="bg-white text-gray-700 mt-14">
                {/* Heading of items */}
                <div className="text-center border ">
                    <h2 className="text-2xl font-semibold border-b border-gray-300 py-2">CATEGORIES</h2>
                </div>

                {/* Items List */}
                <div className=" mt-2 ">
            <div className="flex flex-wrap mb-4  lg:flex lg:flex-row lg:justify-around justify-center md:justify-start">
                {MainContainerData.map((category) => (
                    <Link to={`/items/${category.Name.toLowerCase()}`} key={category.id} className="p-2  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ">
                        <div className="category bg-gray-100 border border-gray-300 shadow-xl p-4 cursor-pointer rounded-xl">
                            <h3 className="text-center text-lg font-semibold mb-2 text-blue-500 hover:underline">{category.Name}</h3>
                            <div className="flex justify-center flex-wrap">
                                {[category.ImgSrc2].map((imgSrc, index) => (
                                    <img src={imgSrc} alt={`${category.Name} ${index + 1}`} key={index} className="border border-gray-300 rounded-xl w-20 h-20 mr-4 mb-4 lazy" data-src={imgSrc} />
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
            </div>
        </>
    );
}

export default Main_container;
