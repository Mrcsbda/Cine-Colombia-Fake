import React, { useContext } from 'react'
import "./nav-choice.scss"
import { AppContext } from '../../routes/Router'

const NavbarChoice = () => {

  const { setFilteredMoviesBy, setValueToFilterMovies, setDate, checkoutBuilderState, setCheckBuilderState } = useContext(AppContext)

  const handleDate = (event) => {
    setDate(event.target.value)

    if (!event.target.value) {
      setFilteredMoviesBy(false)
    } else {
      setFilteredMoviesBy("date")
    }
  }

  const handleCinema = (event) => {

    if (event.target.value === "Selecciona un cinema") {
      setFilteredMoviesBy(false)
      setValueToFilterMovies(false)

    } else {
      setFilteredMoviesBy("cinema")
      setValueToFilterMovies(event.target.value)
      setCheckBuilderState(checkoutBuilderState.setMultiplex(event.target.value));
    }

  }

  return (
    <>
      <div className='navbar-choice' >
        <p>Cines cercanos</p>
        <select name="cines" id="cines" onChange={(event) => handleCinema(event)}>
          <option defaultValue="Los Molinos">Selecciona un cinema</option>
          <option value="Los Molinos">Los Molinos</option>
          <option value="Santa Fe">Santa Fe</option>
        </select>
      </div >
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