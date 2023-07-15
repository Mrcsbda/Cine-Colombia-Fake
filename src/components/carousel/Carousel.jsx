import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.scss';
import getMovies from '../../services/getMovies';
import getCinemaShows from '../../services/getCinemaShows';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [slides, setSlides] = useState([2, 3, 4, 5, 6]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(()=> {
    getData()
  }, [])

  const getData = async () => {
    const dataMovies = await getMovies()
    const dataCinemaShows = await getCinemaShows()
    console.log(dataMovies)
    console.log(dataCinemaShows)
    const moviesId = [...dataCinemaShows].map((show) => (show.movie))
    const filteredMovies = [...dataMovies].filter((movie) => moviesId.find(movieId => movie.id === movieId))
    setFilteredMovies(filteredMovies)
  }

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
      {filteredMovies.length > 0 && (
        <Swiper
          slidesPerView={5}
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
              onClick={() => handleClick(slide)}
              className={activeIndex === slide ? 'active-slide' : ''}
            >
              {filteredMovies[slide - 1].title}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;