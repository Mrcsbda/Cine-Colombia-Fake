import React, { useState } from 'react'
import TicketQuantity from '../ticketQuantity/TicketQuantity'
import { numberToMoney } from '../../utils/numberToMoney'

const PurchaseData = ({ props }) => {
    const [totalToPay, setTotalToPay] = useState(0)
    return (
        <div>
            <div>
                <h2>Resumen de Compra</h2>
                <div>
                    {/* <img src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}alt="" /> */}
                    <div>
                        <p><strong>Pelicula: {props.movie.title}</strong></p>
                        <p><strong>Complejo: Los Molinos</strong></p>
                        <p><strong>Fecha: 14 de Agosto del 2023</strong></p>
                        <p><strong>Función: 7:30 PM</strong></p>
                        {props.step > 2 && <p><strong>Boletos:</strong></p>}
                        {props.step > 2 && <p><strong>Número de sala:</strong></p>}
                        {props.step > 2 && <p><strong>Asientos:</strong></p>}
                    </div>
                </div>
                <p>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
                <div>
                    <p>Total(IVA INCLUIDO)</p>
                    <p>{numberToMoney(0)}</p>
                </div>
                <button>Continuar</button>
            </div>
            <TicketQuantity />
        </div>
    )
}

export default PurchaseData