import React from 'react'
import "./nav-choice.scss"

const NavbarChoice = () => {
  const handleDate = (event) => {
    console.log(event.target.value)
  }

  const handleCinema = (event) => {
    console.log(event.target.value)
  }

  return (
    <>
      <div className='navbar-choice'>
        <p>Cines cercanos</p>
        <select name="cines" id="cines" onChange={(event) => handleCinema(event)}>
          <option defaultValue="Los Molinos">Selecciona un cinema </option>
          <option value="Los Molinos">Los Molinos</option>
          <option value="Santa Fe">Santa Fe</option>
        </select>
      </div>
      <div className='navbar-choice'>
        <p>Fecha</p>
        <input
        type="date"
        name=""
        defaultValue="0000-00-00"
        min="2023-08-14"
        max="2023-08-18"
        onChange={(event) => handleDate(event)} />
      </div>
    </>
  )
}

export default NavbarChoice