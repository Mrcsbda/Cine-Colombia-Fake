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
    const boughtTicketsByCinemaShow = boughtTickets.find(tickets => tickets.cinemaShowId === checkoutBuilderState.cinemaShowId)
    console.log(boughtTicketsByCinemaShow)
    const array = [...chairs]
    for (let i = 0; i <= 8; i++) {
      array.push({ chair: letterOfRow(i), places: [] })
      for (let j = 0; j <= 15; j++) {
        array[i].places.push({ number: j, isAvailable: validateIsAvailable(letterOfRow(i), j + 1, boughtTicketsByCinemaShow.places) })
      }
    }
    setChairs(array)
    console.log(array)
  }

  const validateIsAvailable = (row, column, boughtPlaces) => {
    let validation = false;
    for (let i = 0; i < boughtPlaces.length; i++) {
      const placesSeparated = boughtPlaces[i].split("")
      if (placesSeparated[0] == row && placesSeparated[1] == column) {
        validation = true;
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
    <div>
      <h2></h2>
      <p></p>
      <div>
        <div>
          <img src="" alt="" />
          <p></p>
        </div>
        <div>
          <img src="" alt="" />
          <p></p>
        </div>
        <div>
          <img src="" alt="" />
          <p></p>
        </div>
      </div>
      <hr />
      <div className='chairs__select-chairs-container'>
        {
          chairs.length && chairs.map((row, index) =>
          (
            <div className='chairs__select-chairs-row' key={index + 1}>
              <p>{row.chair}</p>
              <div className='chairs__select-chairs-columns'>
                {
                  row.places.map(place => (
                    <div className='chairs__chair-container' key={place.number}>
                      {
                        place.number === 7 || place.number === 8 ? (
                          <>
                            <img src="images/chair.svg" alt="" className='hidden-chair' />
                          </>
                        ) : (
                          <>
                            <img src="images/chair.svg" alt="" className='chairs__chair-icon' />
                            <p>{place.number <= 8 ? place.number + 1 : place.number - 1}</p>
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