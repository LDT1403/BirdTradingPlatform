import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../../routes/Router";
// import Cart from "../UI/cart/CartItem";
import Carts from "../UI/cart/Carts";
import { useSelector } from "react-redux";
import { useLocation, Routes } from 'react-router-dom';


import MyPurchase from "../../pages/MyPurchase";



const Layout = () => {
    const showCart = useSelector(state => state.cartUi.cartIsVisible);
    let location = useLocation();
    useEffect(() => {

    }, []);


    const getProductIdFromPath = (pathname) => {
        const regex = /\/product\/(\d+)\/edit/; // Mẫu tìm kiếm để lấy productId từ đường dẫn
        const match = pathname.match(regex);
        if (match && match[1]) {
            return match[1]; // Trả về giá trị productId từ match
        }
        return null; // Nếu không tìm thấy, trả về null hoặc giá trị mặc định khác
    };

    const productId = getProductIdFromPath(location.pathname); // Gọi hàm với đường dẫn cần trích xuất

    console.log(productId); // Kết quả: "57"

    const getOrderIdFromPath = (pathname) => {
        const regex = /\/order\/(\d+)/; // Regex pattern to match "/order/" followed by one or more digits
        const match = pathname.match(regex);
        if (match && match[1]) {
            return match[1]; // Return the orderId value from the match
        }
        return null; // If not found, return null or any other default value
    };

    const orderId = getOrderIdFromPath(location.pathname);



    const pathName = [
        '/manageshop',
        '/products',
        '/addproduct',
        '/category',
        `/product/${productId}/edit`,
        '/orders',
        `/order/${orderId}`,
        '/dashboard',
        '/users',
        '/shops',

    ]

    return (
        <div>
            {pathName.includes(location.pathname) ? <></> : <Header />}
            {
                showCart &&
                <Carts />
            }
            <div >
                <Routes path="/MyPurchase" element={<MyPurchase />} />
                <Router />
            </div>
            {pathName.includes(location.pathname) ? <></> : <Footer />}
        </div>
    )
}

export default Layout;