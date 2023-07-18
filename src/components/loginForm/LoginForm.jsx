import React from 'react'
import "./login.scss"
import close from "../../assets/close.svg"

const LoginForm = () => {
  return (
    <section className='login'>
        <div className='login-container'>
            <figure className='login-close'>
                <img src={close} alt="Icon for close" />
            </figure>
            <h2>Bienvenido</h2>
            <p>Inicia Sesión</p>
            <form>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" name="email" placeholder='example.email@gmail.com'/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" placeholder='Ingresa tu contraseña'/>
                <div className='recordarme'>
                    <input type="checkbox" name="" id="" />
                    <p>Recordarme</p>
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
        
    </section>
    
  )
}

export default LoginForm