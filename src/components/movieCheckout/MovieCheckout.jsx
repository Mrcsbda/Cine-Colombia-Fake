import React, { useEffect, useState } from 'react'
import MovieSchedule from '../movieSchedule/MovieSchedule'
import { useLocation } from 'react-router-dom'
import getMovieInfo from '../../services/getMovieInfo'
import getTrailer from '../../services/getTrailer'

const MovieCheckout = () => {
  const location = useLocation()
  const [movie, setMovie] = useState()
  const [trailer, setTrailer] = useState()

  useEffect(() => {
    getMovie()
  }, [location])

  const getMovie = async () => {
    const movieInfo = await getMovieInfo(location.state)
    const videosInfo = await getTrailer(location.state)
    const trailerInfo = videosInfo.find(video => video.type === 'Trailer')
    ?? videosInfo.find(video => video.type === 'Teaser')  ;
    setMovie(movieInfo)
    setTrailer(trailerInfo)
  }

  if (movie && trailer) {
    return (
      <>
        <MovieSchedule movie={movie} trailer={trailer} />
      </>
    )
  }
}

export default MovieCheckout