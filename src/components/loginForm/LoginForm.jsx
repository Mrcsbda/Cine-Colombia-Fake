import React, { useContext } from 'react'
import "./login.scss"
import close from "/images/close.svg"
import useForm from '../../hooks/UseForm'
import getAdmins from '../../services/adminsServices'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import { AppContext } from '../../routes/Router'

const LoginForm = ({showForm, setShowForm}) => {
    const {isLogin, setIsLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const [dataForm, handleChange, resetForm ] = useForm({
        email:'',
        password:''
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        const admin = await getAdmins(dataForm.email, dataForm.password)
        if (!admin){
            Swal.fire('Error', 'El usuario ingresado no existe.', 'error');
            resetForm()
            return
        }
        Swal.fire('Bienvenide', `Bienvenide ${admin.adminName}`, 'success')
        localStorage.setItem('admin', JSON.stringify(admin));
        setIsLogin(true)
        navigate('administrator');
    }
  return (
    <section className={showForm ? "login" : "login inactive"}>
        <div className='login-container'>
            <figure className='login-close' onClick={() => setShowForm(false)}>
                <img src={close} alt="Icon for close" />
            </figure>
            <h2>Bienvenido</h2>
            <p>Inicia Sesión</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Correo electrónico</label>
                <input onChange={(e) => handleChange(e)} value={dataForm.email} type="email" name="email" placeholder='example@gmail.com'/>
                <label>Contraseña</label>
                <input onChange={(e) => handleChange(e)} value={dataForm.password} type="password" name="password" placeholder='Ingresa tu contraseña'/>
                <div className='recordarme'>
                    <input type="checkbox"/>
                    <p>Recordarme</p>
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>

    </section>

  )
}

export default LoginForm