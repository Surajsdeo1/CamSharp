import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import './Admin.css';  // Import the CSS file
import AdminNavbar from '../Components/Common/AdminNavbar';
import Config from '../utils/Config';


const AdminPage = () => {
    const [recentBooking, setRecentBooking] = useState([]);
    const [newData, setNewData] = useState(false);

    useEffect(() => {
        const fetchRecentBooking = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/admin`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recent booking');
                }
                const data = await response.json();
                if (data.length > recentBooking.length) {
                    setNewData(true);
                    setTimeout(() => setNewData(false), 2000);
                }
                setRecentBooking(data);
            } catch (error) {
                console.error('Error fetching recent booking:', error);
            }
        };

        fetchRecentBooking();
    }, [recentBooking.length]);

    // Sort recentBooking by createdAt date in descending order
    const sortedRecentBooking = [...recentBooking].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Determine the current greeting based on the time of day
    const getGreeting = () => {
        const now = new Date();
        const hour = now.getHours();

        if (hour < 12) {
            return 'Good Morning';
        } else if (hour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    const greeting = getGreeting();

    // Function to truncate the name to the first word
    const truncateName = (name) => {
        return name.split(' ')[0].toUpperCase();
    };

    const DeleteBooked = async (productId) => {
        try {
            const response = await fetch(`${Config.BASE_URL}/api/delete/${productId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }
            // Update the state to reflect the deletion

        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <>
        <div className="bg-sky-300  min-h-screen pb-12">
            {/* Admin Details */}
            <div className="relative z-10">
                <div className="text-center mb-4 pt-4">
                    <h1 className="text-3xl font-bold text-gray-900 ">Admin</h1>
                </div>
                {/* Admin Profile Section */}
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-sky-400 p-8 max-w-lg w-80 rounded-lg shadow-inner shadow-blue-500 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ">
                        <i className={`Notification-icon fi fi-bs-aperture ${newData ? 'text-orange-700 shake' : 'text-gray-700'}`}></i>
                        <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="text-white text-2xl font-bold">CamSharp</h1>
                            <p className="text-yellow-600 text-sm mt-2">Your premier destination for photography</p>
                        </div>

                        <div className="text-center mb-6 pt-2">


                            <div className="Container bg-slate-200 shadow-lg shadow-black rounded-full w-40 h-40 ml-12">

                            </div>
                            <div className="Profile-Div absolute top-36 mt-2   left-20 ml-3  w-40 h-40 rounded-full overflow-hidden drop-shadow-xl shadow-inner shadow-blue-500">
                                <img src={ProfileImg} alt="Profile" className="Image-Boy w-full h-full object-cover border-b-2 border-l-2 border-r-2 shadow-inner shadow-white" />
                            </div>


                            <h1 className="greeting-text text-xl md:text-2xl font-bold">{greeting}, </h1>
                            <h1 className="text-xl md:text-2xl font-bold text-white mt-2">ROSHAN SINGH DEO</h1>
                            <p className="text-sm md:text-base text-yellow-600">Your journey to success starts here, with ownCamSharp..</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* section of Booking */}
            <div className='text-center bg-sky-400 mt-2 w-full  px-2 py-2 shadow-inner shadow-blue-500'>
                <h1 className='text-white font-extrabold text-2xl'>Recent Booking... </h1>
            </div>

            {/* User Info */}
            {sortedRecentBooking.map((booking, index) => (

                <div key={index} className="Booking-Card bg-sky-400 shadow-lg shadow-sky-400 w-80 h-auto rounded-md mt-4 mb-6 ml-12">
                    <div className='flex justify-between rounded-t-lg w-full bg-sky-400 border-b border-blue-500 font-bold h-6 pl-3'>
                        <div className='flex justify-start gap-2'> <h4 className='mb-2 text-black font-bold'><span>{new Date(booking.createdAt).toLocaleDateString('en-GB')},</span></h4>
                            <h4 className='mr-3 text-black font-bold'><span>{booking.createdTime}</span></h4></div>
                        {booking.isReturn ? (<div className='text-xl text-black mr-4 hover:cursor-pointer' onClick={() => DeleteBooked(booking.productId)}> <i className='fi fi-bs-cross-circle mb-2  '></i></div>) : (<div className='text-black mr-2'>{booking.mobilenumber}</div>)}
                    </div>
                    <Link to={`/user-booking-details/${booking._id}/${booking.productId}`} key={index}>
                        <div className='flex gap-4   bg-slate-200  shadow-inner shadow-sky-500  mx-auto mb-2  rounded-lg ml-1 mr-1 md:p-8 max-w-xl'>
                            <div className="flex items-center justify-between  ">
                                <div className="flex items-center  ">
                                    <h6 className=" text-blue-700 font-extrabold ml-2">{truncateName(booking.name)}</h6>
                                </div>
                            </div>

                            {/* Booking and Return button */}
                            <div className="flex gap-4 mt-4">
                                <div className="ml-8 items-center">
                                    <h3 className="mr-4 font-bold text-black">ID</h3>
                                    <span><h5 className='text-sm text-blue-900 font-bold'>{booking.productId}</h5></span>
                                </div>
                                <div className="items-center font-bold text-black">
                                    <h3>Booked</h3>
                                    <span className={`ml-4 ${booking.isBook ? 'text-green-700' : 'text-red-700'}`}>
                                        <i className={`fi fi-bs-${booking.isBook ? 'check-circle' : 'cross-circle'}`}></i>
                                    </span>
                                </div>
                                <div className="items-center font-bold text-black">
                                    <h3>Return</h3>
                                    <span className={`ml-4 ${booking.isReturn ? 'text-green-700' : 'text-red-700'}`}>
                                        <i className={`fi fi-bs-${booking.isReturn ? 'check-circle' : 'cross-circle'}`}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            ))}
            <AdminNavbar />
        </div>
        </>
    );
};

export default AdminPage;
