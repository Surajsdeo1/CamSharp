import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import CamData from "../Alldata/CamData";
import LensData from "../Alldata/LensData";
import AccessData from "../Alldata/AccessoriesData";
import FooterBar from '../Components/Common/FooterBar';
import Config from "../utils/Config";

function ItemsPage() {
    let { type } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const primaryText = "text-gray-700";
    const secondaryText = "text-gray-500";
    const primaryBg = "bg-white";

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/products`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                const data = await response.json();
                setProducts(data);

                if (type === "camera") {
                    setFilteredProducts(CamData);
                } else if (type === "lens") {
                    setFilteredProducts(LensData);
                } else if (type === "accessories") {
                    setFilteredProducts(AccessData);
                }

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchProductData();
    }, [type]);

    return (
        <>
            <div className=" ">
                <Navbar />
                <FooterBar />

                <div id="item-list" className={`${primaryBg} text-gray-700 mt-12 sm:px-8 pt-1`}>
                    <div className="text-black text-center">
                        <h1 className="text-xl font-extrabold text-blue-600 border-b pb-1">{type}</h1>
                    </div>
                    <div className="flex flex-wrap justify-center h-screen">
                        {filteredProducts.map((item, index) => {
                            const isHidden = products.some(productSelected => parseInt(productSelected.productId) === item.id);

                            return (
                                <div key={index} className={`mt-1 ml-1 sm:mx-4 sm:w-96 w-48 cursor-pointer ${isHidden ? 'hidden' : ''}`}>
                                    <Link to={{
                                        pathname: `/items/${type}/${item.id}/${item.Name}`,
                                        state: {
                                            type: type,
                                            itemId: item.id,
                                            name: item.Name,
                                            day: item.Day,
                                            amount: item.Amount,
                                            imgSrc: item.ImgSrc
                                        }
                                    }} className="block">
                                        <div className={`item-card bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-1 border-2 ${isHidden ? 'border-red-500' : 'border-gray-600'}`}>
                                            <div className="item-image ml-12 overflow-hidden rounded-lg border">
                                                <img className="w-full h-full object-cover" src={item.ImgSrc} alt="Item" />
                                            </div>
                                            <div className="item-details">
                                                <h2 className={`text-sm font-bold ${primaryText}`}>{item.Name}</h2>
                                                <h3 className={`${secondaryText}`}>{item.Day}</h3>
                                            </div>
                                            <div className="left-4 w-full text-center bg-blue-500 rounded">
                                                <h4 className="flex items-center justify-center font-bold text-xl">
                                                    <i className="text-sm p-1  fi fi-bs-indian-rupee-sign"></i>
                                                    <span className=" pr-1">{item.Amount}</span>
                                                </h4>
                                            </div>
                                           
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemsPage;
