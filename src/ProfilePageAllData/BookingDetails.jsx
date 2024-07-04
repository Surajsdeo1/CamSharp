import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Common/Navbar';
import FooterBar from '../Components/Common/FooterBar';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import Config from '../utils/Config';

function BookingDetails() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.log('No token found, redirecting to login');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${Config.BASE_URL}/api/users/user-booking`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch booking data');
                }

                const data = await response.json();
                setUserData(data);
                setLoading(false);

                if (data.length > 0) {
                    setUserName(data[0].name);  // assuming name is part of each booking entry
                }
            } catch (error) {
                console.log('Error:', error);
                navigate('/profile');
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Sort userData by createdAt date in descending order
    const sortedUserData = [...userData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

    return (
        <>
            <Navbar />

            <div className="bg-sky-300 text-gray-700 border border-gray-300 rounded-lg mx-auto p-4 md:p-8 text-center max-w-xl mt-12">
                {/* Image box */}
                <div className="profile-image-container mt-2 w-36 h-36 border-4 border-white  rounded-full mx-auto mb-4 overflow-hidden">
                    <img src={ProfileImg} alt="Profile_image" className="w-full h-full object-cover" />
                </div>
                {/* Details box */}
                <div className="details-box">
                    <h1 className="greeting-text text-xl md:text-2xl font-bold">{greeting}, <span className='text-white '>{userName.toUpperCase()}</span></h1>
                    <p className="description-text text-sm text-yellow-600 md:text-base">Your best choice is CamSharp.</p>
                </div>
            </div>

            <div className='mt-2 mb-2 text-center text-black text-xl font-bold'>
                <h3 className='border-b-4  border-black'>Booking History</h3>
            </div>

            {sortedUserData.length === 0 ? (
                <div className="text-center text-red-600 text-xl font-bold">No Bookings Found</div>
            ) : (
                sortedUserData.map((booking, index) => (
                    <div key={index} className="bg-gray-400 border border-gray-300 rounded-lg mx-auto mt-4 p-4 md:p-8 max-w-xl">
                        <div className='flex gap-3 border-b-2'>
                            <h2 className='text-black font-bold'>Booking Date :-</h2>
                            <p className='text-white font-bold'>{new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className=" flex gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="rounded-full w-12 h-12 overflow-hidden border">
                                        <img src={booking.productImageUrl} alt="Product" className="w-12 h-12 object-cover" />
                                    </div>
                                    <p className="text-white font-bold ml-3">{booking.ProductName}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4 md:gap-20 text-black">
                                <div className="ml-3 items-center">
                                    <h3 className="mr-3  font-bold">ID</h3>
                                    <h5 className='text-sm text-white font-bold'>{booking.productId}</h5>
                                </div>
                                <div className="items-center font-bold">
                                    <h3>Booked</h3>
                                    {booking.isBook ? (
                                        <span className="ml-2"><i className="fi fi-bs-check-circle text-green-700"></i></span>
                                    ) : (
                                        <span className="ml-2"><i className="fi fi-bs-cross-circle text-red-600"></i></span>
                                    )}
                                </div>
                                <div className="items-center font-bold">
                                    <h3>Return</h3>
                                    {booking.isReturn ? (
                                        <span className="ml-2"><i className="fi fi-bs-check-circle text-green-700"></i></span>
                                    ) : (
                                        <span className="ml-2"><i className="fi fi-bs-cross-circle text-red-600"></i></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

            <FooterBar />
        </>
    );
}

export default BookingDetails;
