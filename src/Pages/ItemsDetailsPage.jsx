import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Common/Navbar';
import CamData from '../Alldata/CamData'; // Assuming this is the path to your CamData file
import LensData from '../Alldata/LensData';
import AcceriossData from '../Alldata/AccessoriesData';
import BookingForm from '../Components/Core/BookingForm'; // Fix typo in component import
import FooterBar from '../Components/Common/FooterBar';


const ItemsDetails = () => {
    const { itemId, type } = useParams();
    const itemIdNumber = parseInt(itemId);

    let item;
    if (type === 'camera') {
        item = CamData.find(item => parseInt(item.id) === itemIdNumber);
    } else if (type === 'lens') {
        item = LensData.find(item => parseInt(item.id) === itemIdNumber);
    } else if (type === 'accessiores') {
        item = AcceriossData.find(item => parseInt(item.id) === itemIdNumber);
    }

    if (!item) {
        return (
            <div className="bg-white text-gray-700 min-h-screen">
                <Navbar />
                <div className="text-center mt-10">
                    <h2 className="text-3xl font-semibold mb-4">Item not found</h2>
                    <p className="text-lg mb-4">We couldn't find the item you're looking for.</p>
                </div>
            </div>
        );
    }

    const renderProductDetails = () => (
        <div id="imageSection" className="mt-16">
            <div id="productImage" className="w-96 sm:w-96 h-76 text-center mx-auto mt-2 mb-2 overflow-hidden shadow-gray-50/50 shadow-xl">
                <img src={item.ImgSrc} alt="Product" className="w-full h-full object-cover" />
            </div>
            <div id="generalDetails" className="border mb-2 flex flex-wrap justify-between">
                <div>
                    <h2 id="productName" className="pl-4 text-xl font-bold"><span>{item.Name}</span></h2>
                    <h4 id="productPrice" className="flex items-center font-bold text-xl">
                        <i className="text-sm pl-4 fi fi-bs-indian-rupee-sign"></i> <span>{item.Amount}</span>
                    </h4>
                </div>
            </div>
        </div>
    );

    const renderDetailsSection = () => (
        <div id="fullDetails" className="border">
            <div id="productDetailsSection">
                <h2 className="pl-4 pt-4 text-blue-500 text-lg font-semibold">Details:</h2>
                <div className="flex justify-around mt-2">
                    <div>
                        <h4 className="text-gray-500">BRAND</h4>
                    </div>
                    <div>
                        <h4 className="text-gray-700">{item.Name}</h4>
                    </div>
                </div>
            </div>
            <div id="accessoriesSection">
                <h2 className="pl-4 mt-4 text-blue-500 text-lg font-semibold">With:</h2>
                <div className="flex justify-around mt-2 ml-3">
                    {type === 'camera' && (
                        <>
                            <div className="mb-2">
                                <h4 className="text-gray-700 pb-4">Battery</h4>
                                <h4 className="text-gray-700">Lens</h4>
                                <h4 className="text-gray-700 pt-4">Memory</h4>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-gray-700 pb-4">Charger</h4>
                            </div>
                        </>
                    )}
                    {type === 'lens' && (
                        <div className="mb-2">
                            <h4 className="text-gray-700 pb-4">UV Lens</h4>
                        </div>
                    )}
                    {type === 'accessiores' && (
                        <>
                            <div className="mb-2">
                                <h4 className="text-gray-700 pb-4">100 watt</h4>
                                <h4 className="text-gray-700">stand</h4>
                                <h4 className="text-gray-700 pt-4">wire</h4>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-gray-700 pb-4">Charger</h4>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div id="productDetails" className="bg-white text-gray-700 min-h-screen">
                {renderProductDetails()}
                {renderDetailsSection()}
                <BookingForm />
            </div>
            <FooterBar />
        </>
    );
}

export default ItemsDetails;
