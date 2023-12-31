import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from '../components/layout/Layout';
import Home from '../components/pages/home/Home';
import Administrator from '../components/pages/administrator/Administrator';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import AdminDetail from '../components/pages/adminDetails/AdminDetail';
import MainMovies from '../components/MainMovies/MainMovies';
import MovieCheckout from '../components/movieCheckout/MovieCheckout';
import { Checkout } from '../models/checkoutBuilder';

export const AppContext = createContext({})

const Router = () => {

    const [admin, setAdmin] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const [filteredMoviesBy, setFilteredMoviesBy] = useState(false)
    const [valueToFilterMovies, setValueToFilterMovies] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)
    const [date, setDate] = useState("2023-08-14")
    const [foundSchedule, setFoundSchedule] = useState('')
    const [checkoutBuilderState, setCheckoutBuilderState] = useState(new Checkout())
    const [newMultiplex, setNewMultiplex] = useState(false)
    const [newShow, setNewShow] = useState(null)
    const [schedule, setSchedule] = useState(false)
    const [cinemas, setCinemas] = useState([]);
    const [available, setAvailable] = useState(false)

    useEffect(() => {
        const dataAdmin = JSON.parse(localStorage.getItem('admin')) || {}
        if (dataAdmin?.adminName) {
            setIsLogin(true)
            setAdmin(dataAdmin)
        }
        else {
            setIsLogin(false)
            setAdmin(false)
        }
    }, [isLogin])

    const handleLogout = () => {
        localStorage.clear();
        setIsLogin(!isLogin);
      }

    return (
        <AppContext.Provider value={
            {
                isLogin,
                setIsLogin,
                admin,
                handleLogout,
                isBuying,
                setIsBuying,
                filteredMoviesBy,
                setFilteredMoviesBy,
                valueToFilterMovies,
                setValueToFilterMovies,
                isCheckout,
                setIsCheckout,
                date,
                setDate,
                foundSchedule,
                setFoundSchedule,
                setCheckoutBuilderState,
                checkoutBuilderState,
                newMultiplex,
                setNewMultiplex,
                newShow,
                setNewShow,
                schedule,
                setSchedule,
                cinemas,
                setCinemas,
                available,
                setAvailable
            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route element={<PublicRouter isAutenticate={isLogin} />}>
                            <Route element={<Home />}>
                                <Route index element={<MainMovies />} />
                                <Route path=":idMovie" element={<MovieCheckout />} />
                            </Route>
                        </Route>
                        <Route element={<PrivateRouter isAutenticate={isLogin} />}>
                            <Route path="administrator" element={<Administrator />}>
                                <Route index element={<MainMovies />} />
                                <Route path=':idMovie' element={<AdminDetail />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default Router;