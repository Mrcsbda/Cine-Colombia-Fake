import React from 'react'
import "./nav-choice.scss"

const NavbarChoice = () => {
  return (
    <>
        <div className='navbar-choice'>
            <p>Cines cercanos</p>
            <select name="cines" id="cines">
                <option defaultValue="Los Molinos">Los Molinos</option>
                <option defaultValue="Santa Fe">Santa Fe</option>
            </select>
        </div>
        <div className='navbar-choice'>
            <p>Fecha</p>
            <input type="date" name="" id="" defaultValue="2023-08-14" min="2023-08-14"/>
        </div>
    </>
  )
}

export default NavbarChoice