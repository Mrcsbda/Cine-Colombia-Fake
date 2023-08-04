import React, { useContext, useEffect, useState } from 'react'
import "./movieSchedule.scss"
import { AppContext } from '../../routes/Router'
import { printDate } from '../../utils/getDate'

const MovieSchedule = ({ props: { movie, cinema, schedule, trailer, setStep, step } }) => {

  const { setIsBuying, date, setCheckoutBuilderState, checkoutBuilderState } = useContext(AppContext)

  const handleClick = () => {
    if (checkoutBuilderState.schedule) {
      setIsBuying(true)
      setStep(step + 1)
    }
  }

  const selectSchedule = (schedule) => {
    const updatedBuilder = checkoutBuilderState.setSchedule(schedule);
    setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilder));
  }

  return (
    <div className='movie'>
      <div className='movie__details'>
        <div className='movie__details__content'>
          <img className='movie__details__poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
          <div className='movie__details__container'>
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
        </div>
        <div>
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
      </div>
      <hr className='movie__separation-line' />
      {
        date ? (
          <div className='movie__schedule'>
            <h2>Horarios disponibles: {schedule.length ? printDate(schedule[0], "day") : "No hay funciones para esa fecha"}</h2>
            {
              schedule.length >= 1 && (
                <>
                  <p className='movie__text'>Elige el horario que prefieras</p>
                  <h3>{cinema ? cinema : "No hay funciones para el cinema seleccionado"}</h3>
                  {
                    cinema !== "Selecciona un cinema" && cinema && (
                      <>
                        <p className='movie__schedule__items'>
                          {
                            schedule.map((schedule, index) => (
                              <span
                                className={`movie__schedule__item ${schedule === checkoutBuilderState.schedule
                                  ? "schedule-selected"
                                  : ""}`}
                                key={index + 1}
                                onClick={() => selectSchedule(schedule)}
                              >
                                {printDate(schedule, "hour")}
                              </span>
                            ))
                          }
                        </p>
                        <button
                          className={`movie__schedule__button ${checkoutBuilderState.schedule ? "available" : ""}`}
                          onClick={handleClick}
                        >Seleccionar Boletos</button>
                      </>
                    )
                  }
                </>
              )
            }

          </div>
        ) : (
          <div className='movie__schedule'>
            <h2>Debes elegir una fecha</h2>
          </div>
        )
      }
    </div>
  )
}

export default MovieSchedule