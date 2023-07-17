import React, { useEffect, useState } from 'react'
import './home.scss'
import Carousel from '../../carousel/Carousel'
import MainHome from '../../main-home/MainHome'
import getCinemaShows from '../../../services/getCinemaShows'
import getMoviesGenre from '../../../services/getGenreMovies'
import getMovies from '../../../services/getMovies'


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
    console.log(filteredMovies)
    console.log(moviesId)
  }

  return (
    <div>
      <Carousel  filteredMovies={filteredMovies} moviesGenre={moviesGenre}/>
      <MainHome />
    </div>
  )
}

export default Home