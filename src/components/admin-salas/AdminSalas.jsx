import React, { useContext, useEffect, useState } from "react";
import deleteEl from "/images/delete.svg";
import edit from "/images/edit-circle.svg";
import save from "/images/save.svg";
import plus from "/images/plus.svg";
import { AppContext } from "../../routes/Router";
import { printDate } from "../../utils/getDate";
import { endpoints } from "../../services/data";
import Swal from "sweetalert2";
import { editElement } from "../../services/cinemasAndShows";

const AdminSalas = ({
  cinemaShows,
  idCinema,
  handleDeleteShow,
  handleDeleteSchedule,
  getMovieSchedulesByDate,
  date,
  expandedCinemaId,
}) => {
  const cinema = cinemaShows.find((item) => item.id == idCinema) || null;
  const { setNewShow, schedule, foundSchedule, setFoundSchedule } =
    useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [editedSalaName, setEditedSalaName] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editingTimeIndex, setEditingTimeIndex] = useState(-1);
  
  useEffect(() => {
    if (cinema?.cinema_shows?.schedules && !foundSchedule) {
      setFoundSchedule(cinema?.cinema_shows?.schedules);
      console.log(foundSchedule);
      getMovieSchedulesByDate(cinema?.cinema_shows?.schedules);
    }else if (cinema?.cinema_shows?.schedules && foundSchedule){
        setFoundSchedule(foundSchedule);
        console.log(foundSchedule);
      getMovieSchedulesByDate(foundSchedule);
    }
  }, [foundSchedule, date, editedSalaName]);

  const handleEditClickSala = () => {
    setEditMode(true);
    setEditedSalaName(cinema?.cinema_shows?.hall);
  };

  const handleEditClickTime = (index, time) => {
    setEditingTimeIndex(index)
    setEditedTime(printDate(time, "hour"));
  };

  const handleEditSala = async () => {
    const url = `${endpoints.urlCinemaShows}/${cinema.cinema_shows.id}`;
    const newShow = {
      hall: editedSalaName,
    };
    const response = await editElement(url, newShow);
    console.log(response);
        if (response) {
            Swal.fire("Sala editada", "", "success");
            setEditMode(false);
            setEditedSalaName(newShow.hall);
        }else {
            Swal.fire('Error', `Hubo un problema al editar la sala`, 'error')
    }
  };

  const handleSaveClickTime = async (e, index) => {
    e.preventDefault();
    const timestamp = hoursMinutesToTimestamp(editedTime, date);
    console.log(editedTime);
    const foundIndex = foundSchedule.findIndex(time => time === schedule[index]);
  if (foundIndex !== -1) {
    await handleEditSchedule(foundIndex, cinema, timestamp);
    setEditingTimeIndex(-1);
  }
  };

  const handleEditSchedule = async (index, cinema, newValue) => {
  
    const editedSchedule = [...foundSchedule];
    console.log( editedSchedule[index], newValue);
    editedSchedule[index] = newValue;
    
  
    const url = `${endpoints.urlCinemaShows}/${cinema.cinema_shows.id}`;
    const newShow = {
      schedules: editedSchedule,
    };
  
    const response = await editElement(url, newShow);
  
    console.log(response);
        if (response) {
            Swal.fire("Función editada", "", "success");
            setFoundSchedule(editedSchedule);
        }else {
            Swal.fire('Error', `Hubo un problema al editar la función`, 'error')
    }
  };
  
  const hoursMinutesToTimestamp = (hoursMinutes, dateStr) => {
    console.log(dateStr, hoursMinutes);
    const [year, month, day] = dateStr.split('-')
    const [hours, minutes] = hoursMinutes.split(':');
    const dateObj = new Date().setFullYear(+year, (+month - 1), +day);
  const dateObjWithHours = new Date(dateObj).setHours(+hours, +minutes, 0, 0)
  return dateObjWithHours;
  };

  return (
    <>
      {cinema ? (
        <div
          className={
            idCinema == expandedCinemaId ? "salas" : "salas inactive-details"
          }
        >
          <div>
            <div className="name-sala">
              {editMode ? (
                <input
                  type="text"
                  value={editedSalaName}
                  onChange={(e) => setEditedSalaName(e.target.value)}
                />
              ) : (
                <p className="name-sala-text">
                  Sala {editedSalaName ? editedSalaName : cinema?.cinema_shows?.hall}
                </p>
              )}
              <div className="actions-sala">
                {editMode ? (
                  <img
                    src={save}
                    alt="Icon for save"
                    onClick={handleEditSala}
                  />
                ) : (
                  <img
                    src={edit}
                    alt="Icon for edit"
                    onClick={handleEditClickSala}
                  />
                )}
                <img
                  src={deleteEl}
                  alt="Icon for delete"
                  onClick={() => handleDeleteShow(cinema.cinema_shows.id)}
                />
              </div>
            </div>

            <div className="show-time">
              {schedule &&
                schedule.map((time, index) => (
                  <span key={index}>
                    {editingTimeIndex === index ? (
                        <form onSubmit={(e) => handleSaveClickTime(e, index)}>
                            <input
                        type="text"
                        value={editedTime}
                        onChange={(e) => setEditedTime(e.target.value)}
                      />
                      <button type="submit">
                        <img
                          src={save}
                          alt="Icon for save"
                        />
                      </button>
                        </form>
                      
                    ) : (
                      <>{printDate(time, "hour")}</>
                    )}
                    <div className="actions">
                      {editingTimeIndex === index ? (
                        <></>
                      ) : (
                        <img
                          src={edit}
                          alt="Icon for edit"
                          onClick={() => handleEditClickTime(index, time)}
                        />
                      )}
                      <img
                        src={deleteEl}
                        alt="Icon for delete"
                        onClick={() => handleDeleteSchedule(time, cinema)}
                      />
                    </div>
                  </span>
                ))}
            </div>
          </div>
          <button onClick={() => setNewShow(cinema)}>
            Nueva función
            <img src={plus} alt="Icon for add" />
          </button>
        </div>
      ) : (
        <div
          className={
            idCinema == expandedCinemaId ? "salas" : "salas inactive-details"
          }
        >
          <h3>No hay funciones para este cinema</h3>
          <button onClick={() => setNewShow(idCinema)}>
            Nueva función
            <img src={plus} alt="Icon for add" />
          </button>
        </div>
      )}
    </>
  );
};

export default AdminSalas;
