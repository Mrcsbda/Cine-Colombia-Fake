import React, { useEffect, useState } from 'react'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import { useLocation, useParams } from 'react-router-dom'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'
import "./movieCheckout.scss"

const MovieCheckout = () => {
  const location = useLocation()
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const {idMovie} = useParams()

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
        <MovieSchedule movie={movie} trailer={trailer} />
      </div>
    )
  }
}

export default MovieCheckout