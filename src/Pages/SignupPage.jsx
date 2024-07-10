import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Config from '../utils/Config';
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                navigate(from); // Redirect if token is already present
            }
        };
        fetchUserData();
    }, [navigate, from]);

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
        setLoading(true);
        if (!formValues.name || !formValues.mob_num || !formValues.password) {
            setErrors("All fields are required");
            setTimeout(() => {
                setErrors("");
            }, 2000);
            setLoading(false);
            return;
        }
        if (formValues.password !== formValues.confirm_password) {
            setErrors("Passwords do not match");
            setTimeout(() => {
                setErrors("");
            }, 2000);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${Config.BASE_URL}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                setLoading(false);
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
                setTimeout(() => {
                    setSuccessMessage("");
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
                <div>
                    <div className="row w-100 g-0">
                        <div className="col-lg-4">
                            <div className='mt-lg-4 p-2'>
                                <div className="text-center">
                                    <img src="img/logo.png" className='img-fluid' title='camSharp logo' alt="logo" style={{ height: '150px' }} />
                                    <h1 className="fw-bold">CamSharp</h1>
                                    <p className="text-secondary text-capitalize text-decoration-underline mt-2">Your premier destination for photography</p>
                                </div>

                                <div className="card p-2">
                                    <h1 className="text-center mb-3">Sign Up</h1>
                                    <form onSubmit={formSubmit} className="form-group">

                                        <div className='px-2 py-1 d-flex'>
                                            <i className="fi fi-sr-circle-user pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                value={formValues.name}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <div className='  px-2 py-1 d-flex'>
                                            <i className="fi fi-rr-mobile-notch pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="tel"
                                                name="mob_num"
                                                placeholder="Mobile"
                                                value={formValues.mob_num}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <div className='  px-2 py-1 d-flex'>
                                            <i className="fi fi-ss-envelope  pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email (optional)"
                                                value={formValues.email}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>



                                        <div className='  px-2 py-1 d-flex'>
                                            <i className="fi fi-sr-lock  pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formValues.password}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <div className=' d-flex px-2 py-1'>
                                            <i className="fi fi-sr-lock  pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="password"
                                                name="confirm_password"
                                                placeholder="Confirm Password"
                                                value={formValues.confirm_password}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-block my-3 text-capitalize text-light">
                                            {loading ? 
                                            <> 
                                             Moving to login page... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </> : 
                                            <>
                                            Sign Up <i className="fi fi-sr-address-card ms-1"></i>
                                             </>} 
                                        </button>

                                        <div className="btn btn-block my-3 text-capitalize text-light"> <img src="img/Google.png" alt="google" className='img-fluid me-2' />Sign Up With Google</div>
                                    </form>
                                    {errors && <span className="text-danger fw-bold">{errors}</span>}
                                    {successMessage && <span className="text-green-500 text-sm">{successMessage}</span>}
                                    <div className="d-flex my-3">
                                        <p>Already have an account?</p> <Link to="/login" className="ps-2 text-light text-decoration-underline">Log in </Link>
                                    </div>
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


export default Signup;
