import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.scss';
import { useNavigate } from 'react-router-dom';
import CardCarousel from '../cardCarousel/CardCarousel';
import { AppContext } from '../../routes/Router';

const Carousel = ({ filteredMovies , moviesGenre }) => {
  const [activeIndex, setActiveIndex] = useState(4);
  const navigate = useNavigate();
  const { isBuying } = useContext(AppContext)

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
    setActiveIndex(index);
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

  const viewDetailMovie = (id) => {
    navigate(`${id}`)
  }

  const slides = Array.from({ length: 10 }, (_, i) => calculateAdjacentIndex(activeIndex, i - 2));

  return (
    <div className='carousel'>
      {filteredMovies.length > 0 && (
        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          loop={true}
          pagination={{ clickable: true }}

          modules={[Pagination]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
          simulateTouch={false}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={slide}
              onClick={() => {
                if (index === 2 && !isBuying) {
                  viewDetailMovie(filteredMovies[slide - 1].id)
                } else {
                  handleSlide(slide)
                }
              }
              }
              className={index === 2 ? 'active-slide' : ''}
            >
              <CardCarousel movie={filteredMovies[slide - 1]} listGenre={moviesGenre} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;