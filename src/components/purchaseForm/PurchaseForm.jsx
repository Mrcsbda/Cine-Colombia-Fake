import React, { useEffect } from 'react'
import "./purchaseForm.scss"

const PurchaseForm = () => {

  useEffect(()=> {
  },[])
  return (
    <div>
      <h2 className='purchase-form__title'>Información Personal</h2>
      <p className='purchase-form__text'>Completa los datos del formulario para realizar el pago</p>
      <form className='purchase-form'>
        <label className='purchase-form__label'>
          Correo Electronico
          <input className='purchase-form__input' type="email"/>
        </label>
        <label className='purchase-form__label'>
          Nombre de la tarjeta
          <input className='purchase-form__input' type="text" />
        </label>
        <label className='purchase-form__label'>
          Número de la tarjeta
          <div className='purchase-form__input-container'>
            <input className='purchase-form__input purchase-form__card-number' type="text" />
            <figure className='purchase-form__icons-container'>
              <img className='purchase-form__icons' src="/images/visa-logo.svg" alt="visa logo" />
              <img className='purchase-form__icons' src="/images/mastercard-logo.svg" alt="mastercard logo" />
              <img className='purchase-form__icons' src="/images/amex-logo.svg" alt="amex logo" />
            </figure>
          </div>
        </label>
        <div className='purchase-form__inputs-container' >
          <label className='purchase-form__label purchase-form__date-of-expiry'>
            Fecha de caducidad
            <input className='purchase-form__input' type="text" />
          </label>
          <label className='purchase-form__label'>
            CVV
            <div className='purchase-form__input-container'>
              <input className='purchase-form__input purchase-form__cvv' type="text" />
              <figure className='purchase-form__icons-container'>
                <img className='purchase-form__icons' src="/images/exclamation.svg" alt="" />
              </figure>
            </div>
          </label>
        </div>
      </form>
    </div>
  )
}

export default PurchaseForm