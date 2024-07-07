import React, { useState, useEffect } from 'react';
import ProfileImg from '../Images/boy.webp';
import { useParams } from 'react-router-dom';
import Config from '../utils/Config';
import './Admin.css';
import AdminNavbar from '../Components/Common/AdminNavbar';






function AllDetailsOfUser() {
    const [fetchData, setfetchData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { _id, productId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/payment/${_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setfetchData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };




    const bookings = Array.isArray(fetchData) ? fetchData : [fetchData];
    return (
        <>

            {bookings.map((booking, index) => (
                <div key={index} className='bg-sky-300 pb-20 '>
                    {/*  details of ADMIN */}
                    <div className="flex items-center justify-center h-auto">
                        {/* Admin Details Section */}
                        <div className="relative w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl p-6  rounded-lg  ">
                            {/* Gradient Overlay */}


                            <div className="relative z-10">
                                <div className="text-center mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900 ">Admin</h1>
                                </div>
                                {/* Admin Profile Section */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="bg-sky-400 p-8 max-w-lg w-full rounded-lg shadow-inner shadow-blue-500  ">
                                        <div className="flex flex-col items-center justify-center mb-6">
                                            <h1 className="text-white text-2xl font-bold">CamSharp</h1>
                                            <p className="text-yellow-600 text-sm mt-2">Your premier destination for photography</p>
                                        </div>

                                        <div className="text-center mb-6 pt-8">


                                            <div className="Container bg-slate-200 shadow-lg shadow-black rounded-full w-40 h-40 ml-20">

                                            </div>
                                            <div className="Profile-Div absolute top-60 mt-2   left-24 ml-10  w-40 h-40 rounded-full overflow-hidden drop-shadow-xl shadow-inner shadow-blue-500">
                                                <img src={ProfileImg} alt="Profile" className="Image-Boy w-full h-full object-cover border-b-2 border-l-2 border-r-2 shadow-inner shadow-white" />
                                            </div>



                                            <h1 className="text-xl md:text-2xl font-bold text-white mt-2">ROSHAN SINGH DEO</h1>
                                            <p className="text-sm md:text-base text-yellow-600">Your journey to success starts here, with ownCamSharp..</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Close  of details of admin */}

                            {/*  3d user information section start */}

                            <div className="flex items-center justify-center h-auto bg-sky-400 shadow-xl rounded-lg ">
                                <div className=" w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl pt-2 pl-2 pr-2 ">
                                    {/* Gradient Overlay */}
                                    <div className="text-center mb-2 ">
                                        <h1 className="text-3xl font-bold text-gray-900">User Information...</h1>
                                    </div>

                                    <div className=" z-10 bg-white h-auto rounded-lg shadow-inner shadow-blue-500">

                                        <div className="space-y-2  pt-4 pb-4  ">

                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72  ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Name:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.userBook.name}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64 ml-3 border shadow-lg">
                                                <span className="font-bold text-gray-900">Mobile Number:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.userBook.mobileNumber}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Email:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.userBook.email}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Login Count:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.userBook.LoginCount}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Created At:</span>
                                                <span className="text-gray-700 font-extrabold">{new Date(booking.userBook.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* 3d user information details end */}

                    <div className='w-full h-auto text-3xl font-bold text-black text-center bg-sky-400  mt-8  border-black shadow-lg'>
                        <h1>Booking and Payment Details... </h1>
                    </div>
                    {/*  booking details */}

                    <div className="flex items-center justify-center h-auto bg-sky-400 shadow-xl rounded-lg mt-8 w-72 ml-16">
                        <div className="  md:max-w-3xl lg:max-w-4xl xl:max-w-5xl pt-2  ">
                            {/* Gradient Overlay */}
                            <div className="text-center mb-2 ">
                                <h1 className="text-3xl font-bold text-gray-900">Booking Details...</h1>
                            </div>

                            <div className=" z-10 bg-white h-auto rounded-lg shadow-inner shadow-blue-500 pb-4">

                                <div className="space-y-2  pt-4  pl-1 ">

                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64 ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">ProductId:</span>
                                        <span className="text-gray-700 font-extrabold">{productId}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64 ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Quantity:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.userProduct.quantity}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Date:</span>
                                        <span className="text-gray-700 font-extrabold">{formatDate(booking.userProduct.date)}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64 ml-1 mr-2   border shadow-lg">
                                        <span className="font-bold text-gray-900">Time:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.userProduct.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Duration:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.userProduct.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Location:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.userProduct.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Name:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.userProduct.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-64  ml-1 mr-2   border shadow-lg">
                                        <span className="font-bold text-gray-900">WhatsApp No:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.userProduct.mobilenumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className=" text-white bg-sky-400 shadow-lg  text-center py-4">
                        <h2 className="text-2xl font-bold">Payment History...</h2>
                    </div>



                    <div className="max-w-md mx-auto bg-sky-400 w-80 shadow-lg rounded-lg overflow-hidden mt-5">
                       
                        <div className='flex justify-between '>
                            <span className="text-xl text-black font-bold">{booking.name} : </span>
                            <span className='mr-4 font-bold text-black'>{booking.productId}</span>

                        </div>

                           <div className='p-1 bg-white'>

                        <div className="flex items-center justify-between mb-2  bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Product ID:</span>
                            <span className='text-black font-semibold'>{booking.productId}</span>
                        </div>

                        <div className="flex items-center justify-between mb-2 mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Booking Payment Mode:</span>
                            <span className='text-black font-semibold'>{booking.bookingPaymentMode}</span>
                        </div>
                        <div className="flex items-center  justify-between mb-2 mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Total Amount:</span>
                            <span className='text-black font-semibold'>₹{booking.totalAmount}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Advance Amount:</span>
                            <span className='text-black font-semibold'>₹{booking.advanceAmount}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Return Payment Mode:</span>
                            <span className='text-black font-semibold'>{booking.returnPaymentMode}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Remaining Amount:</span>
                            <span className='text-black font-semibold'>₹</span>
                        </div>

                        <div className="flex items-center justify-between mb-2 mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Booking Status:</span>
                            <span className='text-black font-semibold'>{booking.isBook.toString()}</span>

                        </div>
                        <div className="flex items-center justify-between mb-2 bg-slate-200 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">Return Status:</span>
                            <span className='text-black font-semibold'>{booking.isReturn.toString()}</span>

                        </div>
                        </div>

                    </div>

                    <AdminNavbar/>
                </div>
            ))}

        </>
    )
}

export default AllDetailsOfUser