import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Common/Navbar';
import FooterBar from '../Components/Common/FooterBar';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';

function ProfileInformation() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from the server
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token'); 
   
      try {
        if (!token) {
          console.log('Token is not storing on session storage: ', token);
          navigate('/login');
          return;
        }
        // Make a GET request to fetch user profile data
        const response = await fetch('http://localhost:5000/api/users/information', {
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
        navigate('/profile'); // Redirect to profile if an error occurs
      }
    };
    fetchUserData();
  }, [navigate]); // Empty dependency array ensures useEffect runs only once on component mount

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
      <FooterBar />
      <div className="bg-sky-300 text-gray-700 border border-gray-300 rounded-lg mx-auto p-4 md:p-8 text-center max-w-xl mt-12">
        {/* Image box */}
        <div className="profile-image-container mt-2 w-36 h-36 border-4 border-white rounded-full mx-auto mb-4 overflow-hidden">
          <img src={ProfileImg} alt="Profile_image" className="w-full h-full object-cover" />
        </div>
        {/* Details box */}
        <div className="details-box">
          <h1 className="greeting-text text-xl md:text-2xl font-bold">
            {greeting}, <span className='text-white'>{userData ? userData.name.toUpperCase() : 'Loading...'}</span>
          </h1>
          <p className="description-text text-sm text-yellow-600 md:text-base">Your best choice is CamSharp.</p>
        </div>
      </div>
      <div id="right-section" className="flex flex-col items-center lg:items-start lg:w-1/2 lg:pl-4">
        <div id="personal-info" className="mt-16 lg:mt-24 w-full max-w-full bg-gray-400   shadow-xl rounded-lg p-4 border border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Personal Information</h2>
            <button className="text-white">
              <i className="fi fi-bs-attribution-pencil"></i>
            </button>
          </div>
          {userData ? (
            <>
              <div className="flex flex-col text-black">
                <div className="flex items-center">
                  <label htmlFor="user-name" className="font-bold">UserName:</label>
                  <span id="user-name" className="border-b-2 ml-2 py-1 px-2 text-xl text-white rounded">{userData.name}</span>
                </div>
                <div className="flex items-center">
                  <label htmlFor="full-name" className="font-bold">Name:</label>
                  <span id="full-name" className="border-b-2 ml-2 py-1 px-2 text-xl text-white rounded">{userData.name}</span>
                </div>
              </div>

              <div className="flex items-center  text-black">
                <h2 className="font-bold mr-4">Email Address:</h2>
                <span id="email" className="border-b-2 text-white py-1 px-2 text-xl rounded-lg">{userData.email}</span>
              </div>

              <div className="flex items-center text-black">
                <h2 className="font-bold mr-4">Mobile Number:</h2>
                <span id="mobile-number" className="border-b-2 text-white text-xl py-1 px-2 rounded-lg">{userData.mobileNumber}</span>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileInformation;
