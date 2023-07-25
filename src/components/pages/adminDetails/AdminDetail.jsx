import React, { useEffect, useState } from 'react'
import "./adminDetails.scss"
import MovieDetailsAdmin from '../../movieDetails/MovieDetailsAdmin'
import DetailsShowsAdmin from '../../detailsShows/DetailsShowsAdmin'
import getMovieInfo from '../../../services/getMovieInfo'
import getTrailer from '../../../services/getTrailer'
import { useLocation, useParams } from 'react-router'

const AdminDetail = () => {
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const { idMovie } = useParams()
  const location = useLocation()
  
  const getOneMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    console.log(movieInfo);
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
      <DetailsShowsAdmin movie={movie}/>
    </section>
  )
}

export default AdminDetail