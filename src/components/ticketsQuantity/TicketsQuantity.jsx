import React, { useState } from 'react'
import { numberToMoney } from '../../utils/numberToMoney'
import "./ticketsQuantity.scss"

const TicketsQuantity = ({ classification, setTotalToPay }) => {
  const [adultTickets, setAdultTickets] = useState(0)
  const [kidsTickets, setKidsTickets] = useState(0)
  const [thirdAgeTickets, setThirdAgeTickets] = useState(0)
  const [totalTickets, setTotalTickets] = useState(0)

  return (
    <div className='tickets-quantity'>
      <h2 className='tickets-quantity__title'>Selecciona tus boletos</h2>
      <p>Puedes comprar 10 boletos maximos por transacción</p>
      <div className='tickets-quantity__type-of-ticket'>
        <p className='tickets-quantity__subtitle'>ADULTO</p>
        <div className='tickets-quantity__info-ticket'>
          <p>{numberToMoney(14900)}</p>
          <div className='tickets-quantity__quantity-container'>
            <button className='tickets-quantity__button-change-quantity'>-</button>
            <p className='tickets-quantity__quantity'>{adultTickets}</p>
            <button className='tickets-quantity__button-change-quantity'>+</button>
          </div>
        </div>
      </div>
      {
        !classification && (
          <>
            <div className='tickets-quantity__type-of-ticket'>
              <p className='tickets-quantity__subtitle'>NIÑOS</p>
              <div className='tickets-quantity__info-ticket'>
                <p>{numberToMoney(12900)}</p>
                <div className='tickets-quantity__quantity-container'>
                  <button className='tickets-quantity__button-change-quantity'>-</button>
                  <p className='tickets-quantity__quantity'>{kidsTickets}</p>
                  <button className='tickets-quantity__button-change-quantity'>+</button>
                </div>
              </div>
            </div>
          </>
        )
      }
      <div className='tickets-quantity__type-of-ticket'>
        <p className='tickets-quantity__subtitle'>3 ERA EDAD</p>
        <div className='tickets-quantity__info-ticket'>
          <p>{numberToMoney(12900)}</p>
          <div className='tickets-quantity__quantity-container'>
            <button className='tickets-quantity__button-change-quantity'>-</button>
            <p className='tickets-quantity__quantity'>{thirdAgeTickets}</p>
            <button className='tickets-quantity__button-change-quantity'>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsQuantity