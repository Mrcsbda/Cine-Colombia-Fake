import React, { useEffect, useState } from 'react'
import "./separateChairs.scss"

const SeparateChairs = () => {

  const [chairs, setChairs] = useState([])

  useEffect(() => {
    printChairs()
  }, [])

  const printChairs = () => {
    const array = [...chairs]
    for (let i = 0; i <= 8; i++) {
      array.push({ chair: letterOfRow(i), places: [] })
      for (let j = 0; j <= 15; j++) {
        array[i].places.push(j)
      }
    }
    setChairs(array)
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
                    <div className='chairs__chair-container' key={place}>
                      {
                        place === 7 || place === 8 ? (
                          <>
                            <img src="images/chair.svg" alt="" className='hidden-chair' />
                          </>
                        ) : (
                          <>
                            <img src="images/chair.svg" alt="" className='chairs__chair-icon' />
                            <p>{place <= 8 ? place + 1 : place - 1}</p>
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