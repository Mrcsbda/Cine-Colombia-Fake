import React, { useContext, useEffect } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import "./page.scss"
import { useState } from 'react'
import { AppContext } from '../../routes/Router'

const Layout = () => {
    const location = useLocation()
    const {idMovie} = useParams()
    const { setIsCheckout } = useContext(AppContext)

    useEffect(() => {
        location.pathname === `/${idMovie}` ? setIsCheckout(true) : setIsCheckout(false)
    }, [location])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout