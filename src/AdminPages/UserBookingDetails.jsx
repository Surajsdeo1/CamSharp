import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import AdminNavbar from '../Components/Common/AdminNavbar';
import Config from '../utils/Config';
import './Admin.css';
const UserBookingDetails = () => {
    const { _id, productId } = useParams();
    const [bookingDetails, setBookingDetails] = useState();

    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    const [bookButtonVisible, setBookButtonVisible] = useState(false);
    const [payFormVisible, setPayFormvisible] = useState(true);
    const [BookButtonVisible, setbookButtonVisible] = useState(true);
    const [RPayBuuttonVisibble, setRPayButtonVisible] = useState(true);
    const [returnbuttonvisible, setreturnbuttonVisible] = useState(false);
    const [otpInputVisibble, setOtpInputVisible] = useState(false);


    const [AmountValue, setAmountValue] = useState({
        Total_Amount: " ",
        Advance_Amount: " "

    })
    const OnChangePayInput = (e) => {
        const { name, value } = e.target;
        setAmountValue({
            ...AmountValue,
            [name]: value
        },
        )
    }

    const [RemaingAmount, setRemaingAmount] = useState({
        Remaning_Amount: " "

    })
    const OnChangeRPayInput = (e) => {
        const { name, value } = e.target;
        setRemaingAmount({
            ...RemaingAmount,
            [name]: value,
        })
    }

    const [OTPValue, setOTPValue] = useState(
        {
            OTP: " "
        })

    const OnChangeOTPInput = (e) => {
        const { name, value } = e.target;
        setOTPValue({
            ...OTPValue,
            [name]: value
        })
    }

    //fetch booking details 
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/user-booking-details/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await response.json();

                setBookingDetails(data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, [_id]);



    const onsubmitPayButton = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Config.BASE_URL}/api/process-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    _id,



                })
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }
            setOtpInputVisible(true);

            setBookButtonVisible(true);
            setPayFormvisible(false);

        } catch (error) {
            console.log('payment error:', error);
        }
    };


    const onBookingButtonSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Config.BASE_URL}/api/boooking-otp-validation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    BookingOTP: OTPValue.OTP,
                    productId: productId,
                    _id,
                    totalAmount: AmountValue.Total_Amount,
                    advanceAmount: AmountValue.Advance_Amount,
                    mode: selectedPaymentMode,

                })
            });


            if (!response.ok) {
                throw new Error('Failed to process OTP-Validation');
            }
            setOtpInputVisible(false);
            setbookButtonVisible(false);
            setOTPValue({
                OTP: " "
            })



            setAmountValue({
                Total_Amount: " ",
                Advance_Amount: " "

            })
            setSelectedPaymentMode('');


        } catch (error) {
            console.log('payment error:', error);
            console.log(productId);
        }

    };

    const onsubmitRpayButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${Config.BASE_URL}/api/return-process-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    _id,

                })
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }
            setOtpInputVisible(true);
            setRPayButtonVisible(false);
            setreturnbuttonVisible(true);

        } catch (error) {
            console.log('payment error:', error);
        }


    };

    const onReturnButtonSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Config.BASE_URL}/api/return-otp-validation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    returnOTP: OTPValue.OTP,
                    productId: productId,
                    _id,
                    remaingAmount: RemaingAmount.Remaning_Amount,
                    mode: selectedPaymentMode, // Assuming you want to send the payment amount as well
                })
            });

            if (!response.ok) {
                throw new Error('Failed to process return  OTP-Validation');
            }

            setOtpInputVisible(false);

            setOTPValue({
                OTP: ""
            })
            setRemaingAmount({
                Remaning_Amount: " "
            })
            setSelectedPaymentMode('');



        } catch (error) {
            console.log('payment error:', error);
        }



    };

    const onSelectedCashPaymentMode = () => {
        setSelectedPaymentMode('Cash');

    }

    const onSelectedOnlinePaymentMode = () => {
        setSelectedPaymentMode('Online');

    }

    if (!bookingDetails) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const bookings = Array.isArray(bookingDetails) ? bookingDetails : [bookingDetails];

    return (
        <>


            {/*  yaha pe use krna  */}
            {bookings.map((booking, index) => (
                <div key={index} className='bg-sky-300 '>
                    {/*  details of ADMIN */}
                    <div className="flex items-center justify-center h-auto">
                        {/* Admin Details Section */}
                        <div className="relative w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl p-6  rounded-lg  transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                            {/* Gradient Overlay */}
                            <div className="absolute top-0 left-0 w-full h-full  opacity-50 rounded-lg transform -rotate-6"></div>

                            <div className="relative z-10">
                                <div className="text-center mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900 ">Admin</h1>
                                </div>
                                {/* Admin Profile Section */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="bg-sky-400 p-8 max-w-lg w-full rounded-lg shadow-inner shadow-blue-500 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ">
                                        <div className="flex flex-col items-center justify-center mb-6">
                                            <h1 className="text-white text-2xl font-bold">CamSharp</h1>
                                            <p className="text-yellow-600 text-sm mt-2">Your premier destination for photography</p>
                                        </div>

                                        <div className="text-center mb-6 pt-8">


                                            <div className="Container bg-slate-200 shadow-lg shadow-black rounded-full w-40 h-40 ml-16">

                                            </div>
                                            <div className="Profile-Div absolute top-40 mt-2   left-20 ml-6  w-40 h-40 rounded-full overflow-hidden drop-shadow-xl shadow-inner shadow-blue-500">
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

                            <div className="flex items-center justify-center h-auto bg-sky-400 shadow-xl rounded-lg">
                                <div className="relative w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl pt-2 pl-2 pr-2 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                    {/* Gradient Overlay */}
                                    <div className="text-center mb-2 ">
                                        <h1 className="text-3xl font-bold text-gray-900">User Information...</h1>
                                    </div>

                                    <div className="relative z-10 bg-white h-auto rounded-lg shadow-inner shadow-blue-500">

                                        <div className="space-y-2  pt-4 pb-4  ">

                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Name:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.user.name}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-3 border shadow-lg">
                                                <span className="font-bold text-gray-900">Mobile Number:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.user.mobileNumber}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Email:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.user.email}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Login Count:</span>
                                                <span className="text-gray-700 font-extrabold">{booking.user.LoginCount}</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-3  border shadow-lg">
                                                <span className="font-bold text-gray-900">Created At:</span>
                                                <span className="text-gray-700 font-extrabold">{new Date(booking.user.createdAt).toLocaleDateString()}</span>
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

                    <div className="flex items-center justify-center h-auto bg-sky-400 shadow-xl rounded-lg mt-8 w-80 ml-6">
                        <div className="relative  md:max-w-3xl lg:max-w-4xl xl:max-w-5xl pt-2  transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                            {/* Gradient Overlay */}
                            <div className="text-center mb-2 ">
                                <h1 className="text-3xl font-bold text-gray-900">Booking Details...</h1>
                            </div>

                            <div className="relative z-10 bg-white h-auto rounded-lg shadow-inner shadow-blue-500 pb-4">

                                <div className="space-y-2  pt-4  pl-1 ">

                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">ProductId:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.productId}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Quantity:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.quantity}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Date:</span>
                                        <span className="text-gray-700 font-extrabold">{formatDate(booking.date)}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72 ml-1 mr-2   border shadow-lg">
                                        <span className="font-bold text-gray-900">Time:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Duration:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Location:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72  ml-1 mr-2  border shadow-lg">
                                        <span className="font-bold text-gray-900">Name:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg p-3 bg-gray-100 w-72  ml-1 mr-2   border shadow-lg">
                                        <span className="font-bold text-gray-900">WhatsApp No:</span>
                                        <span className="text-gray-700 font-extrabold">{booking.mobilenumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>









                    <div className='pb-52'>
                    {booking.isReturn ? ' ':(  <div className='flex gap-4 ml-6  mt-8'>
                            <h3 className='font-bold text-black'>Payment Mode: </h3>
                            <button className={`p-2 rounded-full ${selectedPaymentMode === 'Cash' ? 'bg-green-500' : 'bg-white'}`} onClick={onSelectedCashPaymentMode}>Cash</button>
                            <button className={`p-2 rounded-full ${selectedPaymentMode === 'Online' ? 'bg-green-500' : 'bg-white'}`} onClick={onSelectedOnlinePaymentMode}>Online</button>
                        </div>)}
                        {booking.isReturn && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2 text-center" role="alert">
                                <span className="block sm:inline"> "The product has been returned.":</span>
                                <span className="block sm:inline"> " सामग्री वापस कर दिया गया है।":</span>

                            </div>
                        )}

                        {selectedPaymentMode && !booking.isBook && payFormVisible && (
                            <div className='bg-sky-400 w-80 h-auto ml-6 pt-2 pl-2 pr-2  rounded-lg text-center mt-4'>
                                <h1 className='text-black font-bold text-2xl'>First Payment...</h1>
                                <form className='rounded-lg bg-white flex flex-col gap-2 mt-2 w-full h-auto pt-4 text-black pb-2 ' action="" onSubmit={onsubmitPayButton}>

                                    <div class="flex justify-betwewn  gap-2 text-black font-bold pl-1 text-center">
                                        Total Amount:<input className='h-8 w-44 p-1   rounded-lg font-bold placeholder-sky-300 bg-transparent focus:outline-none focus:border-transparent shadow-inner  shadow-blue-500' type="text" name="Total_Amount" placeholder='Total-Amount' required value={AmountValue.Total_Amount} onChange={OnChangePayInput} /> </div>
                                    <div class="flex justify-betwewn  gap-2 text-black font-bold pl-1 text-center ">
                                        Adv.Payment:<input className='h-8 w-44 p-1  rounded-lg border-b-4 font-bold placeholder-sky-300 bg-transparent focus:outline-none focus:border-transparent shadow-inner  shadow-blue-500' type="text" name="Advance_Amount" placeholder='Advance-Amount' required value={AmountValue.Advance_Amount} onChange={OnChangePayInput} /></div>
                                    <button className='h-8 w-44  mb-2 ml-16 border-2 rounded-lg text-black font-bold hover:bg-sky-400  hover:cursor-pointer shadow-inner  shadow-blue-500'>Pay</button>
                                </form>
                            </div>
                        )}

                        {selectedPaymentMode && !booking.isReturn && booking.isBook && RPayBuuttonVisibble && (
                            <div className='bg-sky-400 w-80 h-auto ml-6 pt-2 pl-2 pr-2  rounded-lg text-center mt-4'>
                                <h1 className='text-black font-bold text-2xl'>Remaining Payment...</h1>
                                <form className='rounded-lg bg-white flex flex-col gap-2 mt-2  w-full h-auto pt-4 text-black font-bold pb-2' action="" onSubmit={onsubmitRpayButton}>
                                    Remaining Payment:<input className='h-8 w-44 p-1 ml-16  rounded-lg border-b-4 text-black font-bold placeholder-sky-300 bg-transparent focus:outline-none focus:border-transparent shadow-inner  shadow-blue-500' type="text" name="Remaning_Amount" placeholder='Remaining-Amount' required value={RemaingAmount.Remaning_Amount} onChange={OnChangeRPayInput} />
                                    <button className='h-8 w-44 pb-1 mb-2 ml-16  border-2 rounded-lg hover:bg-sky-400  hover:cursor-pointer shadow-inner  shadow-blue-500'>R-Pay</button>
                                </form>
                            </div>
                        )}

                       
                           
                            <div className='rounded-lg bg-white flex flex-col gap-2 mt-2  w-full h-auto pt-4 text-black font-bold pb-2'>
                                {otpInputVisibble && (<div className='text-black font-bold ml-16 '>
                                    OTP:<input className='h-8 w-44 p-1  rounded-lg border-b-4 text-black font-bold placeholder-sky-300 bg-transparent focus:outline-none focus:border-transparent shadow-inner  shadow-blue-500' type="text" name="OTP" placeholder='OTP' required value={OTPValue.OTP} onChange={OnChangeOTPInput} />
                                </div>)}
                                {bookButtonVisible && !booking.isBook && BookButtonVisible && (
                                    <button className=' h-8 w-44 pb-1 mb-2 ml-24  border-2 rounded-lg hover:bg-sky-400  hover:cursor-pointer shadow-inner  shadow-blue-500' onClick={onBookingButtonSubmit}>Book</button>
                                )}
                                {selectedPaymentMode && booking.isBook && !booking.isReturn && returnbuttonvisible && (
                                    <button className=' h-8 w-44 pb-1 mb-2 ml-24  border-2 rounded-lg hover:bg-sky-400  hover:cursor-pointer shadow-inner  shadow-blue-500' onClick={onReturnButtonSubmit}>Return</button>
                                )}
                            </div>
                    
                    </div>





                </div>
            ))}
            <AdminNavbar />

        </>
    );
};

export default UserBookingDetails;
