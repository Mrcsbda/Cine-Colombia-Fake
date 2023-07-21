import React, { useEffect } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import "./page.scss"
import { useState } from 'react'

const Layout = () => {
    const location = useLocation()
    const {nameMovie} = useParams()
    const [isCheckout, setIsCheckout] = useState(false)

    useEffect(() => {
        location.pathname === `/${nameMovie}` ? setIsCheckout(true) : setIsCheckout(false)
    }, [location])

    return (
        <>
            <Header isCheckout={isCheckout}/>
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout