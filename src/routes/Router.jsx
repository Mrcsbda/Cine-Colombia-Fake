import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import Home from '../components/pages/home/Home';
import Administrator from '../components/pages/administrator/Administrator';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import AdminDetail from '../components/pages/adminDetails/AdminDetail';



const Router = () => {

    const [isLogin, setIsLogin] = useState(true)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route element={<PublicRouter isAutenticate={isLogin} />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<PrivateRouter isAutenticate={isLogin} />}>
                        <Route path="administrator">
                            <Route index element={<Administrator/>}/>
                            <Route path='movie' element={<AdminDetail/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;