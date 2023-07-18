import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.scss';

import CardCarousel from '../cardCarousel/CardCarousel';

const Carousel = ({filteredMovies,moviesGenre}) => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [slides, setSlides] = useState([2, 3, 4, 5, 6]);

  useEffect(() => {

    const interval = setInterval(() => {
      const nextIndex = calculateAdjacentIndex(activeIndex, 1);
      handleSlide(nextIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    
  }, [activeIndex]);

  const handleSlide = (index) => {
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
      {filteredMovies.length > 0 && (
        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000, // Tiempo en milisegundos entre cada transición de slide
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            415: { slidesPerView: 5, spaceBetween: 0 },
            768: { slidesPerView: 5, spaceBetween: 0 },
            1024: { slidesPerView: 5, spaceBetween: 0 },
          }}
          modules={[Pagination]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
          simulateTouch={false}

        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide}
              onClick={() => handleSlide(slide)}
              className={activeIndex === slide ? 'active-slide' : ''}
            >
              <CardCarousel movie={filteredMovies[slide - 1]} listGenre={moviesGenre}/>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;