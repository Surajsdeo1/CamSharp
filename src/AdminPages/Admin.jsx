import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import './Admin.css';  // Import the CSS file
import AdminNavbar from '../Components/Common/AdminNavbar';
import Config from '../utils/Config';


function AdminPage(){
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
       <div class="bg-info min-vh-100 pb-3">
  {/* <!-- Admin Details --> */}
  <div class="position-relative z-1">
    <div class="text-center mb-4 pt-4">
      <h1 class="display-4 font-weight-bold text-dark">Admin</h1>
    </div>
    {/* <!-- Admin Profile Section --> */}
    <div class="d-flex align-items-center justify-content-center mb-6">
      <div class="bg-info text-center p-4 max-w-lg w-80 rounded shadow-inner shadow-primary transform transition-transform duration-500 hover-scale-up hover-shadow-2xl">
        <i class={`Notification-icon fi fi-bs-aperture ${newData ? 'text-warning animate-shake' : 'text-dark'}`}></i>
        <div class="d-flex flex-column align-items-center justify-content-center">
          <h1 class="text-white h2 font-weight-bold">CamSharp</h1>
          <p class="text-warning mt-2">Your premier destination for photography</p>
        </div>

        <div class="text-center mb-6 pt-2">
          <div class="bg-light shadow-lg rounded-circle w-40 h-40 ml-3"></div>
          <div class="position-absolute top-36 mt-2 left-20 ml-3 w-40 h-40 rounded-circle overflow-hidden shadow-inner shadow-primary">
            <img src={ProfileImg} alt="Profile" class="w-100 h-100 object-cover border border-2 shadow-inner shadow-white" />
          </div>
          <h1 class="h5 font-weight-bold">{greeting}, </h1>
          <h1 class="h5 font-weight-bold text-white mt-2">ROSHAN SINGH DEO</h1>
          <p class="text-warning">Your journey to success starts here, with ownCamSharp..</p>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- Section of Booking --> */}
  <div class="text-center bg-info mt-2 w-100 px-2 py-2 shadow-inner shadow-primary">
    <h1 class="text-white font-weight-extra-bold h4">Recent Booking...</h1>
  </div>

  {/* <!-- User Info --> */}
  {sortedRecentBooking.map((booking, index) => (
    <div key={index} class="bg-info shadow-lg w-80 h-auto rounded mt-4 mb-6 ml-3">
      <div class="d-flex justify-content-between rounded-top w-100 bg-info border-bottom border-primary font-weight-bold h-6 pl-3">
        <div class="d-flex justify-start gap-2">
          <h4 class="mb-2 text-dark font-weight-bold"><span>{new Date(booking.createdAt).toLocaleDateString('en-GB')},</span></h4>
          <h4 class="mr-3 text-dark font-weight-bold"><span>{booking.createdTime}</span></h4>
        </div>
        {booking.isReturn ? (
          <div class="h5 text-dark mr-4 hover-cursor-pointer" onClick={() => DeleteBooked(booking.productId)}>
            <i class="fi fi-bs-cross-circle mb-2"></i>
          </div>
        ) : (
          <div class="text-dark mr-2">{booking.mobilenumber}</div>
        )}
      </div>
      <Link to={`/user-booking-details/${booking._id}/${booking.productId}`} key={index}>
        <div class="d-flex gap-4 bg-light shadow-inner shadow-primary mx-auto mb-2 rounded ml-1 mr-1 p-2 max-w-xl">
          <div class="d-flex align-items-center justify-between">
            <div class="d-flex align-items-center">
              <h6 class="text-primary font-weight-extra-bold ml-2">{truncateName(booking.name)}</h6>
            </div>
          </div>

          {/* <!-- Booking and Return button --> */}
          <div class="d-flex gap-4 mt-4">
            <div class="ml-3 align-items-center">
              <h3 class="mr-4 font-weight-bold text-dark">ID</h3>
              <span><h5 class="small text-primary font-weight-bold">{booking.productId}</h5></span>
            </div>
            <div class="align-items-center font-weight-bold text-dark">
              <h3>Booked</h3>
              <span class={`ml-4 ${booking.isBook ? 'text-success' : 'text-danger'}`}>
                <i class={`fi fi-bs-${booking.isBook ? 'check-circle' : 'cross-circle'}`}></i>
              </span>
            </div>
            <div class="align-items-center font-weight-bold text-dark">
              <h3>Return</h3>
              <span class={`ml-4 ${booking.isReturn ? 'text-success' : 'text-danger'}`}>
                <i class={`fi fi-bs-${booking.isReturn ? 'check-circle' : 'cross-circle'}`}></i>
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