import React, { useState } from 'react'
import TicketQuantity from '../ticketQuantity/TicketQuantity'
import { numberToMoney } from '../../utils/numberToMoney'
import "./purchaseData.scss"

const PurchaseData = ({ props }) => {
    const [totalToPay, setTotalToPay] = useState(1000000)

    return (
        <div className='purchase-data'>
            <div className='purchase-data__summary'>
                <h2 className='purchase-data__title'>Resumen de Compra</h2>
                <div className='purchase-data__content-container'>
                    <img
                    className='purchase-data__poster'
                    src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
                    alt={props.movie.title} />
                    <div className='purchase-data__info'>
                        <p><strong>Pelicula:</strong> {props.movie.title}</p>
                        <p><strong>Complejo:</strong> Los Molinos</p>
                        <p><strong>Fecha:</strong> 14 de Agosto del 2023</p>
                        <p><strong>Función:</strong> 7:30 PM</p>
                        {props.step > 2 && (
                            <>
                                <p><strong>Boletos:</strong></p>
                                <p><strong>Número de sala:</strong></p>
                                <p><strong>Asientos:</strong></p>
                            </>)
                        }
                    </div>
                </div>
                <p>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
                <div className='purchase-data__total-to-pay-container'>
                    <p><strong>Total(IVA INCLUIDO)</strong></p>
                    <p className='purchase-data__total-to-pay'><strong>{numberToMoney(totalToPay)}</strong></p>
                </div>
                <button className='purchase-data__continue-button'>Continuar</button>
            </div>
            <TicketQuantity classification={props.movie.adult}/>
        </div>
    )
}

export default PurchaseData