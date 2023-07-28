import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listOrders } from "../../pages/redux/Actions/OrderActions";
import { listProducts } from "../../pages/redux/Actions/ProductActions";

const Main = () => {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList || {}; // Provide default value of empty object
    const productList = useSelector((state) => state.productList);
    const { products } = productList || {}; // Provide default value of empty object
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
        dispatch(listProducts());
    }, [])

    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Thống Kê </h2>
                </div>
                {/* Top Total */}
                <TopTotal orders={orders} products={products} />

                <div className="row">
                    {/* STATICS */}
                    <SaleStatistics />
                    <ProductsStatistics />
                </div>

                {/* LATEST ORDER */}
                <div className="card mb-4 shadow-sm">
                    <LatestOrder />
                </div>
            </section>
        </>
    );
};

export default Main;