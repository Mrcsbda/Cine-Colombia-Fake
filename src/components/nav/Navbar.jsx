import React, {useContext, useState} from 'react'
import Genres from '../genres/Genres'
import logoCine from "/images/logoCine.jpg"
import settings from "/images/settings.svg"
import logout from "/images/logout.svg"
import adminProfile from "/images/profile.svg"
import "./navbar.scss"
import LoginForm from '../loginForm/LoginForm'
import NavbarChoice from '../nav-choice/NavbarChoice'
import { AppContext } from '../../routes/Router'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const Navbar = ({isCheckout}) => {
    
    const navigate = useNavigate()
    const {admin, handleLogout} = useContext(AppContext)
    const [showForm, setShowForm] = useState(false)
    const [logOut, setLogOut] = useState(false)
    const genres = ["Acción", "Terror", "Ciencia Ficción", "Comedia"]

    const clickLogout = () => {
        Swal.fire({
            title: 'Cerrar sesión',
            text: '¿Estás segure de que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
          if (result.isConfirmed) {
            handleLogout()
            navigate('/')
          }})
        
    }
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
            <figure className='logout' onClick={() => setLogOut(!logOut)}>
                <img  src={settings} alt="Icon for settings" />
                <div className={logOut ? 'logout-action' : 'logout-action logout-inactive'} onClick={clickLogout}>
                    <h3>Log Out</h3>
                    <img src={logout} alt="Icon for logout" />
                </div>
            </figure>
        </div>
        }
    </nav>
  )
}

export default Navbar