import React, { useContext, useState } from 'react'
import { numberToMoney } from '../../utils/numberToMoney'
import TicketsQuantity from '../ticketsQuantity/TicketsQuantity'
import "./purchaseData.scss"
import PurchaseForm from '../purchaseForm/PurchaseForm'
import SuccessfullPurchase from '../successfullPurchase/SuccessfullPurchase'
import SeparateChairs from '../separateChairs/SeparateChairs'
import { AppContext } from '../../routes/Router'
import { printDate } from '../../utils/getDate'
import { editTickets, getTickets, saveTickets } from '../../services/ticketsServices'
import { savePurchase } from '../../services/historyServices'

const PurchaseData = ({ props: { movie, step, setStep, dataPurchaseForm, handleChange, resetForm } }) => {
    const { checkoutBuilderState, setCheckoutBuilderState, available, setAvailable } = useContext(AppContext)


    const goToNextStep = async () => {
        if (available) {
            if (step === 4) {
                const boughtTickets = await getTickets()
                const boughtTicketsByCinemaShow = boughtTickets.find(tickets =>
                    tickets.cinemaShowId === checkoutBuilderState.cinemaShowId && tickets.schedule === checkoutBuilderState.schedule)
                const datePurchase = new Date().getTime();
                
                const newPurchaseInfo = {
                    name: dataPurchaseForm.nameCard,
                    email: dataPurchaseForm.email,
                    lastNumbersCard: dataPurchaseForm.numberCard.toString().slice(-4),
                    cinemaShowId: checkoutBuilderState.cinemaShowId,
                    schedule: checkoutBuilderState.schedule,
                    boughtTickets: checkoutBuilderState.totalTickets.kids + checkoutBuilderState.totalTickets.adults + checkoutBuilderState.totalTickets.thirdAge,
                    places: checkoutBuilderState.places,
                    transactionId: Math.floor(Math.random() * 1000 + 1),
                    transactionDate: datePurchase
                }

                const savePurchaseInBack = await savePurchase(newPurchaseInfo)

                if (boughtTicketsByCinemaShow) {
                    const places = boughtTicketsByCinemaShow.places
                    const concatPlaces = places.concat(checkoutBuilderState.places)
                    const newPurchase = {
                        boughtTickets: boughtTicketsByCinemaShow.boughtTickets
                            + checkoutBuilderState.totalTickets.kids
                            + checkoutBuilderState.totalTickets.adults
                            + checkoutBuilderState.totalTickets.thirdAge,
                        places: concatPlaces
                    }
                    const editPurchaseTickets = await editTickets(boughtTicketsByCinemaShow.id, newPurchase)
                    if (editPurchaseTickets) {
                        setStep(step + 1)
                        resetForm()
                    }
                } else {
                    const newPurchase = {
                        cinemaId: checkoutBuilderState.multiplex,
                        cinemaShowId: checkoutBuilderState.cinemaShowId,
                        boughtTickets: checkoutBuilderState.totalTickets.kids + checkoutBuilderState.totalTickets.adults + checkoutBuilderState.totalTickets.thirdAge,
                        schedule: checkoutBuilderState.schedule,
                        places: checkoutBuilderState.places
                    }

                    const savePurchaseTickets = await saveTickets(newPurchase)
                    if (savePurchaseTickets) {
                        setStep(step + 1)
                        resetForm()
                    }
                }

                setCheckoutBuilderState(checkoutBuilderState.setTransactionDate(datePurchase));

            } else {
                setStep(step + 1)
                setAvailable(false)
            }
        }
    }

    const showComponets = () => {
        switch (true) {
            case step === 2:
                return (<TicketsQuantity classification={movie.adult} available={available} />);
            case step === 3:
                return (<SeparateChairs />);
            case step === 4:
                return (<PurchaseForm handleChange={handleChange} dataPurchaseForm={dataPurchaseForm} />);
            case step === 5:
                return (<SuccessfullPurchase />);
            default: return ""
        }
    }


    return (
        <div className={`purchase-data ${step === 3 && "step-3"} ${step === 5 && "step-5"}`}>
            <div className='purchase-data__summary'>
                <h2 className='purchase-data__title'>Resumen de Compra</h2>
                <div className='purchase-data__content-container'>
                    <img
                        className='purchase-data__poster'
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title} />
                    <div className='purchase-data__info'>
                        <p><strong>Pelicula:</strong> {movie.title}</p>
                        <p><strong>Complejo:</strong> {checkoutBuilderState.multiplex === 1
                            ? "Los Molinos"
                            : "Santa Fe"}</p>
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
                                <p><strong>Número de sala:</strong> {checkoutBuilderState.hall}</p>
                                <p><strong>Asientos:</strong>{
                                    checkoutBuilderState.places.length
                                        ? checkoutBuilderState.places.map((item, index) => (<span key={index + 1} > {item} </span>))
                                        : ""
                                }</p>
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