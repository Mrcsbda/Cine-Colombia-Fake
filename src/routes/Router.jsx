import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import Home from '../components/pages/home/Home';
import Administrator from '../components/pages/administrator/Administrator';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import AdminDetail from '../components/pages/adminDetails/AdminDetail';
import MainMovies from '../components/MainMovies/MainMovies';
import MovieCheckout from '../components/movieCheckout/MovieCheckout';



const Router = () => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route element={<PublicRouter isAutenticate={isLogin} />}>
                        <Route path="/" element={<Home />}>
                            <Route index element={<MainMovies isLogin={isLogin} />} />
                            <Route path=":nameMovie" element={<MovieCheckout />} />
                        </Route>
                    </Route>
                    <Route element={<PrivateRouter isAutenticate={isLogin} />}>
                        <Route path="administrator" element={<Administrator />}>
                            <Route index element={<MainMovies isLogin={isLogin} />} />
                            <Route path='movie' element={<AdminDetail/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;