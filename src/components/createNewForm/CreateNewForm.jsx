import React, { useContext } from 'react'
import close from "/images/close.svg"
import "./create.scss"
import useForm from '../../hooks/UseForm'
import { AppContext } from '../../routes/Router'
import { endpoints } from '../../services/data'
import { postElement } from '../../services/cinemasAndShows'
import Swal from 'sweetalert2'

const CreateNewForm = ({props, infoShow}) => {
    const label1 = props.label1
    const label2 = props.label2
    const {setNewMultiplex, setNewShow, schedule, setSchedule} = useContext(AppContext)

    const handleClick = () => {
        if (props.toCreate === "nuevo Multiplex") {
            setNewMultiplex(false)
        }else if (props.toCreate === "nueva función") {
            setNewShow(false)
        }
    }

    const [dataForm, handleChange, resetForm ] = useForm({
        label1:'',
        label2:''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.toCreate === "nuevo Multiplex") {
            const url = endpoints.urlTeatros
            const newEl = {
                name: dataForm.label1,
                halls: [dataForm.label2]
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

            }else {
                
            }
        }
    }

  return (
    <div className='new-form--container'>
        <form className='new-form'>
            <figure className='form-close' onClick={handleClick}>
                <img src={close} alt="Icon for close" />
            </figure>
            <h2>Crear {props.toCreate}</h2>
            <label>{props.label1}</label>
            <input onChange={(e) => handleChange(e)} value={dataForm.label1} type="text" name={label1} placeholder={props.example1}/>
            <label>{props.label2}</label>
            <input onChange={(e) => handleChange(e)} value={dataForm.label2} type="text" name={label2} placeholder={props.example2}/>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default CreateNewForm