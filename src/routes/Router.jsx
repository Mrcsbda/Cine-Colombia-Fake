import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import Home from '../components/pages/home/Home';
import Administrator from '../components/pages/administrator/Administrator';



const Router = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/administrator" element={<Administrator />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;