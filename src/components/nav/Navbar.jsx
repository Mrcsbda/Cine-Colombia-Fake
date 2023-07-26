import React, { useContext, useState } from 'react'
import Genres from '../genres/Genres'
import logoCine from "../../assets/logoCine.jpg"
import adminProfile from "../../assets/profile.svg"
import "./navbar.scss"
import LoginForm from '../loginForm/LoginForm'
import NavbarChoice from '../nav-choice/NavbarChoice'
import { AppContext } from '../../routes/Router'

const Navbar = ({ genres }) => {
    const [showForm, setShowForm] = useState(false)
    const { isCheckout } = useContext(AppContext)

    return (
        <nav className='header--navbar'>
            <div className='navbar--logo'>
                <img src={logoCine} alt="Logo Cine Colombia" />
                <p>cine colombia</p>
            </div>
            <div className={isCheckout ? 'hidden' : 'nav-genres-container'}>
                <Genres genres={genres} />
            </div>

            <div className='navbar--user'>
                <div className='nav--choice-container'>
                    <NavbarChoice />
                </div>

                <figure className='admin-enter' onClick={() => setShowForm(true)}>
                    <img src={adminProfile} alt="Icon for admin profile" />
                </figure>
            </div>
            <LoginForm showForm={showForm} setShowForm={setShowForm} />
        </nav>
    )
}

export default Navbar