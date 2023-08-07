import React, { useContext } from 'react'
import close from "/images/close.svg"
import "./create.scss"
import useForm from '../../hooks/UseForm'
import { AppContext } from '../../routes/Router'
import { endpoints } from '../../services/data'
import { editElement, postElement } from '../../services/cinemasAndShows'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

const CreateNewForm = ({props}) => {
    const label1 = props.label1
    const label2 = props.label2
    const { idMovie } = useParams();
    const {setNewMultiplex, setNewShow, schedule, setSchedule, foundSchedule, setFoundSchedule, newShow} = useContext(AppContext)

    const handleClick = () => {
        if (props.toCreate === "nuevo Multiplex") {
            setNewMultiplex(false)
        }else if (props.toCreate === "nueva función") {
            setNewShow(false)
        }
    }

    const [dataNewForm, handleChange, resetForm ] = useForm({
        label1:'',
        label2:''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.toCreate === "nuevo Multiplex") {
            const url = endpoints.urlTeatros
            const newEl = {
                name: dataNewForm.label1,
                halls: [dataNewForm.label2]
            }
            const elToSend = JSON.stringify(newEl)
            const response = postElement(url, elToSend)
            if (response) {
                if (response) {
                    Swal.fire('Multiplex creado', `Nuevo multiplex fue creado con exito`, 'success')
                    setNewMultiplex(false)
                }else {
                    Swal.fire('Error', `Hubo un problema al crear el multiplex`, 'error')
            }}
        }else if (props.toCreate === "nueva función") {
            if (schedule) {
                const newSchedule = foundSchedule.push(
                    convertTimeToTimestamp(dataNewForm.label2)
                  );
                  setFoundSchedule(newSchedule)
                  const newShowTime = {
                    hall: dataNewForm.label1,
                    schedules: newSchedule,
                  };
                  const url = `${endpoints.urlCinemaShows}/${newShow.cinema_shows.id}`;
                  editElement(url, newShowTime);
            }else {
                const newShow = {
                    cinemaId: newShow,
                    hall: dataNewForm.label1,
                    schedules: [dataNewForm.label2],
                    movie: idMovie,
                  };
                  const url = `${endpoints.urlCinemaShows}`;
                  postElement(url, newShow)
            }
        }
    }

    const convertTimeToTimestamp = (userTime) => {
        const [hours, minutes] = userTime.split(":");
        const currentDate = new Date(); 
      
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
      
        return currentDate.getTime(); 
      };
      

  return (
    <div className='new-form--container'>
        <form className='new-form' onSubmit={(e) => handleSubmit(e)}>
            <figure className='form-close' onClick={handleClick}>
                <img src={close} alt="Icon for close" />
            </figure>
            <h2>Crear {props.toCreate}</h2>
            <label>{label1}</label>
            <input onChange={(e) => handleChange(e)} value={dataNewForm.label1} type="text" name={label1} placeholder={props.example1}/>
            <label>{label2}</label>
            <input onChange={(e) => handleChange(e)} value={dataNewForm.label2} type="text" name={label2} placeholder={props.example2}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default CreateNewForm