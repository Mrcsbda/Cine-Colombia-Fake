import React, { useEffect, useState } from 'react'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'
import "./movieCheckout.scss"

const MovieCheckout = () => {
  const location = useLocation()
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const {idMovie} = useParams()
  const [setIsBuying] = useOutletContext()
  const [step, setStep] = useState(1)
  const props = {
    movie,
    trailer,
    setIsBuying,
    setStep,
    step
  }

  useEffect(() => {
    getMovie()
  }, [location])

  const getMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    const videosInfo = await getTrailer(idMovie)
    const trailerInfo = videosInfo.find(video => video.type === 'Trailer')
    ?? videosInfo.find(video => video.type === 'Teaser')  ;
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }

  if (movie && trailer) {
    return (
      <div className='movie-checkout-container'>
         {step === 1 && <MovieSchedule movie={movie} trailer={trailer} props={props}/> }
      </div>
    )
  }
}

export default MovieCheckout