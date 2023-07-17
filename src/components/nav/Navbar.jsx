import React from 'react'
import Genres from '../genres/Genres'
import logoCine from "../../assets/logoCine.jpg"
import adminProfile from "../../assets/profile.svg"
import "./navbar.scss"

const Navbar = () => {
    const genres = ["Acción", "Terror", "Ciencia Ficción", "Comedia"]
  return (
    <nav className='header--navbar'>
        <div className='navbar--logo'>
            <img src={logoCine} alt="Logo Cine Colombia" />
            <p>cine colombia</p>
        </div>
        <Genres genres={genres}/>
        <div className='navbar--user'>
            <div className='navbar-choice'>
                <p>Cines cercanos</p>
                <select name="cines" id="cines">
                    <option value="Los Molinos">Los Molinos</option>
                    <option value="Santa Fe">Santa Fe</option>
                </select>
            </div>
            <div className='navbar-choice'>
                <p>Fecha</p>
                <input type="date" name="" id="" value="2023-08-14" min="2023-08-14"/>
            </div>
            <figure className='admin-enter'>
                <img src={adminProfile} alt="Icon for admin profile" />
            </figure>
        </div>
    </nav>
  )
}

export default Navbar