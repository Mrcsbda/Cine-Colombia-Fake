import React, { useContext, useEffect, useState } from 'react'
import "./nav-choice.scss"
import { AppContext } from '../../routes/Router'
import { getCinemas } from '../../services/cinemasServices'

const NavbarChoice = () => {

  const [multiplex, setMultiplex] = useState({})

  useEffect(() => {
    getDate()
  }, [])

  const getDate = async () => {
    const infoCinemas = await getCinemas()
    setMultiplex(infoCinemas)
  }

  const {
    setFilteredMoviesBy,
    setValueToFilterMovies,
    setDate,
    checkoutBuilderState,
    setCheckoutBuilderState,
    isBuying } = useContext(AppContext)

  const handleDate = (event) => {

    const updatedBuilder = checkoutBuilderState.setSchedule(undefined)
    setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilder));
    setDate(event.target.value)
    if (!event.target.value) {
      setFilteredMoviesBy(false)
    } else {
      setFilteredMoviesBy("date")
    }
  }

  const handleCinema = (event) => {

    const updatedBuilder = checkoutBuilderState.setSchedule(undefined)
    setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilder));
    if (event.target.value === "Selecciona un cinema") {
      setFilteredMoviesBy(false)
      setValueToFilterMovies(false)
      setCheckoutBuilderState(checkoutBuilderState.setMultiplex(undefined));
    } else {
      setFilteredMoviesBy("cinema")
      setValueToFilterMovies(event.target.value)
      setCheckoutBuilderState(checkoutBuilderState.setMultiplex(Number(event.target.value)));
    }

  }

  return (
    <>
      <div className={isBuying ? 'hidden' : 'navbar-choice'} >
        <p>Cines cercanos</p>
        <select name="cines" id="cines" onChange={(event) => handleCinema(event)}>
          <option defaultValue="Selecciona un cinema">Selecciona un cinema</option>
          {
            multiplex.length && (
              multiplex.map(item => (
                <option value={item.id} key={item.id}>{item.name}</option>
              ))
            )
          }
        </select>
      </div >
      <div className={isBuying ? 'hidden' : 'navbar-choice'}>
        <p>Fecha</p>
        <input
          type="date"
          name=""
          defaultValue="0000-00-00"
          min="2023-08-1"
          max="2023-08-31"
          onChange={(event) => handleDate(event)} />
      </div>
    </>
  )
}

export default NavbarChoice