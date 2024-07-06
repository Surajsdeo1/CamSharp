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
        <div className="bg-black  min-h-screen">
            {/* Admin Details */}
            <div className="relative bg-sky-300 text-gray-700 border border-gray-300 rounded-lg mx-auto p-2 md:p-8 text-center max-w-xl">
                {/* Notification Icon */}
                <i className={`Notification-icon fi fi-bs-aperture ${newData ? 'text-orange-700 shake' : 'text-gray-700'}`}></i>
                {/* Image box */}
                <div className="profile-image-container mt-2 w-36 h-36 border-4 border-white rounded-full mx-auto mb-4 overflow-hidden">
                    <img src={ProfileImg} alt="Profile_image" className="w-full h-full object-cover" />
                </div>
                {/* Details box */}
                <div className="details-box">
                    <h1 className="greeting-text text-xl md:text-2xl font-bold">{greeting}, <span className='text-white'>ROSHAN</span></h1>
                    <p className="description-text text-sm md:text-base">Your best choice is CamSharp.</p>
                </div>
            </div>
            {/* section of Booking */}
            <div className='text-center mt-2 w-full border px-2 py-2'>
                <h1 className='text-white font-extrabold text-2xl'>Recent Booking... </h1>
            </div>

            {/* User Info */}
            {sortedRecentBooking.map((booking, index) => (
                
                    <div key={index} className="Booking-Card bg-gray-400 rounded-lg mt-3 mb-2">
                        <div className='flex justify-between w-full border-b border-black font-bold h-6 pl-3'>
                           <div className='flex justify-start gap-2'> <h4 className='mb-2 text-black font-bold'><span>{new Date(booking.createdAt).toLocaleDateString('en-GB')},</span></h4>
                           <h4 className='mr-3 text-black font-bold'><span>{booking.createdTime}</span></h4></div>
                         {booking.isReturn ? ( <div className='text-xl text-red mr-4 hover:cursor-pointer' onClick={() => DeleteBooked(booking.productId)}> <i className='fi fi-bs-cross-circle mb-2  '></i></div>):  ( <div>{booking.mobilenumber}</div> )}
                        </div>
                        <Link to={`/user-booking-details/${booking._id}/${booking.productId}`} key={index}>
                        <div className='flex gap-4 rounded-lg mx-auto mb-2 pl-4 pr-4 pb-4 md:p-8 max-w-xl'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <h6 className="text-yellow-700 font-bold ml-1">{truncateName(booking.name)}</h6>
                                </div>
                            </div>

                            {/* Booking and Return button */}
                            <div className="flex gap-4 mt-4">
                                <div className="ml-8 items-center">
                                    <h3 className="mr-4 font-bold">ID</h3>
                                    <span><h5 className='text-sm text-blue-700 font-bold'>{booking.productId}</h5></span>
                                </div>
                                <div className="items-center font-bold">
                                    <h3>Booked</h3>
                                    <span className={`ml-2 ${booking.isBook ? 'text-green-700' : 'text-red-700'}`}>
                                        <i className={`fi fi-bs-${booking.isBook ? 'check-circle' : 'cross-circle'}`}></i>
                                    </span>
                                </div>
                                <div className="items-center font-bold">
                                    <h3>Return</h3>
                                    <span className={`ml-2 ${booking.isReturn ? 'text-green-700' : 'text-red-700'}`}>
                                        <i className={`fi fi-bs-${booking.isReturn ? 'check-circle' : 'cross-circle'}`}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                
            ))}
            <AdminNavbar/>
        </div>
    );
};

export default AdminPage;
