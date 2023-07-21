import React, {useState} from "react";
import arrowDown from "../../assets/arrow-down.svg";
import calendar from "../../assets/calendar.svg"
import points from "../../assets/three-point.svg"
import plus from "../../assets/plus.svg"
import "./detailsShows.scss"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DetailsShowsAdmin = () => {
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
  return (
    <article className="main-admin--second-section">
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
                        <p>Sala 1</p>
                        <div className="show-time">
                            <span>13:00</span>
                            <span>16:00</span>
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
