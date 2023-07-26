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
    
    const [admin, setAdmin] = useState({})
    const [isLogin, setIsLogin] = useState(false)

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
        <AppContext.Provider value={{isLogin, setIsLogin, admin, handleLogout}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route element={<PublicRouter isAutenticate={isLogin} />}>
                        <Route path="/" element={<Home />}>
                            <Route index element={<MainMovies isLogin={isLogin} />} />
                            <Route path=":idMovie" element={<MovieCheckout />} />
                        </Route>
                    </Route>
                    <Route element={<PrivateRouter isAutenticate={isLogin} />}>
                        <Route path="administrator" element={<Administrator />}>
                            <Route index element={<MainMovies isLogin={isLogin} />} />
                            <Route path=':idMovie' element={<AdminDetail/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        </AppContext.Provider>
    )
}

export default Router;