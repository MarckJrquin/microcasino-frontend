import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


const Carousel = ({ slides, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, interval);

        return () => clearInterval(slideInterval);
    }, [isPaused, interval]);


    return (
        <div className="relative w-full h-full overflow-hidden">
            <div 
            className="h-full absolute inset-0 flex transition-transform duration-500" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0" >
                        {slide}
                    </div>
                ))}
            </div>

            <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={prevSlide}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={nextSlide}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
