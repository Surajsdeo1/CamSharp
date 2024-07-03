import React, {useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';




function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/admin';
  
    const [formValues, setFormValues] = useState({
      mobileNumber: "",
      password: ""
    });
    const [errors, setErrors] = useState("");
  
  
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('token');
     
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
        const response = await fetch('http://localhost:5000/api/users/admin-login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formValues),
              });
  
        if (response.ok) {
          const data = await response.json();
          const token=data.token; // assuming token is returned in the response
          localStorage.setItem('token',token);   // Save token to localStorage
          navigate('/admin');
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
     
        <div id="login-section">
          <div className="login-container">
            <div className="login-logo">
              <i className="text-blue-500 text-xl h-8 lg:h-auto fi fi-bs-aperture"></i>
              <h1 className="text-blue-500 text-xl font-bold">CamSharp</h1>
              <p className="text-gray-500 text-sm mt-2">Your premier destination for photography</p>
            </div>
            <div className="login-form-container">
              <h1 className="text-2xl font-semibold mb-4">Admin Log In</h1>
              <form  onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
            
            </div>
          </div>
        </div>
      
      </>
    );
  }
  
  export default LoginPage;
  