import React, { useContext, useEffect, useState } from 'react'
import "./adminDetails.scss"
import MovieDetailsAdmin from '../../movieDetails/MovieDetailsAdmin'
import DetailsShowsAdmin from '../../detailsShows/DetailsShowsAdmin'
import getMovieInfo from '../../../services/getMovieInfo'
import getTrailer from '../../../services/getTrailer'
import { useLocation, useParams } from 'react-router'
import { getCinemaAndCinemaShows } from '../../../services/cinemasServices'
import { AppContext } from '../../../routes/Router'

const AdminDetail = () => {
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const [cinema, setCinema] = useState("")
  const { idMovie } = useParams()
  const location = useLocation()
  const { valueToFilterMovies, setFoundSchedule } = useContext(AppContext)
  
  const getOneMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    console.log(movieInfo);
    const cinemaAndCinemaShows = await getCinemaAndCinemaShows()
    const cinemaInfo = cinemaAndCinemaShows.find(item => item.cinema_shows.find(movie => movie.movie == idMovie))
    const infoCinemaShow = cinemaInfo.cinema_shows.find(item => item.movie == idMovie)
    console.log(infoCinemaShow.schedules);
    setFoundSchedule(infoCinemaShow.schedules)
    cinemaInfo.name === valueToFilterMovies || !valueToFilterMovies ? setCinema(cinemaInfo.name) : setCinema(false)
    const videosInfo = await getTrailer(idMovie)
    const trailerInfo = videosInfo.find(video => video.type === 'Trailer')
      ?? videosInfo.find(video => video.type === 'Teaser');
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }
  useEffect(() => {
    getOneMovie()
  }, [location])



  return (
    <section className='movie-details'>
      <MovieDetailsAdmin movie={movie} trailer={trailer}/>
      <DetailsShowsAdmin movie={movie} cinema={cinema}/>
    </section>
  )
}

export default AdminDetail