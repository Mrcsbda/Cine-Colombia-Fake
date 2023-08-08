import React, { useContext, useEffect, useState } from 'react'
import "./successfullPurchase.scss"
import { numberToMoney } from '../../utils/numberToMoney'
import { AppContext } from '../../routes/Router'
import { getHistory } from '../../services/historyServices'
import { printDate } from '../../utils/getDate'

const SuccessfullPurchase = () => {
    const { checkoutBuilderState } = useContext(AppContext)
    const [purchase, setPurchase] = useState(null)

    useEffect(() => {
        getPurchases()
    }, [])

    const getPurchases = async () => {
        const purchases = await getHistory()
        const findPurchase = purchases.find(item => item.transactionDate === checkoutBuilderState.transactionDate)
        setPurchase(findPurchase)
    }

    const getInfoCard = (lastNumbers) => {
        const lastNumbersToNumber = Number(lastNumbers)
        if (lastNumbersToNumber <= 3333) {
            return "mastercard"
        } else if (lastNumbersToNumber > 3333 && lastNumbersToNumber <= 6666) {
            return "visa"
        } else {
            return "amex"
        }
    }

    const getCardName = (name) => {
        if (name === "mastercard") {
            return "Master Card"
        } else if (name === "visa") {
            return "Visa"
        } else {
            return "Amex"
        }
    }

    return (
        <>
            {
                purchase?.name && (
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
                                <p>{`#${purchase.transactionId}`}</p>
                            </div>
                            <div>
                                <h4 className='succesfull-purchase__subtitle'>Fecha</h4>
                                <p>{printDate(purchase.transactionDate, "day")}</p>
                            </div>
                            <div>
                                <h4 className='succesfull-purchase__subtitle' >Total</h4>
                                <p>{numberToMoney(checkoutBuilderState.totalToPay)}</p>
                            </div>
                            <div>
                                <h4 className='succesfull-purchase__subtitle'>Método de pago</h4>
                                <div className='succesfull-purchase__payment-method'>
                                    <img
                                        className='succesfull-purchase__icon'
                                        src={`/images/${getInfoCard(purchase.lastNumbersCard)}-logo.svg`}
                                        alt={getInfoCard(purchase.lastNumbersCard)} />
                                    <p>
                                        {getCardName(getInfoCard(purchase.lastNumbersCard))} - **** {purchase.lastNumbersCard}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default SuccessfullPurchase