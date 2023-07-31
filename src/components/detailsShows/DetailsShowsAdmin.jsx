import React, { useState } from "react";
import "./detailsShows.scss";
import ScheduleAdmin from "../scheduleAdmin/ScheduleAdmin";

const DetailsShowsAdmin = ({movie, cinema}) => {
    
  return (
    
    <article className="main-admin--second-section">
        {movie?.title && (
        <div className="movie-long-info">
            <p>{movie.overview}</p>
            <span>Titulo Original</span>
            <p>{movie.original_title}</p>
            <span>Pais de origen</span>
            <p>{movie.production_countries[0].name}</p>
            <span>Director</span>
            <p>James Gunn</p>
            <span>Actores</span>
            <p>
              Chris Pratt, Zoe Saldaña, Dave Bautista, Karen Gillan, Pom
              Klementieff, Vin Diesel, Bradley Cooper, Sean Gunn and Chukwudi Iwuji
            </p>
            <span>Lenguaje</span>
            <p>{movie.original_language === "en" ? "Inglés" : "Español"}</p>
        </div>)}
        <ScheduleAdmin cinema={cinema}/>
    </article>
    
  );
};

export default DetailsShowsAdmin;
