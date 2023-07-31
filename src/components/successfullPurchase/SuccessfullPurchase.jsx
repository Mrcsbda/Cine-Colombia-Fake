import React from 'react'
import "./successfullPurchase.scss"
import { numberToMoney } from '../../utils/numberToMoney'

const SuccessfullPurchase = () => {
    return (
        <div className='succesfull-purchase'>
            <div className='succesfull-purchase__alert-container'>
                <img className='succesfull-purchase__icon-success' src="/images/success.svg" alt="success icon" />
                <p className='succesfull-purchase__text-success'>¡Transacción exitosa!</p>
            </div>
            <div className='succesfull-purchase__title-container'>
                <h2 className='succesfull-purchase__title'>Información de compra</h2>
                <p className='succesfull-purchase__invoicing'>Facturación</p>
            </div>
            <div className='succesfull-purchase__info-container'>
                <div>
                    <h4 className='succesfull-purchase__subtitle'>Código</h4>
                    <p>#000000001</p>
                </div>
                <div>
                    <h4 className='succesfull-purchase__subtitle'>Fecha</h4>
                    <p>14 Ago, 2023</p>
                </div>
                <div>
                    <h4 className='succesfull-purchase__subtitle' >Total</h4>
                    <p>{numberToMoney(149000)}</p>
                </div>
                <div>
                    <h4 className='succesfull-purchase__subtitle'>Método de pago</h4>
                    <div className='succesfull-purchase__payment-method'>
                        <img className='succesfull-purchase__icon' src="/images/mastercard-logo.svg" alt="mastercard logo" />
                        <p>Master Card - **** 124</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessfullPurchase