import React, { useState, useEffect } from 'react';
import image1 from '../../Images/1.png';
import image2 from '../../Images/2.png';
import image3 from '../../Images/3.png';
import image4 from '../../Images/4.png';

const images = [
    { url: image1, link: '/page1' },
    { url: image2, link: '/page2' },
    { url: image3, link: '/page3' },
    { url: image4, link: '/page4' },
];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-10000 ${index === currentIndex ? 'opacity-100' :'opacity-0'}`}
                >
                    <a href={image.link}>
                        <img
                            src={image.url}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                            style={{ aspectRatio: '16/9' }}
                        />
                    </a>
                </div>
            ))}
            <div className="absolute inset-0 flex justify-between items-center p-4">
                <button
                    onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
                    className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
                >
                    &#10094;
                </button>
                <button
                    onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
                    className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
}

export default Carousel;
