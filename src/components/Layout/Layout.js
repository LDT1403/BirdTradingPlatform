import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../../routes/Router";
// import Cart from "../UI/cart/CartItem";
import Carts from "../UI/cart/Carts";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import HomeShop from "../../pageShop/HomeShop";


const Layout = () => {
    const showCart = useSelector(state => state.cartUi.cartIsVisible);
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, []);
    return (
        <div>
            {
                location.pathname === '/homeShop' ? <HomeShop /> : <>
                    <Header />
                    {
                        showCart &&
                        <Carts />
                    }


                    <div>
                        <Router />
                    </div>
                    <Footer />
                </>
            }


        </div>
    )
}

export default Layout;