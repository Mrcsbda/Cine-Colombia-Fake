import React from 'react'
import Navbar from '../nav/Navbar'
import Genres from '../genres/Genres'
import "./header.scss"
import NavbarChoice from '../nav-choice/NavbarChoice'

const Header = ({ isCheckout }) => {
  const genres = [
    {
      name: "Aventura",
      id: 12
    },
    {
      name: "Fantasia",
      id: 14
    },
    {
      name: "Acción",
      id: 28
    },
    {
      name: "Otros",
      id: 0
    }]
  return (
    <header>
      <Navbar isCheckout={isCheckout} genres={genres} />
      <section>
        <div className='header--choice-container'>
          <NavbarChoice />
        </div>
        <div className={isCheckout ? 'hidden' : 'header--genre-container'}>
          <Genres genres={genres} />
        </div>
      </section>


    </header>
  )
}

export default Header