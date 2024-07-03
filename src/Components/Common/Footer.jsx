import React from 'react';

function Footer() {
    return (
        <div id="footer" className="bg-gray-100 text-gray-700 mt-6">
            {/* Heading footer */}
            <div id="footer-heading" className="py-4 text-center border-b border-gray-300">
                <h2 className="text-xl font-bold">Back To Top</h2>
            </div>

            {/* Sections */}
            <div id="footer-sections" className="flex flex-col lg:flex-row justify-center lg:justify-between px-4 py-6 lg:px-10">
                {/* About Us */}
                <div id="about-us" className="flex flex-col mb-6 lg:mb-0">
                    <h4 className="font-semibold mb-2 text-gray-700">Get To Know Us</h4>
                    <a href="/about" className="hover:text-blue-500">About Us</a>
                    <a href="/career" className="hover:text-blue-500">Careers</a>
                    <a href="/press" className="hover:text-blue-500">Press Releases</a>
                    <a href="shop" className="hover:text-blue-500">CamSharp Shop</a>
                </div>

                {/* Contact */}
                <div id="contact" className="flex flex-col mb-6 lg:mb-0">
                    <h4 className="font-semibold mb-2 text-gray-700">Contact With Us</h4>
                    <a href="/whatsapp" className="hover:text-blue-500">Whatsapp</a>
                    <a href="/insta" className="hover:text-blue-500">Instagram</a>
                    <a href="/twitter" className="hover:text-blue-500">Twitter</a>
                    <a href="facebook" className="hover:text-blue-500">Facebook</a>
                </div>

                {/* Make Money */}
                <div id="make-money" className="flex flex-col mb-6 lg:mb-0">
                    <h4 className="font-semibold mb-2 text-gray-700">Make Money With Us</h4>
                    <a href="sell" className="hover:text-blue-500">Sell On CamSharp</a>
                </div>

                {/* Help */}
                <div id="help" className="flex flex-col">
                    <h4 className="font-semibold mb-2 text-gray-700">Let Us Help You</h4>
                    <a href="profile" className="hover:text-blue-500">Your Account</a>
                    <a href="return" className="hover:text-blue-500">Return Center</a>
                    <a href="help" className="hover:text-blue-500">Help Center</a>
                </div>
            </div>

            {/* Copy Rights */}
            <div id="copy-rights" className="text-center py-4 text-gray-500">
                <p>Conditions of Use & Book Privacy Notice</p>
                <p>&copy; 2024, CamSharp.com, Inc, or its officials</p>
            </div>
        </div>
    );
}

export default Footer;
