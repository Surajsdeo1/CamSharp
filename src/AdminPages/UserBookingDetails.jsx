import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import AdminNavbar from '../Components/Common/AdminNavbar';

const UserBookingDetails = () => {
    const { productId } = useParams();
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
                const response = await fetch(`http://localhost:5000/api/user-booking-details/${productId}`);
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
    }, [productId]);



    const onsubmitPayButton = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,


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
            const response = await fetch('http://localhost:5000/api/boooking-otp-validation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    BookingOTP: OTPValue.OTP,
                    productId: productId,
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
        }

    };

    const onsubmitRpayButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/return-process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,

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
            const response = await fetch('http://localhost:5000/api/return-otp-validation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    returnOTP: OTPValue.OTP,
                    productId: productId,
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

    return (
        <>


            {/*  yaha pe use krna  */}
            {bookingDetails.map((booking, index) => (
                <div key={index} className='bg-sky-300'>
                    <div className="flex items-center justify-center w-full ">
                        <div className="bg-sky-300 p-8 max-w-lg w-full">
                            <div className="flex flex-col items-center justify-center mb-6">
                                <h1 className="text-white text-2xl font-bold">CamSharp</h1>
                                <p className="text-yellow-600 text-sm mt-2">Your premier destination for photography</p>
                            </div>

                            <div className="text-center mb-6">
                                <div className="w-36 h-36 border-4 border-white rounded-full mx-auto mb-4 overflow-hidden">
                                    <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-white">ROSHAN SINGH DEO</h1>
                                <p className="text-sm md:text-base text-yellow-600">Your journey to success starts here, with ownCamSharp..</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='flex gap-4 ml-6 '>
                            <h3 className='font-bold text-black'>Payment Mode: </h3>
                            <button className={`p-2 rounded-full ${selectedPaymentMode === 'Cash' ? 'bg-green-500' : 'bg-white'}`} onClick={onSelectedCashPaymentMode}>Cash</button>
                            <button className={`p-2 rounded-full ${selectedPaymentMode === 'Online' ? 'bg-green-500' : 'bg-white'}`} onClick={onSelectedOnlinePaymentMode}>Online</button>
                        </div>
                        {booking.isReturn && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2 text-center" role="alert">
                                <span className="block sm:inline"> "The product has been returned.":</span>
                                <span className="block sm:inline"> " सामग्री वापस कर दिया गया है।":</span>
                            
                            </div>
                        )}

                        {selectedPaymentMode && !booking.isBook && payFormVisible && (
                            <div>
                                <form className='flex flex-col gap-2 mt-2 ml-12 w-72 h-36 pt-4 text-black' action="" onSubmit={onsubmitPayButton}>
                                    Total Amount:<input className='h-8 w-44 p-1 ml-16 border-b-4 rounded-lg font-bold placeholder-gray-500 bg-transparent focus:outline-none focus:border-transparent' type="text" name="Total_Amount" placeholder='Total-Amount' required value={AmountValue.Total_Amount} onChange={OnChangePayInput} />
                                    Advance Payment:<input className='h-8 w-44 p-1 ml-16 rounded-lg border-b-4 font-bold placeholder-gray-500 bg-transparent focus:outline-none focus:border-transparent' type="text" name="Advance_Amount" placeholder='Advance-Amount' required value={AmountValue.Advance_Amount} onChange={OnChangePayInput} />
                                    <button className='h-8 w-44 pb-1 ml-16 border-2 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer'>Pay</button>
                                </form>
                            </div>
                        )}

                        {selectedPaymentMode && !booking.isReturn && booking.isBook && RPayBuuttonVisibble && (
                            <div>
                                <form className='flex flex-col gap-2 mt-2 ml-12 w-72 h-36 pt-4' action="" onSubmit={onsubmitRpayButton}>
                                    Remaining Payment:<input className='h-8 w-44 p-1 ml-16 rounded-lg border-b-4 text-black font-bold placeholder-gray-500 bg-transparent focus:outline-none focus:border-transparent' type="text" name="Remaning_Amount" placeholder='Remaining-Amount' required value={RemaingAmount.Remaning_Amount} onChange={OnChangeRPayInput} />
                                    <button className='h-8 w-44 pb-1 ml-16 border-2 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer'>R-Pay</button>
                                </form>
                            </div>
                        )}

                        <div>
                            <div className='flex flex-col gap-2 mt-2 ml-12 w-72 h-36 pt-4'>
                                {otpInputVisibble && (<div>
                                    OTP:<input className='h-8 w-44 p-1 ml-16 rounded-lg border-b-4 text-black font-bold placeholder-gray-500 bg-transparent focus:outline-none focus:border-transparent' type="text" name="OTP" placeholder='OTP' required value={OTPValue.OTP} onChange={OnChangeOTPInput} />
                                </div>)}
                                {bookButtonVisible && !booking.isBook && BookButtonVisible && (
                                    <button className='h-8 w-44 pb-1 ml-16 border-2 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer' onClick={onBookingButtonSubmit}>Book</button>
                                )}
                                {selectedPaymentMode && booking.isBook && !booking.isReturn && returnbuttonvisible && (
                                    <button className='h-8 w-44 pb-1 ml-16 border-2 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer' onClick={onReturnButtonSubmit}>Return</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto mt-8 p-4 bg-sky-300 rounded-lg text-black shadow-md">
    <h1 className="text-2xl font-bold mb-4">User Booking Details :</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border-4 border-gray-300">
        <div className="flex items-center">
            <strong className="w-1/3">Product ID:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.productId}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">Quantity:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.quantity}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">Date:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{formatDate(booking.date)}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">Time:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.time}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">Duration:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.duration}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">Location:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.location}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">Name:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.name}</span>
        </div>
        <div className="flex items-center">
            <strong className="w-1/3">WhatsApp No:</strong>
            <span className="text-white w-2/3 pl-4 font-bold">{booking.mobilenumber}</span>
        </div>
    </div>
</div>


                </div>
            ))}
            <AdminNavbar />

        </>
    );
};

export default UserBookingDetails;
