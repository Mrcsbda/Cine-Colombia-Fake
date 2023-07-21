import React from 'react'
import "./movieSchedule.scss"

const MovieSchedule = ({ movie, trailer }) => {
  return (
    <section>
      <div>
        <div>
          <img className="trailer" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
        </div>
        <h4>Trailer</h4>
        <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
      </div>
      <div></div>
    </section>
  )
}

export default MovieSchedule