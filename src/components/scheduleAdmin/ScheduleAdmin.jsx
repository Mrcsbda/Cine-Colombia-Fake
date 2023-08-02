import React, { useContext, useEffect, useState } from 'react'
import arrowDown from "/images/arrow-down.svg";
import calendar from "/images/calendar.svg";
import points from "/images/three-point.svg";
import plus from "/images/plus.svg";
import deleteEl from "/images/delete.svg";
import edit from "/images/edit-circle.svg";
import "./schedule.scss"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AppContext } from '../../routes/Router';
import { string } from 'prop-types';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import { endpoints } from '../../services/data';
import { deleteElement, editElement } from '../../services/cinemasAndShows';

const ScheduleAdmin = ({cinema, infoShow}) => {
    const [schedule, setSchedule] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [showSalas, setShowSalas] = useState(false)
    const [showSalas2, setShowSalas2] = useState(false)
    const [date, setDate] = useState('2023-08-14')
    const [value, setValue] = useState(new Date())
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const {setFoundSchedule, foundSchedule} = useContext(AppContext)
    const { idMovie } = useParams()

    const handleDeleteShow = () => {
        Swal.fire({
            title: 'Eliminar una función',
            text: '¿Estás segure de que quieres eliminar la función?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
          if (result.isConfirmed) {
            // const url = `${endpoints.urlCinemaShows}/?movie=${idMovie}&&cinemaId=${infoShow.cinemaId}&&hall=${infoShow.hall}`
            const url = `${endpoints.urlCinemaShows}`
            const idToDelete = infoShow.id
            deleteElement(url, idToDelete)
            Swal.fire('Función eliminada', '', 'success')
            setFoundSchedule([])
          }})}


    const handleDeleteSchedule = (time) => {
        Swal.fire({
            title: 'Eliminar una función',
            text: '¿Estás segure de que quieres eliminar la función?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
          if (result.isConfirmed) {
            const newSchedule = foundSchedule.filter((timeStamp) => timeStamp !== time)
            const url = `${endpoints.urlCinemaShows}/?movie=${idMovie}`
            const newShow = {
            id: infoShow.id,
            cinemaId: infoShow.cinemaId,
            hall: infoShow.hall,
            schedules: newSchedule,
            movie: idMovie
            }
            editElement(url, newShow)
            Swal.fire('Función eliminada', '', 'success')
            setFoundSchedule((foundSchedule) => foundSchedule.filter((schedule) => schedule !== time))
          }})}

    const handleDateBoxClick = (index, dateInfo) => {
        setDate(dateInfo);
        setSelectedDateIndex(index);
      };

    const handleDate = (nextDate) => {
        setValue(nextDate);
        const formattedDate = formatDate(nextDate);
        setDate(formattedDate);
      };
    
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    useEffect(() => {
        
        if (foundSchedule) {
            getMovieSchedulesByDate(foundSchedule)
            console.log("Schedule", foundSchedule);
        }
        
        console.log("Cine", cinema);
    }, [foundSchedule, date])


    const getMovieSchedulesByDate = (schedules) => {
        if (typeof date === 'string') {
          const [year, month, day] = date.split("-")
          const dateInMiliseconds = new Date(year,(month-1), day).setHours(0,0,0,0)
          const limitDateInMiliseconds = new Date(dateInMiliseconds).setHours(23,59,59,999999)
          const cinemaShowSchedule = schedules.filter(item => item >= dateInMiliseconds && item <= limitDateInMiliseconds)
          setSchedule(cinemaShowSchedule)
          console.log(cinemaShowSchedule)
        }
      }

    const dates = [
        {
            day: 14,
            dayOfWeek: "Lun",
            dateInfo: "2023-08-14"
        },
        {
            day: 15,
            dayOfWeek: "Mar",
            dateInfo: "2023-08-15"
        },
        {
            day: 16,
            dayOfWeek: "Mie",
            dateInfo: "2023-08-16"
        },
        {
            day: 17,
            dayOfWeek: "Jue",
            dateInfo: "2023-08-17"
        },
        {
            day: 18,
            dayOfWeek: "Vie",
            dateInfo: "2023-08-18"
        }
    ]

    const getDate = (schedule, type) => {
        switch (type) {
          case "day":
            const fecha = new Date(schedule);
            const opciones = { month: 'long', day: 'numeric', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
            return fechaFormateada
          case "hour":
            return `${new Date(schedule).getHours() < 10
              ? `0${new Date(schedule).getHours()}`
              : new Date(schedule).getHours()} : 0${new Date(schedule).getMinutes()}`
          default: return ""
        }
      }

  return (
    <div className="schedules-cinemas">
            <div className="schedule">
                <p className="schedule--title">Agosto</p>
                <div className="schedule--dates">
                    {dates.map((date, index) => (
                        <div key={index} className={`date-box ${selectedDateIndex === index ? 'selected' : ''}`}
                        onClick={() => handleDateBoxClick(index, date.dateInfo)}>
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
                    <Calendar onChange={handleDate} value={value} activeStartDate={new Date(2023, 7, 14)} minDate={new Date(2023, 7, 14)}/>
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
                { cinema &&
                    cinema === "Los Molinos" ? 
                    <div className={showSalas ? "salas" : "salas inactive-details"}>
                    <div>
                        <div className="name-sala">
                            <p className="name-sala-text">Sala {infoShow.hall}</p>
                            <div className="actions-sala">
                                <img src={edit} alt="Icon for edit" />
                                <img src={deleteEl} alt="Icon for delete" onClick={handleDeleteShow}/>
                            </div>
                        </div>
                        
                        <div className="show-time">
                            { schedule &&
                            schedule.map((time, index) => (
                                <span key={index}>{getDate(time, "hour")}
                                    <div className="actions">
                                        <img src={edit} alt="Icon for edit" />
                                        <img src={deleteEl} alt="Icon for delete" onClick={() => handleDeleteSchedule(time)}/>
                                    </div>
                                    
                                </span>
                            ))}
                        </div>
                        
                    </div>
                    <button>Nueva función
                        <img src={plus} alt="Icon for add" />
                    </button>
                </div>  :
                <div className={showSalas ? "salas" : "salas inactive-details"}>
                    <h3>No hay funciones para este cinema</h3>
                <button>Nueva función
                    <img src={plus} alt="Icon for add" />
                </button>
            </div>
                }
                
                <div className="show show-cinema">
                    <p>Santa Fe</p>
                    <span onClick={() => setShowSalas2(!showSalas2)}>
                        <img src={arrowDown} alt="Icon for arrow" />
                    </span>
                </div>
                { cinema &&
                    cinema === "Santa Fe" ? 
                    <div className={showSalas2 ? "salas" : "salas inactive-details"}>
                    <div>
                        <div className="name-sala">
                            <p className="name-sala-text">Sala {infoShow.hall}</p>
                            <div className="actions-sala">
                                <img src={edit} alt="Icon for edit" />
                                <img src={deleteEl} alt="Icon for delete" onClick={handleDeleteShow}/>
                            </div>
                        </div>
                        
                        <div className="show-time">
                            { schedule &&
                            schedule.map((time, index) => (
                                <span key={index}>{getDate(time, "hour")}
                                    <div className="actions">
                                        <img src={edit} alt="Icon for edit" />
                                        <img src={deleteEl} alt="Icon for delete" onClick={() => handleDeleteSchedule(time)}/>
                                    </div>
                                    
                                </span>
                            ))}
                        </div>
                        
                    </div>
                    <button>Nueva función
                        <img src={plus} alt="Icon for add" />
                    </button>
                </div>  :
                <div className={showSalas2 ? "salas" : "salas inactive-details"}>
                    <h3>No hay funciones para este cinema</h3>
                <button>Nueva función
                    <img src={plus} alt="Icon for add" />
                </button>
            </div>
                }
            </div>
        </div>
  )
}

export default ScheduleAdmin