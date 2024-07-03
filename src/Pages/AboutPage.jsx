import React from 'react';
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import FooterBar from '../Components/Common/FooterBar';

function About() {
    return (
        <>
            <Navbar />
            <FooterBar/>
            <div id="about-us" className="bg-white text-gray-700 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-8">About Us</h2>
                    <p className="text-lg mb-6">
                        Welcome to <span className="font-bold">CamSharp</span>, your premier destination for camera, lens, and equipment rentals. At <span className="font-bold">CamSharp</span>, we're passionate about photography and videography, and we understand the importance of having the right gear to bring your vision to life.
                    </p>
                    <p className="text-lg mb-6">
                        Our mission is to provide photographers and filmmakers with access to high-quality equipment at affordable prices. Whether you're a professional in need of specialized gear or an enthusiast exploring new creative avenues, we've got you covered.
                    </p>
                    <p className="text-lg mb-6">
                        With our extensive selection of cameras, lenses, and accessories, you'll find everything you need to capture stunning images and videos. Plus, our team of experts is here to offer guidance and support, ensuring that you have a seamless rental experience from start to finish.
                    </p>
                    <p className="text-lg mb-6">
                        And if you're in the market to purchase your own gear, be sure to check out our inventory of cameras for sale. We're committed to offering competitive prices on top-of-the-line equipment, so you can invest in the tools you need without breaking the bank.
                    </p>
                    <p className="text-lg mb-6">
                        Thank you for choosing <span className="font-bold">CamSharp</span> for all of your camera rental and sales needs. We look forward to helping you bring your creative vision to life!
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
