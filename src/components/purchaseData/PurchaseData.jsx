import React, { useContext, useState } from 'react'
import { numberToMoney } from '../../utils/numberToMoney'
import TicketsQuantity from '../ticketsQuantity/TicketsQuantity'
import "./purchaseData.scss"
import PurchaseForm from '../purchaseForm/PurchaseForm'
import SuccessfullPurchase from '../successfullPurchase/SuccessfullPurchase'
import SeparateChairs from '../separateChairs/SeparateChairs'
import { AppContext } from '../../routes/Router'
import { printDate } from '../../utils/getDate'


const PurchaseData = ({ props }) => {
    const { checkoutBuilderState } = useContext(AppContext)

    const showComponets = () => {
        switch (true) {
            case props.step === 2:
                return (<TicketsQuantity classification={props.movie.adult} />);
            case props.step === 3:
                return (<SeparateChairs />);
            case props.step === 4:
                return (<PurchaseForm />);
            case props.step === 5:
                return (<SuccessfullPurchase />);
            default: return ""
        }
    }

    return (
        <div className={`purchase-data ${props.step === 5 && "step-5"}`}>
            <div className='purchase-data__summary'>
                <h2 className='purchase-data__title'>Resumen de Compra</h2>
                <div className='purchase-data__content-container'>
                    <img
                        className='purchase-data__poster'
                        src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
                        alt={props.movie.title} />
                    <div className='purchase-data__info'>
                        <p><strong>Pelicula:</strong> {props.movie.title}</p>
                        <p><strong>Complejo:</strong> {checkoutBuilderState.multiplex}</p>
                        <p><strong>Fecha:</strong> {printDate(checkoutBuilderState.schedule, "day")}</p>
                        <p><strong>Función:</strong> {printDate(checkoutBuilderState.schedule, "hour")}</p>
                        {props.step > 2 && (
                            <>
                                <p><strong>Boletos:</strong></p>
                                <p><strong>Número de sala:</strong></p>
                                <p><strong>Asientos:</strong></p>
                            </>)
                        }
                    </div>
                </div>
                {
                    props.step < 5 && (
                        <><p>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
                            <div className='purchase-data__total-to-pay-container'>
                                <p><strong>Total(IVA INCLUIDO)</strong></p>
                                <p className='purchase-data__total-to-pay'><strong>{numberToMoney(checkoutBuilderState.totalToPay)}</strong></p>
                            </div>
                        </>)
                }
                <button className='purchase-data__continue-button'>Continuar</button>
            </div>
            <hr className='purchase-data__parting-line' />
            {
                showComponets()
            }
        </div>
    )
}

export default PurchaseData