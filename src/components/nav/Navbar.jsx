import React, {useContext, useState} from 'react'
import Genres from '../genres/Genres'
import logoCine from "/images/logoCine.jpg"
import settings from "/images/settings.svg"
import adminProfile from "/images/profile.svg"
import "./navbar.scss"
import LoginForm from '../loginForm/LoginForm'
import NavbarChoice from '../nav-choice/NavbarChoice'
import { AppContext } from '../../routes/Router'

const Navbar = ({isCheckout}) => {
    const {admin} = useContext(AppContext)
    const [showForm, setShowForm] = useState(false)
    const genres = ["Acción", "Terror", "Ciencia Ficción", "Comedia"]
  return (
    <nav className='header--navbar'>
        <div className='navbar--logo'>
            <img src={logoCine} alt="Logo Cine Colombia" />
            <p>cine colombia</p>
        </div>
        <div  className={isCheckout ? 'hidden' : 'nav-genres-container' }>
            <Genres genres={genres}/>
        </div>
        {!admin?.adminName ? 
        <>
        <div className='navbar--user'>
            <div className='nav--choice-container'>
                <NavbarChoice/>
            </div>
            
            <figure className='admin-enter' onClick={() => setShowForm(true)}>
                <img src={adminProfile} alt="Icon for admin profile" />
            </figure>
        </div>
        <LoginForm showForm={showForm} setShowForm={setShowForm}/>
        </> : 
        <div className='admin-info'>
            <img className='admin-pic' src={admin.image} alt={admin.adminName} />
            <div>
                <h3>{admin.adminName}</h3>
                <p>View profile</p>
            </div>
            <img className='logout' src={settings} alt="Icon for settings" />
        </div>
        }
    </nav>
  )
}

export default Navbar