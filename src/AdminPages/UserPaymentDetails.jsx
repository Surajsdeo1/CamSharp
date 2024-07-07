import React,{ useState,useEffect,useRef } from 'react';

import ProfileImg from '../Images/boy.webp';
import './Admin.css';  // Import the CSS file
import Config from '../utils/Config';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Components/Common/AdminNavbar';



function UserPaymentDetails() {

    const [showDetails, setShowDetails] = useState(false);
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
   
    const detailsRef = useRef(null);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
    useEffect(() => {
        if (showDetails && detailsRef.current) {
          detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, [showDetails]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${Config.BASE_URL}/api/admin/payment`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPaymentData(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) return <p>Loading...</p>;
     

      const bookings=Array.isArray(paymentData)?paymentData:[paymentData];
    
    return (
        <>
            <div className="bg-sky-300  w-full min-h-screen pb-20">
                <div className="relative z-10">
                    <div className="text-center mb-4 pt-4">
                        <h1 className="text-3xl font-bold text-gray-900 ">Admin</h1>
                    </div>
                    {/* Admin Profile Section */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-sky-400 p-8 max-w-lg w-80 rounded-lg shadow-inner shadow-blue-500 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ">

                            <div className="flex flex-col items-center justify-center text-center">
                                <h1 className="text-white text-2xl font-bold">CamSharp</h1>
                                <p className="text-yellow-600 text-sm mt-2">Your premier destination for photography</p>
                            </div>

                            <div className="text-center mb-6 pt-2">


                                <div className="Container bg-slate-200 shadow-lg shadow-black rounded-full w-36 h-36 ml-8">

                                </div>
                                <div className="Profile-Div absolute top-36 mt-2   left-20 ml-3  w-40 h-40 rounded-full overflow-hidden drop-shadow-xl shadow-inner shadow-blue-500">
                                    <img src={ProfileImg} alt="Profile" className="Image-Boy w-full h-full object-cover border-b-2 border-l-2 border-r-2 shadow-inner shadow-white" />
                                </div>



                                <h1 className="text-xl md:text-2xl font-bold text-white mt-2">ROSHAN SINGH DEO</h1>
                                <p className="text-sm md:text-base text-yellow-600">Your journey to success starts here, with ownCamSharp..</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Payment details for admin */}
                <div className=" text-white bg-sky-400 shadow-lg  text-center py-4">
                    <h2 className="text-2xl font-bold">Payment History...</h2>
                </div>
                {bookings.map((booking, index) => (
                <div key={index} className="max-w-md mx-auto bg-sky-400 w-80 shadow-lg rounded-lg overflow-hidden mt-5">
                    <div className=" PaymentId-UserDetails text-white text-center py-4 hover:cursor-pointer" onClick={toggleDetails}>
                        
                        <h2 className="text-xl font-bold">{booking.name} : <span className='ml-4'>{booking.productId}</span></h2>
                    </div>
                    <div ref={detailsRef}  className={`Details-Section pl-4 pr-4 pt-2  pb-1 bg-white w-72 ml-4 shadow-inner shadow-blue-500 transition-max-height duration-500 ease-in-out ${showDetails ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>

                       
                        <div className="flex items-center justify-between mb-2  shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Product ID:</span>
                            <span className='text-gray-600 font-semibold'>{booking.productId}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2 mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Booking Payment Mode:</span>
                            <span className='text-gray-600 font-semibold'>{booking.bookingPaymentMode}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Total Amount:</span>
                            <span className='text-gray-600 font-semibold'>₹{booking.totalAmount}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Advance Amount:</span>
                            <span className='text-gray-600 font-semibold'>₹{booking.advanceAmount}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Return Payment Mode:</span>
                            <span className='text-gray-600 font-semibold'>
                           {booking.returnPaymentMode}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Remaining Amount:</span>
                            <span className='text-gray-600 font-semibold'>₹{booking.remainingAmount}</span>
                        </div>

                        <div className="flex items-center justify-between mb-2 mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Booking Status:</span>
                            <span className='text-gray-600 font-semibold'>{booking.isBook.toString()}</span>

                        </div>
                        <div className="flex items-center justify-between mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold">Return Status:</span>
                            <span className='text-gray-600 font-semibold'>{booking.isReturn.toString()}</span>

                        </div>

                    </div>
                    <div className="flex items-center justify-between mb-2 shadow-lg border rounded-lg p-1 mt-4">
                            <span className="font-semibold text-black">All Information about User</span>
                           <Link to={`/payment/${booking._id}/${booking.productId}`}> <span className=' border-2 rounded-lg p-1 text-black bg-sky-300 hover:cursor-pointer text-xl font-bold' > UI</span></Link>

                        </div>
                </div>
                ))}
<AdminNavbar/>
            </div>
        </>
    )
}

export default UserPaymentDetails