import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Common/Navbar';
import FooterBar from '../Components/Common/FooterBar';
import profileImages from '../Images/boy.webp';
import { useNavigate } from 'react-router-dom';

function ProfileSection() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [logOutHandle, setLogOutHandle] = useState(false);

  useEffect(() => {
    // Fetch data from the server
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');

      try {
        // Token not found, navigate to login page
        if (!token) {
          console.log('Token is not storing on session storage: ', token);
          navigate('/login');
          return;
        }
        // Make a GET request to fetch user profile data
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        // Extract user data from response
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log('Error:', error);
        navigate('/login'); // Redirect to login if an error occurs
      }
    };
    fetchUserData();
  }, [navigate]); // Empty dependency array ensures useEffect runs only once on component mount

  const ProfileInformationHandle = () => {
    if (userData) {
      navigate('/information');
    }
  };

  const ProfileBooking = () => {
    if (userData) {
      navigate(`/user-booking`);
    }
  };

  const LogOutButtonHandle = () => {
    setLogOutHandle(true);
  };

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

      <div id="main-container" className={`min-h-screen bg-white flex flex-col lg:flex-row justify-center ${logOutHandle ? 'blur-sm' : ''}`}>
        <div id="left-section" className="flex flex-col items-center lg:items-center lg:w-1/2 lg:pr-4">
          <div id="profile-info" className=" mt-12 flex flex-col items-center gap-1 w-full bg-sky-300 shadow-xl rounded-lg ">
            {/* Image box */}
            <div className="profile-image-container mt-6 w-36 h-36 border-4 border-white rounded-full mx-auto mb-4 overflow-hidden">
              <img src={profileImages} alt="Profile_image" className="w-full h-full object-cover" />
            </div>

            <div id="greeting" className="text-center mb-2">
              <h2 id="user-name" className="text-2xl font-semibold text-black">
                {`${greeting}, `}
                <span className="text-white">{userData ? userData.name.toUpperCase() : 'Loading...'}</span>
              </h2>
            </div>
          </div>

          <div id="account-details" className="mt-6 mb-14 w-full max-w-xs bg-gray-100 shadow-xl rounded-lg p-4 border border-gray-300">
            <div id="booking-section" className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-700">Booking</h2>
              <button className="text-blue-500">
                <i className="fi fi-bs-angle-small-right"></i>
              </button>
            </div>

            <div id="account-section" className="flex flex-col items-start">
              <div className="flex items-center text-xl mb-2 text-gray-700">
                <button className="mr-2 text-blue-500"><i className="fi fi-bs-user"></i></button>
                Account Setting
              </div>
              <ul className="ml-8 text-sm text-gray-500">
                <li className="border-b border-gray-300 py-2 hover:cursor-pointer md:hidden" onClick={ProfileInformationHandle}>Profile Information</li>
                <li className="border-b border-gray-300 py-2 hover:cursor-pointer" onClick={ProfileBooking}>Booking Details</li>
                <li className="border-b border-gray-300 py-2">Manage Address</li>
                <li className="border-b border-gray-300 py-2">Adhar Card Information</li>
              </ul>
            </div>

            <div id="stuff-section" className="flex flex-col items-start mt-4">
              <div className="flex items-center text-xl mb-2 text-gray-700">
                <button className="mr-2 text-blue-500"><i className="fi fi-bs-user"></i></button>
                My STUFF
              </div>
              <ul className="ml-8 text-sm text-gray-500">
                <li className="border-b border-gray-300 py-2">My Coupons</li>
                <li className="border-b border-gray-300 py-2">My Rating & Reviews</li>
                <li className="border-b border-gray-300 py-2">All Notification</li>
                <li className="border-b border-gray-300 py-2">My Wishlist</li>
              </ul>
            </div>

            <div id="logout-button" className="flex items-center justify-between border-t border-gray-300 pt-2 mt-4">
              <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer" onClick={LogOutButtonHandle}>
                <i className="fi fi-bs-sign-out-alt"></i>
              </button>
              <h2 className="text-xl font-semibold text-gray-700">LogOut</h2>
            </div>
          </div>
        </div>

        <div id="right-section" className="flex flex-col items-center lg:items-start lg:w-1/2 lg:pl-4">
          <div id="personal-info" className="hidden lg:block mt-8 w-full max-w-full bg-gray-100 shadow-xl rounded-lg p-4 border border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
              <button className="text-blue-500">
                <i className="fi fi-bs-attribution-pencil"></i>
              </button>
            </div>
            {userData ? (
              <>
                <div className="flex flex-col text-gray-700">
                  <div className="flex items-center mb-4">
                    <label htmlFor="user-name" className="font-bold">UserName:</label>
                    <span id="user-name" className="border border-gray-300 ml-2 py-1 px-2 rounded-lg">{userData.name.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="full-name" className="font-bold">Name:</label>
                    <span id="full-name" className="border border-gray-300 ml-2 py-1 px-2 rounded-lg">{userData.name.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center mb-4 text-gray-700">
                  <h2 className="font-bold mr-4">Email Address:</h2>
                  <span id="email" className="border border-gray-300 py-1 px-2 rounded-lg">{userData.email}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <h2 className="font-bold mr-4">Mobile Number:</h2>
                  <span id="mobile-number" className="border border-gray-300 py-1 px-2 rounded-lg">{userData.mobileNumber}</span>
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>

      {logOutHandle && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 max-w-full">
            <p className="mb-4 text-green-700">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600" onClick={() => {
                sessionStorage.removeItem('token');
                navigate('/login');
              }}>
                Yes
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600" onClick={() => setLogOutHandle(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterBar />
    </>
  );
}

export default ProfileSection;
