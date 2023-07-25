import React, { useContext } from 'react'
import "./movieSchedule.scss"
import { AppContext } from '../../routes/Router'

const MovieSchedule = ({ props }) => {

  const { setIsBuying } = useContext(AppContext)

  const handleClick = () => {
    setIsBuying(true)
    props.setStep(props.step + 1)
  }

  return (
    <div className='movie'>
      <div className='movie__details'>
        <div className='movie__details__content'>
          <img className='movie__details__poster' src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`} alt={props.movie.title} />
         <div className='movie__details__container'>
         <h2 className='movie__title'>{props.movie.title}</h2>
          <p className='movie__text'>{props.movie.original_title}</p>
          <div className='movie__details__info-container'>
            <p className='movie__details__classification'>{props.movie.adult ? "NC-17" : "G"}</p>
            <p className='movie__details__runtime'>{props.movie.runtime} min</p>
            <p className='movie__details__genres'>
              {
                props.movie.genres.map(genre => (<span key={genre.id}> {genre.name} </span>))
              }
            </p>
         </div>
          </div>
        </div>
        <div>
          <h3 className='movie__subtitle'>Trailer</h3>
          <iframe

            className='movie__details__trailer'
            src={`https://www.youtube.com/embed/${props.trailer.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
          <h3 className='movie__subtitle'>Sinopsis</h3>
          <p className='movie__details__overview'>{props.movie.overview}</p>
        </div>
      </div>
      <hr className='movie__separation-line' />
      <div className='movie__schedule'>
        <h2>Horarios disponibles: 14 Ago 2023</h2>
        <p className='movie__text'>Elige el horario que prefieras</p>
        <h3>Molinos</h3>
        <p className='movie__schedule__items'>
          <span className='movie__schedule__item'>18:00</span>
          <span className='movie__schedule__item'>19:30</span>
          <span className='movie__schedule__item'>21:05</span>
        </p>
        <button className='movie__schedule__button' onClick={handleClick}>Seleccionar Boletos</button>
      </div>
    </div>
  )
}

export default MovieSchedule