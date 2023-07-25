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
  const [step, setStep] = useState(5)
  const propsMovieSchedule = {
    movie,
    trailer,
    setStep,
    step
  }
  const propsPurchaseData = {
    movie,
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

  const showComponets = () => {
    switch (true) {
      case step === 1:
        return (<MovieSchedule props={propsMovieSchedule} />);
      case step < 6:
        return (<PurchaseData props={propsPurchaseData} />);
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