import React, {useState} from "react";
import arrowDown from "/images/arrow-down.svg";
import calendar from "/images/calendar.svg";
import points from "/images/three-point.svg";
import plus from "/images/plus.svg";
import deleteEl from "/images/delete.svg";
import edit from "/images/edit-circle.svg";
import "./detailsShows.scss";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DetailsShowsAdmin = ({movie}) => {
    const [showActions, setShowActions] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [value, onChange] = useState(new Date());
    const [showSalas, setShowSalas] = useState(false)
    const dates = [
        {
            day: 14,
            dayOfWeek: "Lun"
        },
        {
            day: 15,
            dayOfWeek: "Mar"
        },
        {
            day: 16,
            dayOfWeek: "Mie"
        },
        {
            day: 17,
            dayOfWeek: "Jue"
        },
        {
            day: 18,
            dayOfWeek: "Vie"
        }
    ]
    const showTime = ['13:00', '16:00']
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
        <div className="schedules-cinemas">
            <div className="schedule">
                <p className="schedule--title">Agosto</p>
                <div className="schedule--dates">
                    {dates.map((date, index) => (
                        <div key={index} className="date-box">
                            <span>{date.day}</span>
                            <p>{date.dayOfWeek}</p>
                        </div>
                    ))}
                    <div className="points">
                        <img src={points} alt="Icon for three points" />
                    </div>
                    <div className="date-box calendar" onClick={() => setShowCalendar(!showCalendar)}>
                        <img src={calendar} alt="Icon for calendar" />
                    </div>
                    
                </div>
                <div className={showCalendar? "opening-calendar" : "opening-calendar inactive-calendar"}>
                    <Calendar onChange={onChange} value={value} />
                </div>
            </div>
            <div className="shows-container">
                <div className="show">
                    <div className="show-title">
                        <p>Funciones por multiplex</p>
                        <button>
                            Nuevo Multiplex
                            <img src={plus} alt="Icon for add" />
                        </button>
                    </div>
                    <div className="show-cinema">
                        <p>Los Molinos</p>
                        <span onClick={() => setShowSalas(!showSalas)}>
                            <img src={arrowDown} alt="Icon for arrow" />
                        </span>
                    </div>
                </div>
                <div className={showSalas ? "salas" : "salas inactive-details"}>
                    <div>
                        <div className="name-sala">
                            <p className="name-sala-text">Sala 1</p>
                            <div className="actions-sala">
                                <img src={edit} alt="Icon for edit" />
                                <img src={deleteEl} alt="Icon for delete" />
                            </div>
                        </div>
                        
                        <div className="show-time">
                            {showTime.map((time, index) => (
                                <span key={index}>{time}
                                    <div className="actions">
                                        <img src={edit} alt="Icon for edit" />
                                        <img src={deleteEl} alt="Icon for delete" />
                                    </div>
                                    
                                </span>
                            ))}
                        </div>
                        
                    </div>
                    <button>Nueva función
                        <img src={plus} alt="Icon for add" />
                    </button>
                </div>
                <div className="show show-cinema">
                    <p>Santa Fe</p>
                    <span>
                        <img src={arrowDown} alt="Icon for arrow" />
                    </span>
                </div>
            </div>
        </div>
    </article>
    
  );
};

export default DetailsShowsAdmin;
