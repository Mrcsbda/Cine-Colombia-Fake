import React from "react";
import "./movieDetails.scss"

const MovieDetailsAdmin = () => {
  return (
      <article className="movie-short-info">
        <figure className="movie-poster">
          <img
            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6GkKzdNosVAL7UGgwTtCHSxLQ67.jpg"
            alt=""
          />
        </figure>
        <div className="movie-short-info-text">
          <h2>Guardianes de la Galaxia: Volumen 3</h2>
          <p>Titulo en ingles: Guardians of the Galaxy Vol. 3</p>
          <p>Estreno: Mayo 4 2023</p>
          <p>Ciencia ficción, Aventura, Acción</p>
          <span>Recomendada para Mayores de 12 años</span>
          <span>2h 30m</span>
        </div>
        <video controls>
          <source src="movie.mp4" type="video/mp4"></source>
        </video>
      </article>
  );
};

export default MovieDetailsAdmin;
