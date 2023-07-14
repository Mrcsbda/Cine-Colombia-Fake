import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.scss';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [slides, setSlides] = useState([2, 3, 4, 5, 6]);

  const handleClick = (index) => {
    const adjacentIndex = calculateAdjacentIndex(index, -2);
    const newSlides = Array.from({ length: 5 }, (_, i) =>
      calculateAdjacentIndex(adjacentIndex, i)
    );
    setActiveIndex(index);
    setSlides(newSlides);
  };

  const calculateAdjacentIndex = (index, increment) => {
    let newIndex = index + increment;
    if (newIndex < 1) {
      newIndex = 10 + newIndex;
    } else if (newIndex > 10) {
      newIndex = newIndex - 10;
    }
    return newIndex;
  };

  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        autoplay={{ delay: 1000 }}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 5, spaceBetween: 20 },
          768: { slidesPerView: 5, spaceBetween: 40 },
          1024: { slidesPerView: 5, spaceBetween: 50 },
        }}
        modules={[Pagination]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
        simulateTouch={false}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide}
            onClick={() => { activeIndex === slide ? console.log('hola') : handleClick(slide) }}
            className={activeIndex === slide ? "active-slide" : ""}
          >
            Slide {slide}
          </SwiperSlide>
        ))}    
      </Swiper>
    </div>
  );
};

export default Carousel;