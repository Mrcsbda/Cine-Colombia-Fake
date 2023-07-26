import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'
import PurchaseData from '../purchaseData/PurchaseData'
import "./movieCheckout.scss"
import DownloadTickets from '../downloadTickets/DownloadTickets'
import { getCinemaAndCinemaShows } from '../../services/cinemasServices'
import { AppContext } from '../../routes/Router'

const MovieCheckout = () => {
  const location = useLocation()
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const { idMovie } = useParams()
  const [step, setStep] = useState(1)
  const [cinema, setCinema] = useState("")
  const {valueToFilterMovies} = useContext(AppContext)
  const propsMovieSchedule = {
    movie,
    cinema,
    trailer,
    setStep,
    step
  }
  const propsPurchaseData = {
    movie,
    setStep,
    step
  }
  const propsDownloadTickets = {
    movie,
  }

  useEffect(() => {
    getMovie()
  }, [location, valueToFilterMovies])

  const getMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    const videosInfo = await getTrailer(idMovie)
    const cinemaAndCinemaShows = await getCinemaAndCinemaShows()
    const trailerInfo = videosInfo.find(video => video.type === 'Trailer')
    ?? videosInfo.find(video => video.type === 'Teaser');
    const cinemaInfo = cinemaAndCinemaShows.find(item => item.cinema_shows.find(movie => movie.movie == idMovie))
    const infoCinemaShow = cinemaInfo.cinema_shows.find(item => item.movie === idMovie)
    console.log(cinemaAndCinemaShows)
    console.log(cinemaInfo)
    cinemaInfo.name === valueToFilterMovies || !valueToFilterMovies ? setCinema(cinemaInfo.name) : setCinema(false)
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }

  const showComponets = () => {
    switch (true) {
      case step === 1:
        return (<MovieSchedule props={propsMovieSchedule} />);
      case step < 6:
        return (<PurchaseData props={propsPurchaseData} />);
      case step === 6:
        return (<DownloadTickets props={propsDownloadTickets} />);
      default: return ""
    }
  }

  return (
    <>
      {
        movie?.title && trailer?.key && (
          <section className='movie-checkout-container'>
            {
              showComponets()
            }
          </section>
        )
      }
    </>
  )
}

export default MovieCheckout