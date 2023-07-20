import React from "react";
import "./movieDetails.scss"

const MovieDetailsAdmin = () => {
  return (
    <>
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
      <div className="movie-long-info">
        <p>
          La querida banda de los Guardianes se instala en Knowhere. Pero sus
          vidas no tardan en verse alteradas por los ecos del turbulento pasado
          de Rocket. Peter Quill, aún conmocionado por la pérdida de Gamora,
          debe reunir a su equipo en una peligrosa misión para salvar la vida de
          Rocket, una misión que, si no se completa con éxito, podría muy
          posiblemente conducir al final de los Guardianes tal y como los
          conocemos
        </p>
        <span>Titulo Original</span>
        <p>Guardians of the Galaxy Vol. 3</p>
        <span>Pais de origen</span>
        <p>Estados Unidos</p>
        <span>Director</span>
        <p>James Gunn</p>
        <span>Actores</span>
        <p>
          Chris Pratt, Zoe Saldaña, Dave Bautista, Karen Gillan, Pom
          Klementieff, Vin Diesel, Bradley Cooper, Sean Gunn and Chukwudi Iwuji
        </p>
        <span>Lenguaje</span>
        <p>Inglés</p>
      </div>
    </>
  );
};

export default MovieDetailsAdmin;
