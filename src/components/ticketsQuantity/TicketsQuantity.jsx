import React, { useContext, useState } from 'react'
import { numberToMoney } from '../../utils/numberToMoney'
import "./ticketsQuantity.scss"
import { AppContext } from '../../routes/Router'

const TicketsQuantity = ({ classification }) => {
  const [totalTickets, setTotalTickets] = useState(0)
  const { checkoutBuilderState, setCheckoutBuilderState, setAvailable } = useContext(AppContext)

  const handlePlus = (type) => {
    if (totalTickets !== 10) {
      setAvailable(true)
      setTotalTickets(totalTickets + 1)
      const updatedBuilder = checkoutBuilderState.setTotalToPay(type, true).setTotalTickets(type, true);
      setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilder));
    }
  }

  const handleMinus = (type) => {
    if (checkoutBuilderState.totalTickets[type] !== 0) {
      setTotalTickets(totalTickets - 1)
      const updatedBuilder = checkoutBuilderState.setTotalToPay(type, false).setTotalTickets(type, false);
      setCheckoutBuilderState(Object.assign(Object.create(Object.getPrototypeOf(checkoutBuilderState)), updatedBuilder));
      totalTickets === 1 && setAvailable(false)
    }
  }

  return (
    <div className='tickets-quantity'>
      <h2 className='tickets-quantity__title'>Selecciona tus boletos</h2>
      <p className='tickets-quantity__text'>Puedes comprar 10 boletos maximos por transacción</p>
      <div className='tickets-quantity__type-of-ticket'>
        <p className='tickets-quantity__subtitle'>ADULTO</p>
        <div className='tickets-quantity__info-ticket'>
          <p>{numberToMoney(14900)}</p>
          <div className='tickets-quantity__quantity-container'>
            <button className='tickets-quantity__button-change-quantity' onClick={() => handleMinus("adults")}>-</button>
            <p className='tickets-quantity__quantity'>{checkoutBuilderState.totalTickets.adults}</p>
            <button className='tickets-quantity__button-change-quantity' onClick={() => handlePlus("adults")}>+</button>
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
                  <button className='tickets-quantity__button-change-quantity' onClick={() => handleMinus("kids")}>-</button>
                  <p className='tickets-quantity__quantity'>{checkoutBuilderState.totalTickets.kids}</p>
                  <button className='tickets-quantity__button-change-quantity' onClick={() => handlePlus("kids")}>+</button>
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
            <button className='tickets-quantity__button-change-quantity' onClick={() => handleMinus("thirdAge")}>-</button>
            <p className='tickets-quantity__quantity'>{checkoutBuilderState.totalTickets.thirdAge}</p>
            <button className='tickets-quantity__button-change-quantity' onClick={() => handlePlus("thirdAge")}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsQuantity