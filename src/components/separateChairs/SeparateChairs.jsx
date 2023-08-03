import React, { useContext, useEffect, useState } from 'react'
import "./separateChairs.scss"
import getTickets from '../../services/ticketsServices'
import { AppContext } from '../../routes/Router'

const SeparateChairs = () => {

  const [chairs, setChairs] = useState([])
  const { checkoutBuilderState } = useContext(AppContext)

  useEffect(() => {
    printChairs()
  }, [])

  const printChairs = async () => {
    const boughtTickets = await getTickets()
    const boughtTicketsByCinemaShow = boughtTickets.find(tickets =>
      tickets.cinemaShowId === checkoutBuilderState.cinemaShowId && tickets.schedule === checkoutBuilderState.schedule)
    console.log(boughtTicketsByCinemaShow)
    const array = [...chairs]
    for (let i = 0; i <= 8; i++) {
      array.push({ chair: letterOfRow(i), places: [] })
      for (let j = 0; j <= 15; j++) {
        if (boughtTicketsByCinemaShow) {
          array[i].places.push({ number: j, isAvailable: validateIsAvailable(letterOfRow(i), j + 1, boughtTicketsByCinemaShow.places) })
        } else {
          array[i].places.push({ number: j, isAvailable: true })
        }
      }
    }
    setChairs(array)
  }

  const validateIsAvailable = (row, column, boughtPlaces) => {
    let validation = true;
    for (let i = 0; i < boughtPlaces.length; i++) {
      const placesSeparated = boughtPlaces[i].split("")
      if (placesSeparated[0] == row && placesSeparated[1] == column) {
        validation = false;
        break;
      }
    }
    return validation
  }

  const letterOfRow = (position) => {
    switch (position) {
      case 0: return "A"
      case 1: return "B"
      case 2: return "C"
      case 3: return "D"
      case 4: return "E"
      case 5: return "F"
      case 6: return "G"
      case 7: return "H"
      case 8: return "I"
      default: return ""
    }
  }

  return (
    <div className='chairs'>
      <h2 className='chairs__title'>Selecciona tus asientos</h2>
      <p className='chairs__text'>Para cambiar tu lugar asignado da click en el asiento deseado.</p>
      <div className='chairs__info-chairs-container'>
        <div className='chairs__info-chair'>
          <img className='chairs__info-chair-icon selected-chair' src="images/chair.svg" alt="icon chair" />
          <p className='chairs__info-chair-text'>Seleccionado</p>
        </div>
        <div className='chairs__info-chair'>
          <img className='chairs__info-chair-icon occupied-chair' src="images/chair.svg" alt="icon chair" />
          <p className='chairs__info-chair-text'>Ocupado</p>
        </div>
        <div className='chairs__info-chair'>
          <img className='chairs__info-chair-icon avaible-chair' src="images/chair.svg" alt="icon chair" />
          <p className='chairs__info-chair-text'>Disponible</p>
        </div>
      </div>
      <hr className='chairs__separated-line' />
      <div className='chairs__select-chairs-container'>
        {
          chairs.length && chairs.map((row, index) =>
          (
            <div className='chairs__select-chairs-row' key={index + 1}>
              <p className='chairs__letter-row'>{row.chair}</p>
              <div className='chairs__select-chairs-row--elements'>
                {
                  row.places.map(place => (
                    <div className='chairs__chair-container' key={place.number}>
                      {
                        place.number === 7 || place.number === 8 ? (
                          <>
                            <img src="images/chair.svg" alt="icon chair" className='hidden-chair' />
                          </>
                        ) : (
                          <>
                            <img src="images/chair.svg"
                              alt="icon chair"
                              className={`chairs__chair-icon ${place.isAvailable ? "avaible-chair" : "occupied-chair"}`} />
                            <p className='chairs__chair-number'>{place.number <= 8 ? place.number + 1 : place.number - 1}</p>
                          </>
                        )
                      }
                    </div>
                  )
                  )
                }
              </div>
            </div>
          )
          )
        }
      </div>
    </div>
  )
}

export default SeparateChairs