import React, { useContext, useEffect } from 'react'
import "./purchaseForm.scss"
import { AppContext } from '../../routes/Router'
import InputMask from "react-input-mask";

const PurchaseForm = ({ handleChange, dataPurchaseForm }) => {

  const { setAvailable }  = useContext(AppContext)

  useEffect(() => {
    if(
      dataPurchaseForm.email &&
      dataPurchaseForm.nameCard &&
      dataPurchaseForm.numberCard &&
      dataPurchaseForm.dateExpiry &&
      dataPurchaseForm.cvv
      ) {
      setAvailable(true)
    } else {
      setAvailable(false)
    }
  }, [dataPurchaseForm])



  return (
    <div>
      <h2 className='purchase-form__title'>Información Personal</h2>
      <p className='purchase-form__text'>Completa los datos del formulario para realizar el pago</p>
      <form className='purchase-form'>
        <label className='purchase-form__label'>
          Correo Electronico
          <input
            name="email"
            className='purchase-form__input'
            type="email"
            value={dataPurchaseForm.email}
            onChange={(event) => handleChange(event)}
            placeholder='Ingrese su correo electronico'
          />
        </label>
        <label className='purchase-form__label'>
          Nombre de la tarjeta
          <input
            name="nameCard"
            className='purchase-form__input'
            type="text"
            value={dataPurchaseForm.nameCard}
            onChange={(event) => handleChange(event)}
            placeholder='Ingrese el nombre de la tarjeta'
          />
        </label>
        <label className='purchase-form__label'>
          Número de la tarjeta
          <div className='purchase-form__input-container'>
            <InputMask
              name="numberCard"
              className='purchase-form__input purchase-form__card-number'
              value={dataPurchaseForm.numberCard}
              onChange={(event) => handleChange(event)}
              mask='9999 9999 9999 9999'
            />
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
            <InputMask
              name="dateExpiry"
              className='purchase-form__input'
              value={dataPurchaseForm.dateExpiry}
              onChange={(event) => handleChange(event)}
              mask='99/99'
            />
          </label>
          <label className='purchase-form__label'>
            CVV
            <div className='purchase-form__input-container'>
              <InputMask
                name="cvv"
                className='purchase-form__input purchase-form__cvv'
                type="text"
                value={dataPurchaseForm.cvv}
                onChange={(event) => handleChange(event)}
                placeholder='Digita CVV'
                mask='999'
              />
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