import React, { useContext, useEffect, useState } from 'react'
import "./adminDetails.scss"
import MovieDetailsAdmin from '../../movieDetails/MovieDetailsAdmin'
import DetailsShowsAdmin from '../../detailsShows/DetailsShowsAdmin'
import getMovieInfo from '../../../services/getMovieInfo'
import getTrailer from '../../../services/getTrailer'
import { useLocation, useParams } from 'react-router'
import { getCinemaAndCinemaShows } from '../../../services/cinemasServices'
import { AppContext } from '../../../routes/Router'
import CreateNewForm from '../../createNewForm/CreateNewForm'

const AdminDetail = () => {
  const [movie, setMovie] = useState("")
  const [trailer, setTrailer] = useState("")
  const [cinema, setCinema] = useState("")
  const [infoShow, setInfoShow] = useState('')
  const { idMovie } = useParams()
  const location = useLocation()
  const { valueToFilterMovies, newMultiplex, newShow } = useContext(AppContext)
  
  const getOneMovie = async () => {
    const movieInfo = await getMovieInfo(idMovie)
    console.log(movieInfo);
    //Información de todos los cines con sus funciones.
    const cinemaAndCinemaShows = await getCinemaAndCinemaShows()
    //Queremos traernos todos los cines con cinema_shows donde se proyecte la película seleccionada
    const cinemaShows = cinemaAndCinemaShows.filter(item=> item.cinema_shows.find(element => element.movie == idMovie))
    console.log(cinemaShows);
    
    const cinemaInfo = cinemaAndCinemaShows.find(item => item.cinema_shows.find(movie => movie.movie == idMovie))
    const infoCinemaShow = cinemaInfo.cinema_shows.find(item => item.movie == idMovie)
    setInfoShow(infoCinemaShow)
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

const propsMultiplex = {
  toCreate: "nuevo Multiplex",
  label1: "Nombre del Multiplex",
  label2: "Salas",
  example1: "Los Molinos",
  example2: "1",
  name1: 'multiplex',
  name2: "salas"
}

const propsShow = {
  toCreate: "nueva función",
  label1: "Numero de la sala",
  label2: "Tiempo",
  example1: "1",
  example2: "13:00",
  name1: 'sala',
  name2: "show"
}

  return (
    <section className='movie-details'>
      {
        newMultiplex && <CreateNewForm props={propsMultiplex}/>
      }
      {
        newShow && <CreateNewForm props={propsShow}/>
      }
      <MovieDetailsAdmin movie={movie} trailer={trailer}/>
      <DetailsShowsAdmin movie={movie} cinema={cinema} infoShow={infoShow}/>
    </section>
  )
}

export default AdminDetail