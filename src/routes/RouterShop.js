
// import { Routes, Route, Navigate, Link } from 'react-router-dom';
// import HomeShop from "../pageShop/HomeShop";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from "../screens/HomeScreen";
// import HomeScreen from "./screens/HomeScreen";
// import ProductScreen from "../screens/productScreen";
// import CategoriesScreen from "../screens/CategoriesScreen";
// import OrderScreen from "../screens/OrderScreen";
// import OrderDetailScreen from "../screens/OrderDetailScreen";
// import AddProduct from "../screens/AddProduct";
// import Login from "../screens/LoginScreen";
// import UsersScreen from "../screens/UsersScreen";
// import ProductEditScreen from "../screens/ProductEditScreen";
// import NotFound from "../screens/NotFound";
// import { useDispatch, useSelector } from "react-redux";
// import PrivateRouter from "../PrivateRouter";

const RouteShop = () => {

    return (
        <>
            {/* <Routes>
                <Route path="/" element={<PrivateRouter component={HomeScreen} />} />
                <Route path="/products" element={<PrivateRouter component={ProductScreen} />} />
                <Route path="/category" element={<PrivateRouter component={CategoriesScreen} />} />
                <Route path="/orders" element={<PrivateRouter component={OrderScreen} />} />
                <Route path="/order/:id" element={<PrivateRouter component={OrderDetailScreen} />} />
                <Route path="/addproduct" element={<PrivateRouter component={AddProduct} />} />
                <Route path="/users" element={<PrivateRouter component={UsersScreen} />} />
                <Route path="/product/:id/edit" element={<PrivateRouter component={ProductEditScreen} />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PrivateRouter component={NotFound} />} />
            </Routes> */}
        </>
    )
}

export default RouteShop;