// src/pages/LoginPage.js
import React, { useEffect, useState } from 'react';
import Config from '../utils/Config';
import { useLocation, Link, useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading , setLoading] = useState(false);
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
  }, [navigate, from]);

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
    setLoading(true);
    if (!formValues.mobileNumber || !formValues.password) {
      setErrors("Both fields are required");
      setTimeout(() => {
        setErrors("");
      }, 2000);
      setLoading(false);
      return;
    }

    try {  
      const response = await fetch(`${Config.BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        const token = data.token; // assuming token is returned in the response
        sessionStorage.setItem('token', token);   // Save token to sessionStorage
        navigate('/');
        setFormValues({
          mobileNumber: "",
          password: ""

        });
 
        setTimeout(() => {

        }, 5000); // Clear message after 5 seconds
      } else {
        const errorData = await response.json();
        setErrors(errorData.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors('Failed to submit the form');
      setLoading(false);
    }

  };

  return (
    <>
      <div className="container-fluid g-0 design">
        <div >
          <div className="row w-100 g-0">
            <div className="col-lg-4 col-12">
              <div className='mt-lg-5 p-2'>
                <div className="text-center">
                  <img src="img/logo.png" className='img-fluid' title='camSharp logo' alt="logo" style={{ height: '150px' }} />
                  <h1 className="fw-bold">CamSharp</h1>
                  <p className="text-secondary text-capitalize text-decoration-underline mt-2">Your premier destination for photography</p>
                </div>
                <div className="card p-2">
                  <h1 className="text-center mb-4">Log In</h1>

                  <form onSubmit={handleFormSubmit} className='form-group'>
                    <div className='input-group'>
                      <i className="fi fi-bs-smartphone pt-2 text-sky-500"></i>
                      <input
                        type="text"
                        name="mobileNumber"
                        id="mobileNumber_id"
                        placeholder="Mobile Number"
                        value={formValues.mobileNumber}
                        onChange={handleInputChange}
                        className=" form-control w-100"
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
                        className=" form-control w-100 my-2"
                      />
                    </div>
                    <div className="text-end"> <Link to="/forgot" className="text-light">Forgot Password?</Link></div>

                    <div>
                      <button type="submit" className="btn text-capitalize w-100 text-light">
                        {loading ? <>
                            Welcome to camsharp... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>             
                           </> : <> 
                           Log In  <i className="fi fi-sr-address-card ps-2"></i> 
                           </>}
                        
                       
                      </button>

                      <div className="btn btn-block my-3 text-capitalize text-light"> <img src="img/Google.png" alt="google " className='img-fluid me-2' />Sign in With Google</div>
                    </div>
                  </form>
                  {errors && <span className="text-danger fw-bold">{errors}</span>}
                  <div className="d-flex my-3">
                    <p>Don't have an account?</p> <Link to="/signup" className="ps-2 text-light text-decoration-underline">Sign Up</Link>
                  </div>
                <Link to="/admin-login" className="text-light">Admin Login</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-lg-block d-md-block d-none">
              <img src="img/Auth.jpg" className='w-100 img-fluid' alt="" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


export default LoginPage;

