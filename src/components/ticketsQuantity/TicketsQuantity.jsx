import React, { useContext, useState } from 'react'
import { numberToMoney } from '../../utils/numberToMoney'
import "./ticketsQuantity.scss"
import { AppContext } from '../../routes/Router'

const TicketsQuantity = ({ classification }) => {
  const [totalTickets, setTotalTickets] = useState(0)
  const { checkoutBuilderState, setCheckoutBuilderState } = useContext(AppContext)
  console.log(checkoutBuilderState)

  const handlePlus = (type) => {
    console.log(totalTickets)
    if (totalTickets !== 10) {
      setTotalTickets(totalTickets + 1)
      setCheckoutBuilderState(checkoutBuilderState.setTotalToPay(type, true).setTotalTickets(type, true));
      console.log(checkoutBuilderState)
    }
  }

  const handleMinus = () => {
    if (totalTickets !== 0) {
      setTotalTickets(totalTickets - 1)
      setCheckoutBuilderState(checkoutBuilderState.setTotalToPay(type, false).setTotalTickets(type, false));
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
            <button className='tickets-quantity__button-change-quantity' onClick={()=> handleMinus("adult")}>-</button>
            <p className='tickets-quantity__quantity'>{checkoutBuilderState.totalTickets.adults}</p>
            <button className='tickets-quantity__button-change-quantity' onClick={()=> handlePlus("adult")}>+</button>
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
                  <p className='tickets-quantity__quantity'>{checkoutBuilderState.totalTickets.kids}</p>
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
            <p className='tickets-quantity__quantity'>{checkoutBuilderState.totalTickets.thirdAge}</p>
            <button className='tickets-quantity__button-change-quantity'>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsQuantity