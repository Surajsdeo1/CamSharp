import React, {useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Config from '../utils/Config';




function  LoginPage(){
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
        const response = await fetch(`${Config.BASE_URL}/api/users/admin-login`, {
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
     
     <div id="login-section" class="d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow-sm p-4">
    <div class="text-center mb-4">
      <i class="text-primary h2 fi fi-bs-aperture"></i>
      <h1 class="text-primary h4 font-weight-bold">CamSharp</h1>
      <p class="text-muted mt-2">Your premier destination for photography</p>
    </div>
    <div>
      <h1 class="h5 font-weight-semibold mb-4">Admin Log In</h1>
      <form onSubmit={handleFormSubmit} class="d-flex flex-column gap-4">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text bg-light border-0"><i class="fi fi-bs-smartphone text-primary"></i></span>
          </div>
          <input
            type="text"
            name="mobileNumber"
            id="mobileNumber_id"
            placeholder="Mobile Number"
            value={formValues.mobileNumber}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text bg-light border-0"><i class="fi fi-bs-password text-primary"></i></span>
          </div>
          <input
            type="password"
            name="password"
            id="password_id"
            placeholder="Password"
            value={formValues.password}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <button type="submit" class="btn btn-primary font-weight-semibold">
            Log In
            <i class="fi fi-bs-address-card pl-2"></i>
          </button>
          <a href="/forgot" class="text-muted">Forgot Password?</a>
        </div>
      </form>
      {errors && <span class="text-danger font-weight-bold">{errors}</span>}
    </div>
  </div>
</div>
      </>
    );
  }
 
 
  export default  LoginPage ;
  