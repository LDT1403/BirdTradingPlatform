import React from "react";
import TopShop from "./TopShop";
import ShopStatics from "./ShopStatics";
import UserStatics from "./UserStatics";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotalOrder, listShop, listUser } from "../../../pages/redux/Actions/userActions";
import TopFeedBack from "./TopFeedBack";


const DashBoard = () => {
    const userList = useSelector((state) => state.userList);
    const { users } = userList || {};
    const shopList = useSelector((state) => state.shopList);
    const { shops } = shopList || {};
    const totalOrder = useSelector((state) => state.totalOrder);
    const { totalorder } = totalOrder || {};

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listShop());
        dispatch(listUser());
        dispatch(getTotalOrder());
    }, [])
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Thống Kê </h2>

                </div>
                {/* Top Total */}

                <TopShop users={users} shops={shops} totalorder={totalOrder} />

                <div className="row">
                    {/* STATICS */}
                    <ShopStatics />
                    <UserStatics />
                </div>

                {/* LATEST ORDER */}
                <div className="card mb-4 shadow-sm">
                    {/* <LatestOrder orders={orders} loading={loading} error={error} /> */}
                    <TopFeedBack />
                </div>
            </section>
        </>
    );
};

export default DashBoard;