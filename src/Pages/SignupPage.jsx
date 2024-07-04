

import React, { useState,useEffect } from 'react';
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import { useLocation,  useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
  const from = location.state?.from || '/profile';

    const [formValues, setFormValues] = useState({
        name: "",
        mob_num: "",
        email: "",
        password: "",
        confirm_password: "",
      
    });

    useEffect(() => {
        const fetchUserData = async () => {
          const token =  sessionStorage.getItem('token');
        console.log('usertoken is:', token);
        if (token) {
          navigate(from); // Redirect if token is already present
        }
      };
      fetchUserData();
      }, [navigate,from]);

    const [errors, setErrors] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onHandleInputform = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        if (!formValues.name || !formValues.mob_num || !formValues.password  ) {
            setErrors("All fields are required");
            setTimeout(() => {
                setErrors("");
            }, 2000); 
            return;
        }
        if (formValues.password !== formValues.confirm_password) {
            setErrors("Passwords do not match");
            setTimeout(() => {
                setErrors("");
            }, 2000); 
            return;
        }

        try {
            console.log('form value', formValues);
            const response = await fetch(`${Config.BASE_URL}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/login');
                setFormValues({
                    name: "",
                    mob_num: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                   
                });
                
                setSuccessMessage('Form submitted successfully');
                console.log('User registered successfully  ',data);
                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000); // Clear message after 5 seconds
            } else {
                const errorData = await response.json();
                setErrors(errorData.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors('Failed to submit the form');
        }
    };

    return (
        <>
            <Navbar />
            <div id="sign-in-section" className="min-h-screen bg-white flex justify-center items-center">
                <div className="text-center  sm:p-8">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <i className="text-blue-500 text-xl fi fi-bs-aperture"></i>
                        <h1 className="text-2xl font-semibold text-blue-500">CamSharp</h1>
                        <p className="text-sm  mt-1 text-gray-500">The premier destination for photographers and filmmakers</p>
                    </div>

                    <div className="bg-gray-100 border rounded-xl p-6 max-w-md w-full">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-700">Sign Up</h1>
                        <form onSubmit={formSubmit} className="flex flex-col gap-4">

                            <div className='border-b-2 flex items-center px-2 py-1'>
                                <i className="fi fi-bs-user text-sky-500 mr-2"></i>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formValues.name}
                                    onChange={onHandleInputform}
                                    className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                                />
                            </div>

                            <div className='border-b-2 flex items-center px-2 py-1'>
                                <i className="fi fi-bs-smartphone text-sky-500 mr-2"></i>
                                <input
                                    type="tel"
                                    name="mob_num"
                                    placeholder="Mobile"
                                    value={formValues.mob_num}
                                    onChange={onHandleInputform}
                                    className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                                />
                            </div>

                            <div className='border-b-2 flex items-center px-2 py-1'>
                                <i className="fi fi-bs-envelope text-sky-500 mr-2"></i>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email (optional)"
                                    value={formValues.email}
                                    onChange={onHandleInputform}
                                    className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                                />
                            </div>
                            
                               

                            <div className='border-b-2 flex items-center px-2 py-1'>
                                <i className="fi fi-bs-password text-sky-500 mr-2"></i>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={onHandleInputform}
                                    className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                                />
                            </div>

                            <div className='border-b-2 flex items-center px-2 py-1'>
                                <i className="fi fi-bs-password text-sky-500 mr-2"></i>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    value={formValues.confirm_password}
                                    onChange={onHandleInputform}
                                    className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                                />
                            </div>

                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300 ease-in-out w-full">
                                Sign Up <i className="fi fi-bs-address-card pl-2 text-sm"></i>
                            </button>
                        </form>
                        {errors && <span className="text-red-500 text-sm font-bold">{errors}</span>}
                        {successMessage && <span className="text-green-500 text-sm">{successMessage}</span>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Signup;
