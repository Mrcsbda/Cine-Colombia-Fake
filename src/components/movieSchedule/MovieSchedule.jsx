import React from 'react'
import "./movieSchedule.scss"

const MovieSchedule = ({ movie, trailer }) => {
  return (
    <section className='movie'>
      <div className='movie__details'>
        <div className='movie__details__content'>
          <img className='movie__details__poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
          <h2 className='movie__title'>{movie.title}</h2>
          <p className='movie__text'>{movie.original_title}</p>
          <div className='movie__details__info-container'>
            <p className='movie__details__classification'>{movie.adult ? "NC-17" : "G"}</p>
            <p className='movie__details__runtime'>{movie.runtime} min</p>
            <p className='movie__details__genres'>
              {
                movie.genres.map(genre => (<span key={genre.id}> {genre.name} </span>))
              }
            </p>
          </div>
        </div>
        <h3 className='movie__subtitle'>Trailer</h3>
        <iframe

          className='movie__details__trailer'
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
        <h3 className='movie__subtitle'>Sinopsis</h3>
        <p className='movie__details__overview'>{movie.overview}</p>
      </div>
      <hr className='movie__separation-line'/>
      <div className='movie__schedule'>
        <h2>Horarios disponibles: 14 Ago 2023</h2>
        <p className='movie__text'>Elige el horario que prefieras</p>
        <h3>Molinos</h3>
        <p className='movie__schedule__items'>
          <span className='movie__schedule__item'>18:00</span>
          <span className='movie__schedule__item'>19:30</span>
          <span className='movie__schedule__item'>21:05</span>
        </p>
        <button className='movie__schedule__button'>Seleccionar Boletos</button>
      </div>
    </section>
  )
}

export default MovieSchedule