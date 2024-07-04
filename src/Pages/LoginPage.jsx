// src/pages/LoginPage.js
import React, { useEffect, useState } from 'react';
import Config from '../utils/Config';

import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';
import { useLocation, Link, useNavigate } from 'react-router-dom';


import '../styles/LoginPage.css';


function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/profile';

  const [formValues, setFormValues] = useState({
    mobileNumber: "",
    password: ""
  });
  const [errors, setErrors] = useState("");


  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');
   
    if (token) {
      navigate(from); // Redirect if token is already present
    }
  };
  fetchUserData();
  }, [navigate,from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!formValues.mobileNumber || !formValues.password) {
      setErrors("Both fields are required");
      setTimeout(() => {
        setErrors("");
      }, 2000);
      return;
    }

    try {
      console.log('login form value', formValues);
      const response = await fetch(`${Config.BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

      if (response.ok) {
        const data = await response.json();
        const token=data.token; // assuming token is returned in the response
        sessionStorage.setItem('token',token);   // Save token to sessionStorage
        navigate('/profile');
        setFormValues({
          mobileNumber: "",
          password: ""
          
        });
        
        console.log('User loggin successfully ',data);
        setTimeout(() => {
        
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
      <div id="login-section">
        <div className="login-container">
          <div className="login-logo">
            <i className="text-blue-500 text-xl h-8 lg:h-auto fi fi-bs-aperture"></i>
            <h1 className="text-blue-500 text-xl font-bold">CamSharp</h1>
            <p className="text-gray-500 text-sm mt-2">Your premier destination for photography</p>
          </div>
          <div className="login-form-container">
            <h1 className="text-2xl font-semibold mb-4">Log In</h1>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className='input-group'>
                <i className="fi fi-bs-smartphone pt-2 text-sky-500"></i>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber_id"
                  placeholder="Mobile Number"
                  value={formValues.mobileNumber}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className='input-group'>
                <i className="fi fi-bs-password pt-2 text-sky-500"></i>
                <input
                  type="password"
                  name="password"
                  id="password_id"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="login-actions">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300 ease-in-out">
                  Log In
                  <i className="fi fi-bs-address-card pl-2 text-sm"></i>
                </button>
                <a href="/forgot" className="text-gray-500 hover:text-blue-500 pl-2">Forgot Password?</a>
              </div>
            </form>
            {errors && <span className="text-red-500 text-sm font-bold">{errors}</span>}
            <div className="login-footer">
              <p className="text-sm text-gray-500">Don't have an account?</p>
              <Link to="/signup" className="hover:text-blue-500 text-sm border-b border-sky-700">Sign Up</Link>
            </div>
          </div>
          <Link to="/admin-login" className="hover:text-blue-500 text-sm border-b border-sky-700">Admin Login</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
