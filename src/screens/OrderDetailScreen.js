import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";
import { useParams } from "react-router-dom";

const OrderDetailScreen = () => {
    const orderId = useParams();

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <OrderDetailmain orderId={orderId.id} />
            </main>
        </>
    );
};

export default OrderDetailScreen;