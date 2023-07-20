import React from 'react'
import Genres from '../genres/Genres'
import logoCine from "../../assets/logoCine.jpg"
import adminProfile from "../../assets/profile.svg"
import "./navbar.scss"
import LoginForm from '../loginForm/LoginForm'
import NavbarChoice from '../nav-choice/NavbarChoice'

const Navbar = () => {
    const genres = ["Acción", "Terror", "Ciencia Ficción", "Comedia"]
  return (
    <nav className='header--navbar'>
        <div className='navbar--logo'>
            <img src={logoCine} alt="Logo Cine Colombia" />
            <p>cine colombia</p>
        </div>
        <div className='nav-genres-container'>
            <Genres genres={genres}/>
        </div>
        
        <div className='navbar--user'>
            <div className='nav--choice-container'>
                <NavbarChoice/>
            </div>
            
            <figure className='admin-enter'>
                <img src={adminProfile} alt="Icon for admin profile" />
            </figure>
        </div>
        <LoginForm/>
    </nav>
  )
}

export default Navbar