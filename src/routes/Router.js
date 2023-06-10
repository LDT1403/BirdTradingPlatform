import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home'
import Shopping from '../pages/Shopping'
import ShopDetail from "../pages/ShopDetail";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='/home' />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shopping />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default Router;