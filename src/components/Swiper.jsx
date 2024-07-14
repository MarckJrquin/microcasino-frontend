import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { Image } from '@nextui-org/react';

export default function Carousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-[305px]"
      >
        <SwiperSlide>
            <Image
                isBlurred
                removeWrapper
                alt="Relaxing app background"
                className="z-0 object-cover"
                src="https://nextui.org/images/card-example-4.jpeg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                isBlurred
                removeWrapper
                alt="Relaxing app background"
                className="z-0 object-cover"
                src="https://nextui.org/images/card-example-3.jpeg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                isBlurred
                removeWrapper
                alt="Relaxing app background"
                className="z-0 object-cover"
                src="https://nextui.org/images/card-example-2.jpeg"
            />
        </SwiperSlide>
        <SwiperSlide>
            <Image
                isBlurred
                removeWrapper
                alt="Relaxing app background"
                className="z-0 object-cover"
                src="https://nextui.org/images/card-example-1.jpeg"
            />
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
