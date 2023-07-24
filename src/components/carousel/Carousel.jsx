import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.scss';
import { useNavigate } from 'react-router-dom';

import CardCarousel from '../cardCarousel/CardCarousel';

const Carousel = ({ props }) => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [slides, setSlides] = useState([2, 3, 4, 5, 6]);
  const navigate = useNavigate()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = calculateAdjacentIndex(activeIndex, 1);
  //     handleSlide(nextIndex);
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };

  // }, [activeIndex]);

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

  const viewDatailMovie = (id) => {
    navigate(`${id}`)
  }

  return (
    <div className='carousel'>
      {props.filteredMovies.length > 0 && (
        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
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
              onClick={() => {
                if (activeIndex === slide && !props.isBuying) {
                  viewDatailMovie(props.filteredMovies[slide - 1].id)
                } else {
                  handleSlide(slide)
                }
              }
              }
              className={activeIndex === slide ? 'active-slide' : ''}
            >
              <CardCarousel movie={props.filteredMovies[slide - 1]} listGenre={props.moviesGenre} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;