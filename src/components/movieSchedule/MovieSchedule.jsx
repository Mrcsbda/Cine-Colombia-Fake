import React, { useContext, useEffect, useState } from 'react'
import "./movieSchedule.scss"
import { AppContext } from '../../routes/Router'
import { printDate } from '../../utils/getDate'

const MovieSchedule = ({ props }) => {

  const { setIsBuying, date, setCheckBuilderState, checkoutBuilderState } = useContext(AppContext)
  const [scheduleSelected, setScheduleSelected] = useState("")

  const handleClick = () => {
    if (scheduleSelected) {
      setIsBuying(true)
      props.setStep(props.step + 1)
    }
  }

  const selectSchedule = (schedule) => {
    setCheckBuilderState(checkoutBuilderState.setSchedule(schedule))
    setScheduleSelected(schedule)
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
      {
        date ? (
          <div className='movie__schedule'>
            <h2>Horarios disponibles: {props.schedule.length ? printDate(props.schedule[0], "day") : "No hay funciones para esa fecha"}</h2>
            {
              props.schedule.length >= 1 && (
                <>
                  <p className='movie__text'>Elige el horario que prefieras</p>
                  <h3>{props.cinema ? props.cinema : (props.cinema ? props.cinema : "No hay funciones para el cinema seleccionado")}</h3>
                  {
                    props.cinema !== "Selecciona un cinema" && props.cinema && (
                      <>
                        <p className='movie__schedule__items'>
                          {
                            props.schedule.map((schedule, index) => (
                              <span
                                className={`movie__schedule__item ${schedule === scheduleSelected
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
                          className={`movie__schedule__button ${scheduleSelected ? "available" : ""}`}
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