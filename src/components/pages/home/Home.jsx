import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Carousel from '../../carousel/carousel.jsx'
import getMoviesGenre from '../../../services/getGenreMovies'
import getMovies from '../../../services/getMovies'
import getCinemaShows from '../../../services/cinemaShowsServices'
import './home.scss'


const Home = () => {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const dataMovies = await getMovies()
    const dataCinemaShows = await getCinemaShows()
    const moviesId = [...dataCinemaShows].map((show) => (show.movie))
    const filteredMovies = [...dataMovies].filter((movie) => moviesId.find(movieId => movie.id === movieId))
    const dataMoviesGenre = await getMoviesGenre()
    setFilteredMovies(filteredMovies)
    setMoviesGenre(dataMoviesGenre)
  }

  return (

    <div>
      <Carousel className="carousel" filteredMovies={filteredMovies} moviesGenre={moviesGenre}/>
      <article className='outlet'>
        <Outlet />
      </article>
    </div>
  )
}

export default Home