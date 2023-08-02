import React, { useContext, useState } from 'react'
import { numberToMoney } from '../../utils/numberToMoney'
import TicketsQuantity from '../ticketsQuantity/TicketsQuantity'
import "./purchaseData.scss"
import PurchaseForm from '../purchaseForm/PurchaseForm'
import SuccessfullPurchase from '../successfullPurchase/SuccessfullPurchase'
import SeparateChairs from '../separateChairs/SeparateChairs'
import { AppContext } from '../../routes/Router'
import { printDate } from '../../utils/getDate'


const PurchaseData = ({ movie, step, setStep }) => {
    const { checkoutBuilderState, available, setAvailable } = useContext(AppContext)

    const goToNextStep = () => {
        if (available) {
            setStep(step + 1)
            setAvailable(false)
        }
    }

    const showComponets = () => {
        switch (true) {
            case step === 2:
                return (<TicketsQuantity classification={movie.adult} available={available} />);
            case step === 3:
                return (<SeparateChairs />);
            case step === 4:
                return (<PurchaseForm />);
            case step === 5:
                return (<SuccessfullPurchase />);
            default: return ""
        }
    }

    return (
        <div className={`purchase-data ${step === 5 && "step-5"}`}>
            <div className='purchase-data__summary'>
                <h2 className='purchase-data__title'>Resumen de Compra</h2>
                <div className='purchase-data__content-container'>
                    <img
                        className='purchase-data__poster'
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title} />
                    <div className='purchase-data__info'>
                        <p><strong>Pelicula:</strong> {movie.title}</p>
                        <p><strong>Complejo:</strong> {checkoutBuilderState.multiplex}</p>
                        <p><strong>Fecha:</strong> {printDate(checkoutBuilderState.schedule, "day")}</p>
                        <p><strong>Función:</strong> {printDate(checkoutBuilderState.schedule, "hour")}</p>
                        {step > 2 && (
                            <>
                                <p><strong>Boletos:</strong>
                                    &nbsp;
                                    {
                                        checkoutBuilderState.totalTickets.adults !== 0
                                        && `${checkoutBuilderState.totalTickets.adults} Adultos`
                                    } &nbsp;
                                    {
                                        checkoutBuilderState.totalTickets.kids !== 0
                                        && `${checkoutBuilderState.totalTickets.kids} Niños`
                                    } &nbsp;
                                    {
                                        checkoutBuilderState.totalTickets.thirdAge !== 0
                                        && `${checkoutBuilderState.totalTickets.thirdAge} 3era edad`
                                    }
                                </p>
                                <p><strong>Número de sala:</strong></p>
                                <p><strong>Asientos:</strong></p>
                            </>)
                        }
                    </div>
                </div>
                {
                    step < 5 && (
                        <><p>Se realizara un cargo por servicio por cada boleto dentro de la orden</p>
                            <div className='purchase-data__total-to-pay-container'>
                                <p><strong>Total(IVA INCLUIDO)</strong></p>
                                <p className='purchase-data__total-to-pay'><strong>{numberToMoney(checkoutBuilderState.totalToPay)}</strong></p>
                            </div>
                        </>)
                }
                <button
                    className={`purchase-data__continue-button ${available ? "available" : ""}`}
                    onClick={goToNextStep}
                >
                    {
                        step === 2 || step === 3 ? "Continuar" :
                            step === 4 ? "Pagar ahora" : "Descargar Boletos"
                    }
                </button>
            </div>
            <hr className='purchase-data__parting-line' />
            {
                showComponets()
            }
        </div>
    )
}

export default PurchaseData