import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page from '../components/page/Page';
import Home from '../components/home/Home';
import Administrator from '../components/administrator/Administrator';


const Router = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Page />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/administrator" element={<Administrator />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;