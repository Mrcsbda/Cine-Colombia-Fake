import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'
import PurchaseData from '../purchaseData/PurchaseData'
import "./movieCheckout.scss"
import DownloadTickets from '../downloadTickets/DownloadTickets'
import { getCinemaAndCinemaShows } from '../../services/cinemasServices'
import { AppContext } from '../../routes/Router'
import useForm from '../../hooks/UseForm'

const MovieCheckout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { idMovie } = useParams()
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const [step, setStep] = useState(1)
  const [cinema, setCinema] = useState("")
  const [schedule, setSchedule] = useState(false)
  const {
    valueToFilterMovies,
    date,
    setCheckoutBuilderState,
    checkoutBuilderState,
    setFilteredMoviesBy,
    setIsBuying,
    setIsCheckout,
    setAvailable
  } = useContext(AppContext)
  const [dataPurchaseForm, handleChange, resetForm] = useForm({
    email: "",
    nameCard: "",
    numberCard: "",
    dateExpiry: "",
    cvv: ""
  })

  const propsMovieSchedule = {
    movie,
    cinema,
    schedule,
    trailer,
    setStep,
    step
  }
  const propsPurchaseData = {
    movie,
    step,
    setStep,
    dataPurchaseForm,
    handleChange,
    resetForm
  }


  useEffect(() => {
    getMovie()
  }, [location, valueToFilterMovies, date])

  const getMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    const videosInfo = await getTrailer(idMovie)
    const cinemaAndCinemaShows = await getCinemaAndCinemaShows()
    const trailerInfo = videosInfo.find(video => video.type === 'Trailer')
      ?? videosInfo.find(video => video.type === 'Teaser');
    const cinemaInfo = cinemaAndCinemaShows.find(item => item.cinema_shows.find(movie => movie.movie == idMovie))
    const infoCinemaShow = cinemaInfo.cinema_shows.find(item => item.movie == idMovie)
    cinemaInfo.id === Number(valueToFilterMovies)
      ? setCinema(cinemaInfo.name)
      : (!valueToFilterMovies
        ? setCinema("Selecciona un cinema")
        : setCinema(false))
    setCheckoutBuilderState(checkoutBuilderState.setCinemaShowId(infoCinemaShow.id).setHall(infoCinemaShow.hall));
    getMovieSchedulesByDate(infoCinemaShow.schedules)
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }

  const getMovieSchedulesByDate = (schedules) => {
    if (typeof date === 'string') {
      const [year, month, day] = date.split("-")
      const dateInMiliseconds = new Date(year, (month - 1), day).setHours(0, 0, 0, 0)
      const limitDateInMiliseconds = new Date(dateInMiliseconds).setHours(23, 59, 59, 999999)
      const cinemaShowSchedule = schedules.filter(item => item >= dateInMiliseconds && item <= limitDateInMiliseconds).sort((a,b)=> a-b)
      setSchedule(cinemaShowSchedule)
    }
  }

  const showComponets = () => {
    switch (true) {
      case step === 1:
        return (<MovieSchedule props={propsMovieSchedule} />);
      case step < 6:
        return (<PurchaseData props={propsPurchaseData} />);
      case step === 6:
        return (<DownloadTickets movie={movie} />);
      default: return ""
    }
  }

  const returnPage = () => {
    switch (step) {
      case 1:
        navigate("/")
        setFilteredMoviesBy(false)
        setIsCheckout(false)
        const updatedBuilderStep1 = checkoutBuilderState
          .setSchedule(undefined)
          .setMultiplex(undefined)
          .setCinemaShowId(undefined)
          .setHall(undefined);
        setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilderStep1));
        break;
      case 2:
        setStep(step - 1)
        setIsBuying(false)
        const updatedBuilderStep2 = checkoutBuilderState
          .setTotalTickets("reset", false)
          .setTotalToPay("reset", false)
        setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilderStep2));
        break;
      case 3:
        setStep(step - 1)
        setAvailable(true)
        const updatedBuilderStep3 = checkoutBuilderState.setPlaces([], "reset")
        setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilderStep3));
        break;
      case 4:
        setStep(step - 1)
        setAvailable(true)
        resetForm()
        break;
      case 6:
        setStep(1)
        navigate("/")
        setFilteredMoviesBy(false)
        setIsCheckout(false)
        setIsBuying(false)
        const updatedBuilderStep6 = checkoutBuilderState
          .setSchedule(undefined)
          .setMultiplex(undefined)
          .setCinemaShowId(undefined)
          .setHall(undefined)
          .setTotalTickets("reset", false)
          .setTotalToPay("reset", false)
          .setPlaces([], "reset")
          .setTransactionDate(undefined)
        setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilderStep6));
        break;
    }
  }

  return (
    <>
      {
        movie?.title && trailer?.key && (
          <>

            <section className='movie-checkout-container'>
              {
                step !== 5 && (
                  <div className='movie-checkout-container__return-btn' onClick={returnPage}>
                    <img className='movie-checkout-container__return-btn--icon' src="images/back-arrow.svg" alt="arrow icon" />
                    <p className='movie-checkout-container__return-btn--text'>{step !== 6 ? "Volver" : "Volver al inicio"}</p>
                  </div>
                )
              }
              {
                showComponets()
              }
            </section>
          </>
        )
      }
    </>
  )
}

export default MovieCheckout