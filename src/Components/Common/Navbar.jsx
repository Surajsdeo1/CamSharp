import React, { useState } from 'react';
import Logo from "..//../Assists/LOGOO.png";
import { Link } from 'react-router-dom';
import './searchbar.css';


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    const token = sessionStorage.getItem('token');
   

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className=''>


                <div id="header" className="flex fixed top-0 justify-between items-center w-full h-auto lg:h-20 px-6 text-white ring-2 shadow-gray-50/50 border-2 border-gray-300 shadow-xl bg-blue-500">
                    {/* Logo and Title */}
                    <div className="flex items-center mb-2 mt-2 lg:mb-0 lg:mr-6">
                        <img src={Logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 " />
                        <h1 className='font-extrabold text-xxl'>CamSharp</h1>
                    </div>

                    {/* Search bar */}
                    {!token && (<div className="flex justify-around w-full lg:w-auto lg:mx-4">
                        <div className="relative ml-4 lg:ml-0">
                            <input className="bg-white border-gray-300 text-gray-700 px-4 py-2 rounded-full w-32 lg:w-full focus:outline-none focus:border-blue-500" type="text" name="searchbar" id="searchbar_id" placeholder="Search..." />
                            <button className="absolute right-0 top-0 mt-2 mr-3 text-blue-500">
                                <i className="fi fi-bs-search"></i>
                            </button>
                        </div>
                    </div>

                    )}
                    {/* after logIn */}
                    {token && (<div className="flex justify-around w-full ml-24 lg:w-auto lg:mx-4 bg-transparent">
                        <div className="relative ml-8 lg:ml-0 search-container">
                         <input
                                className="bg-transparent border-2 border-white text-gray-700 px-4 py-2 rounded-lg w-32 lg:w-48 focus:outline-none focus:border-blue-500"
                                type="text"
                                name="searchbar"
                                id="searchbar_id"
                                placeholder="Search..."
                            />
                        
                      
                            <button className="absolute right-0 top-0 mt-2 mr-3 text-white text-xl">
                                <i className="fi fi-bs-search" ></i>
                            </button>
                        </div>
                    </div>

                    )}

                    {/* Log In / Sign In buttons */}
                    {!token && (<div className="hidden lg:flex lg:items-center">

                        <Link to='/login'>

                            <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mr-2 rounded-md border-b-2">Log In</button>

                        </Link>
                        <Link to='/signup'>
                            <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md border-b-2">Sign In</button>

                        </Link></div>
                    )}

                    {/* Menu icon for mobile */}
                    {!token && (<div className='lg:hidden '>
                        <button className="text-white hover:text-blue-600" onClick={toggleMenu}>
                            <i className="fi fi-bs-list"></i>
                        </button>
                    </div>
                    )}
                </div>

                {/* Option button container */}
                <div className={`absolute top-12 right-0  lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col bg-blue-500 rounded shadow-lg">
                        <Link to='/login'>
                            <button className="hover:bg-blue-600 px-4 py-2 rounded-md text-white mb-2 border-b-2">Log In</button>
                        </Link>

                        <Link to='/signup'>
                            <button className="hover:bg-blue-600 px-4 py-2 rounded-md text-white border-b-2">Sign In</button>
                        </Link>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Navbar;
