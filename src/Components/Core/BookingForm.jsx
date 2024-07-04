import React, {  useState } from 'react';


import { useParams,Link } from 'react-router-dom';
import Config from '../../utils/Config';


// Custom alert component
const CustomAlert = ({ message, onClose }) => (

    <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
        {message}
        <button onClick={onClose} className="ml-4 underline">Close</button>
    </div>
);

const BookingForm = () => {
   


    const { itemId } = useParams();
    const {name}=useParams();
    const ItemidNumber = parseInt(itemId);
    //check  item id number

    const initialFormData = {
        ProductName:name,
        ItemId: ItemidNumber,
        quantity: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        Name: "",
        whatsappNo: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('token'); // Assuming the token is stored in sessionStorage
   
        // data save in a db
        try {


            const response = await fetch(`${Config.BASE_URL}/api/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token // Include the token in the request headers
                },
                body: JSON.stringify(formData),
            });
                        
            if(response.ok)
                {
                    const data= await response.json();
                    setFormData(initialFormData);       // Reset form fields
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 10000); // Hide alert after 10 seconds
                    console.log('Booking data send in database successfully ',data);
            
                }

        } catch (error) {
            console.error('Error submitting booking form:', error);

        }
    };
    return (
        <>
            {showAlert && <CustomAlert message="Your Booking Details Will Be Sent to Your WhatsApp. Can You Please Open Your WhatsApp? ." onClose={() => setShowAlert(false)} />}
            <div className="mt-2 mb-12">
                <h1 className="text-2xl font-bold pl-2 text-gray-700">Booking Details</h1>
                <div className="container mx-auto pl-1 pt-1">
                    <form onSubmit={onHandleSubmit} className="max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className=' flex items-center border-b-2 border-gray-200 gap-2 text-xl  font-bold justify-center '>
                            <h2 className="Product-ID-field text-blue-500">Product Id:</h2>
                            <span className='text-blue-700'>{ItemidNumber}</span>
                        </div>


                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-tally text-sky-500 mr-2"></i>

                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                placeholder='Quantity'
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-calendar text-sky-500 mr-2"></i>
                            <input type="date" id="date" name="date" placeholder='Date' value={formData.date} onChange={handleChange} required className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent" />
                        </div>
                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-clock-three text-sky-500 mr-2"></i>
                            <input type="time" id="time" name="time" placeholder='Time' value={formData.time} onChange={handleChange} required className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent" />
                        </div>
                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-duration-alt text-sky-500 mr-2"></i>
                            <input type="text" id="duration" name="duration" placeholder='Duration' value={formData.duration} onChange={handleChange} required className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent" />
                        </div>
                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-marker text-sky-500 mr-2"></i>
                            <input type="text" id="location" name="location" placeholder='Your Location' value={formData.location} onChange={handleChange} required className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent" />
                        </div>
                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-id-card-clip-alt text-sky-500 mr-2"></i>
                            <input type="text" id="Name" name="Name" placeholder='Name' value={formData.Name} onChange={handleChange} required className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent" />
                        </div>
                        <div className="border-b flex items-center px-2 py-1 mt-2">
                            <i className="fi fi-bs-mobile-notch text-sky-500 mr-2"></i>
                            <input type="text" id="whatsappNo" name="whatsappNo" placeholder='WhatsApp No' value={formData.whatsappNo} onChange={handleChange} required className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent" />
                        </div>
                        <div className="flex justify-center  mt-2  bg-green-500  text-white p-2 rounded-md hover:bg-green-600 focus:outline-none  ">
                            <button type="submit" className="">Book <i className="fi fi-bs-arrow-up-right-from-square ml-2 text-gray-200 "></i></button>
                            

                            
                        </div>

                    </form>
                    <Link to={`/user-booking/${itemId}`} className="ml-2">View Booking Details</Link>
                </div>
            </div>
        </>
    );
}

export default BookingForm;
