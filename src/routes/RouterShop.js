import React from "react";
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import HomeShop from "../pageShop/HomeShop";

const RouteShop = () => {
    return (
        <Routes>
            <Route path="/homeShop" element={<HomeShop />} />
        </Routes>
    )
}

export default RouteShop;