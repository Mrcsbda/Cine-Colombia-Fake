import React, { useContext, useEffect } from 'react'
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

    const name1 = props.name1;
    const name2 = props.name2

    const { idMovie } = useParams();
    const {setNewMultiplex, setNewShow, schedule, foundSchedule, setFoundSchedule, newShow, date, setCinemas, cinemas} = useContext(AppContext)

    const handleClick = () => {
        if (props.toCreate === "nuevo Multiplex") {
            setNewMultiplex(false)
        }else if (props.toCreate === "nueva función") {
            setNewShow(false)
        }
    }

    useEffect(()=>{
        console.log("Cinema updated");
    }, [cinemas])

    const [dataNewForm, handleChange, resetForm] = useForm({});

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(dataNewForm);
        if (props.toCreate === "nuevo Multiplex") {
            console.log(props.toCreate);
            const url = endpoints.urlTeatros
            const newEl = {
                name: dataNewForm[name1],
                halls: [dataNewForm[name2]]
            }
            console.log(newEl);
            const response = await postElement(url, newEl);
                if (response) {
                    Swal.fire('Multiplex creado', `Nuevo multiplex fue creado con exito`, 'success')
                    
                    const updatedCinemas = [...cinemas, newEl];
                    setCinemas(updatedCinemas)
                    setNewMultiplex(false)
                }else {
                    Swal.fire('Error', `Hubo un problema al crear el multiplex`, 'error')
            }
        } else if (props.toCreate === "nueva función") {
            console.log(props.toCreate);
            if (schedule) {
                const newSchedule = hoursMinutesToTimestamp(dataNewForm[name2], date);
                const updatedSchedule = [...foundSchedule, newSchedule];
                  console.log(newSchedule);
                  
                  const newShowTime = {
                    hall: dataNewForm[name1],
                    schedules: updatedSchedule,
                  };
                const url = `${endpoints.urlCinemaShows}/${newShow.cinema_shows.id}`;
                console.log(url);
                  const response = await editElement(url, newShowTime);
                    if (response) {
                        Swal.fire('Función creada', `Nueva función fue creada con exito`, 'success')
                        setNewShow(false)
                        setFoundSchedule(updatedSchedule)
                    }else {
                        Swal.fire('Error', `Hubo un problema al crear la función`, 'error')
                }
            }else {
                const newSchedule = hoursMinutesToTimestamp(dataNewForm[name2], date)
                const newShowTime = {
                    cinemaId: newShow,
                    hall: dataNewForm[name1],
                    schedules: newSchedule,
                    movie: idMovie,
                  };
                  const url = `${endpoints.urlCinemaShows}`;
                  const response = await postElement(url, newShowTime)
                    if (response) {
                        Swal.fire('Función creada', `Nueva función fue creada con exito`, 'success')
                        setNewShow(false)
                    }else {
                        Swal.fire('Error', `Hubo un problema al crear la función`, 'error')
                }
            }
        }
    }

    const hoursMinutesToTimestamp = (hoursMinutes, dateStr) => {
        console.log(date);
        const [year, month, day] = dateStr.split('-')
        const [hours, minutes] = hoursMinutes.split(':');
        const dateObj = new Date().setFullYear(+year, (+month - 1), +day);
      const dateObjWithHours = new Date(dateObj).setHours(+hours, +minutes, 0, 0)
      return dateObjWithHours;
      };
      

  return (
    <div className='new-form--container'>
        <form className='new-form' onSubmit={(e) => handleSubmit(e)}>
            <figure className='form-close' onClick={handleClick}>
                <img src={close} alt="Icon for close" />
            </figure>
            <h2>Crear {props.toCreate}</h2>
            <label>{label1}</label>
            <input onChange={(e) => handleChange(e)} value={dataNewForm[name1]} type="text" name={name1} placeholder={props.example1}/>
            <label>{label2}</label>
            <input onChange={(e) => handleChange(e)} value={dataNewForm[name2]} type="text" name={name2} placeholder={props.example2}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default CreateNewForm