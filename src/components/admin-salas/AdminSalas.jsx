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
      getMovieSchedulesByDate(cinema?.cinema_shows?.schedules);
    }else if (cinema?.cinema_shows?.schedules && foundSchedule){
        setFoundSchedule(foundSchedule);
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
    Swal.fire("Sala editada", "", "success");
    setEditMode(false);
    setEditedSalaName(newShow.hall);
  };

  const handleSaveClickTime = (e, index) => {
    e.preventDefault();
    const timestamp = hoursMinutesToTimestamp(editedTime, date);
    console.log(editedTime);
    handleEditSchedule(index, cinema, timestamp);
    setEditingTimeIndex(-1);
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
    Swal.fire("Función editada", "", "success");
    setFoundSchedule(editedSchedule);
  };
  
  const hoursMinutesToTimestamp = (hoursMinutes, dateStr) => {
    console.log(dateStr);
    const dateObj = new Date(dateStr);
    const [hours, minutes] = hoursMinutes.split(':');
    dateObj.setHours(Number(hours));
    dateObj.setMinutes(Number(minutes));
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    return dateObj.getTime();
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
