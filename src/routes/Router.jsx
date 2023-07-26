import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import Home from '../components/pages/home/Home';
import Administrator from '../components/pages/administrator/Administrator';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import AdminDetail from '../components/pages/adminDetails/AdminDetail';
import MainMovies from '../components/MainMovies/MainMovies';
import MovieCheckout from '../components/movieCheckout/MovieCheckout';

export const AppContext = createContext({})

const Router = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const [filteredMoviesBy, setFilteredMoviesBy] = useState(false)
    const [valueToFilterMovies, setValueToFilterMovies] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)
    const [date, setDate] = useState(true)
    useEffect(() => {
        const dataAdmin = JSON.parse(localStorage.getItem('admin')) || {}
        if (dataAdmin?.adminName) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
    }, [isLogin])




    return (
        <AppContext.Provider value={
            {
                isLogin,
                setIsLogin,
                isBuying,
                setIsBuying,
                filteredMoviesBy,
                setFilteredMoviesBy,
                valueToFilterMovies,
                setValueToFilterMovies,
                isCheckout,
                setIsCheckout,
                date,
                setDate
            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route element={<PublicRouter isAutenticate={isLogin} />}>
                            <Route path="/" element={<Home />}>
                                <Route index element={<MainMovies />} />
                                <Route path=":idMovie" element={<MovieCheckout />} />
                            </Route>
                        </Route>
                        <Route element={<PrivateRouter isAutenticate={isLogin} />}>
                            <Route path="administrator" element={<Administrator />}>
                                <Route index element={<MainMovies />} />
                                <Route path='movie' element={<AdminDetail />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default Router;