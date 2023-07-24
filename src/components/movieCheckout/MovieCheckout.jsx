import React, { useEffect, useState } from 'react'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'
import PurchaseData from '../purchaseData/PurchaseData'
import "./movieCheckout.scss"

const MovieCheckout = () => {
  const location = useLocation()
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const { idMovie } = useParams()
  const [setIsBuying] = useOutletContext()
  const [step, setStep] = useState(1)
  const propsMovieSchedule = {
    movie,
    trailer,
    setIsBuying,
    setStep,
    step
  }

  const propsPurchaseData = {
    movie,
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
      ?? videosInfo.find(video => video.type === 'Teaser');
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }

  return (
    <>
      {
        movie && trailer && (
          <section className='movie-checkout-container'>
            {step === 1 ? <MovieSchedule props={propsMovieSchedule} /> : <PurchaseData props={propsPurchaseData} />}
          </section>
        )
      }
    </>
  )
}

export default MovieCheckout