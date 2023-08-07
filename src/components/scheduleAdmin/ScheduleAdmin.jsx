import React, { useContext, useEffect, useState } from "react";
import arrowDown from "/images/arrow-down.svg";
import calendar from "/images/calendar.svg";
import points from "/images/three-point.svg";
import plus from "/images/plus.svg";
import "./schedule.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../../routes/Router";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { endpoints } from "../../services/data";
import { deleteElement, editElement } from "../../services/cinemasAndShows";
import { getCinemaShowsByMovie, getCinemas } from "../../services/cinemasServices";
import AdminSalas from "../admin-salas/AdminSalas";

const ScheduleAdmin = ({ infoShow }) => {
  const [cinemas, setCinemas] = useState([]);
  const [cinemaShows, setCinemaShows] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("2023-08-14");
  const [value, setValue] = useState(new Date());
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [expandedCinemaId, setExpandedCinemaId] = useState(null);
  const {
    setFoundSchedule,
    foundSchedule,
    setNewMultiplex,
    setSchedule,
  } = useContext(AppContext);
  const { idMovie } = useParams();

  const handleDeleteShow = (id) => {
    Swal.fire({
      title: "Eliminar una función",
      text: "¿Estás segure de que quieres eliminar la función?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // const url = `${endpoints.urlCinemaShows}/?movie=${idMovie}&&cinemaId=${infoShow.cinemaId}&&hall=${infoShow.hall}`
        const url = `${endpoints.urlCinemaShows}`;
        deleteElement(url, id);
        Swal.fire("Función eliminada", "", "success");
        setFoundSchedule([]);
      }
    });
  };

  const handleDeleteSchedule = (time, cine) => {
    Swal.fire({
      title: "Eliminar una función",
      text: "¿Estás segure de que quieres eliminar la función?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(time, cine);
        deleteSchedule(time, cine)
      }
    });
  };

  const deleteSchedule = async (time, cine) => {
    const newSchedule = foundSchedule.filter(
        (timeStamp) => timeStamp !== time
      );
      const url = `${endpoints.urlCinemaShows}/${cine.cinema_shows.id}`;
      const newShow = {
        schedules: newSchedule
      };
      const response = await editElement(url, newShow);
      console.log(response);
      Swal.fire("Función eliminada", "", "success");
      setFoundSchedule(newSchedule)
  }

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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getCinemas()
      .then((response) => setCinemas(response))
      .catch((error) => console.log(error));

    getCinemaShowsByMovie(idMovie)
      .then((response) => {
        setCinemaShows(response)
      })
      .catch((error) => console.log(error));
  }, []);


  const getMovieSchedulesByDate = (schedules) => {
    if (typeof date === "string") {
      const [year, month, day] = date.split("-");
      const dateInMiliseconds = new Date(year, month - 1, day).setHours(
        0,
        0,
        0,
        0
      );
      const limitDateInMiliseconds = new Date(dateInMiliseconds).setHours(
        23,
        59,
        59,
        999999
      );
      const cinemaShowSchedule = schedules.filter(
        (item) => item >= dateInMiliseconds && item <= limitDateInMiliseconds
      );
      setSchedule(cinemaShowSchedule);
    }
  };

  const dates = [
    {
      day: 14,
      dayOfWeek: "Lun",
      dateInfo: "2023-08-14",
    },
    {
      day: 15,
      dayOfWeek: "Mar",
      dateInfo: "2023-08-15",
    },
    {
      day: 16,
      dayOfWeek: "Mie",
      dateInfo: "2023-08-16",
    },
    {
      day: 17,
      dayOfWeek: "Jue",
      dateInfo: "2023-08-17",
    },
    {
      day: 18,
      dayOfWeek: "Vie",
      dateInfo: "2023-08-18",
    },
  ];

  const toggleCinemaExpansion = (cinemaId) => {
    if (expandedCinemaId === cinemaId) {
      setExpandedCinemaId(null);
    } else {
      setExpandedCinemaId(cinemaId);
    }
  };


  return (
    <div className="schedules-cinemas">
      <div className="schedule">
        <p className="schedule--title">Agosto</p>
        <div className="schedule--dates">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`date-box ${
                selectedDateIndex === index ? "selected" : ""
              }`}
              onClick={() => handleDateBoxClick(index, date.dateInfo)}
            >
              <span>{date.day}</span>
              <p>{date.dayOfWeek}</p>
            </div>
          ))}
          <div className="points">
            <img src={points} alt="Icon for three points" />
          </div>
          <div
            className="date-box calendar"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <img src={calendar} alt="Icon for calendar" />
          </div>
        </div>
        <div
          className={
            showCalendar
              ? "opening-calendar"
              : "opening-calendar inactive-calendar"
          }
        >
          <Calendar
            onChange={handleDate}
            value={value}
            activeStartDate={new Date(2023, 7, 14)}
            minDate={new Date(2023, 7, 14)}
          />
        </div>
      </div>
      <div className="shows-container">
        <div className="show">
          <div className="show-title">
            <p>Funciones por multiplex</p>
            <button onClick={() => setNewMultiplex(true)}>
              Nuevo Multiplex
              <img src={plus} alt="Icon for add" />
            </button>
          </div>
        </div>
        {cinemas &&
          cinemas.map((cine, index) => (
            <>
              <div className="show show-cinema" key={index}>
                <p>{cine.name}</p>
                <span onClick={() => toggleCinemaExpansion(cine.id)}>
                  <img src={arrowDown} alt="Icon for arrow" />
                </span>
              </div>
              <AdminSalas cinemaShows={cinemaShows} idCinema={cine.id} handleDeleteShow={handleDeleteShow} handleDeleteSchedule={handleDeleteSchedule} getMovieSchedulesByDate={getMovieSchedulesByDate} date={date}
              expandedCinemaId={expandedCinemaId}/>
            </>
          ))}
      </div>
    </div>
  );
};

export default ScheduleAdmin;
