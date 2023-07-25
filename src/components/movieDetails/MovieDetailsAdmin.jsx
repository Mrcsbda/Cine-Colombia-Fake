import React from "react";
import "./movieDetails.scss"

const MovieDetailsAdmin = ({movie, trailer}) => {
  return (
    <>
    {movie?.title && (
      <article className="movie-short-info">
        <figure className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </figure>
        <div className="movie-short-info-text">
          <h2>{movie.title}</h2>
          <p>Titulo en ingles: {movie.original_title}</p>
          <p>Estreno: {movie.release_date}</p>
          <p>{movie.genres.map(genre => (<span key={genre.id}> {genre.name} </span>))}</p>
          <span className="span-info">{ movie.adult ? "Recomendada para Mayores de 18 años" : "Para todo el público"}</span>
          <span className="span-info">{movie.runtime} min</span>
        </div>
        <iframe
            className='trailer'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
        </iframe>
      </article>
      )}</>
  );
};

export default MovieDetailsAdmin;
