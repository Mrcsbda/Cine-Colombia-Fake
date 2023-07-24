import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Carousel from '../../carousel/Carousel'
import getMoviesGenre from '../../../services/getGenreMovies'
import getMovies from '../../../services/getMovies'
import getCinemaShows from '../../../services/cinemaShowsServices'
import './home.scss'


const Home = () => {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);
  const [isBuying, setIsBuying] = useState(false)
  const props = {
    filteredMovies,
    moviesGenre,
    isBuying,
  }
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
    console.log(filteredMovies)
    console.log(moviesId)
  }

  return (

    <div>
      <Carousel className="carousel" props={props}/>
      <article className='outlet'>
        <Outlet context={[setIsBuying]}/>
      </article>
    </div>
  )
}

export default Home