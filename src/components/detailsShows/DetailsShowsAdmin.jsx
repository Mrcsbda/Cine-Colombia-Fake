import React, { useEffect, useState } from "react";
import "./detailsShows.scss";
import ScheduleAdmin from "../scheduleAdmin/ScheduleAdmin";
import arrow from "/images/arrow-down.svg"
import useScreenSize from "../../hooks/useScreenSize";

const DetailsShowsAdmin = ({movie, cinema, infoShow}) => {
  const {width} = useScreenSize()
  const [openDetails, setOpenDetails] = useState()

  useEffect(() => {
    if (width > 900) {
      setOpenDetails(true)
    }
    else {
      setOpenDetails(false)
    }
  }, [width])

  const handleClick = () => {
    if (width <= 900) {
      setOpenDetails(!openDetails)
    }
  }
    
  return (
    
    <article className="main-admin--second-section">
        {movie?.title && (
          <>
          <span className="long-info--button" onClick={handleClick}>Información detallada
          <img src={arrow} alt="Icon for arrow down" />
          </span>
          { openDetails &&
        <div className="movie-long-info">
            <p>{movie.overview}</p>
            <span>Titulo Original</span>
            <p>{movie.original_title}</p>
            <span>Pais de origen</span>
            <p>{movie.production_countries[0].name}</p>
            {/* <span>Director</span>
            <p>James Gunn</p>
            <span>Actores</span>
            <p>
              Chris Pratt, Zoe Saldaña, Dave Bautista, Karen Gillan, Pom
              Klementieff, Vin Diesel, Bradley Cooper, Sean Gunn and Chukwudi Iwuji
            </p> */}
            <span>Lenguaje</span>
            <p>{movie.original_language === "en" ? "Inglés" : "Español"}</p>
        </div>}
        </>
        )}
        <ScheduleAdmin cinema={cinema} infoShow={infoShow}/>
    </article>
    
  );
};

export default DetailsShowsAdmin;
