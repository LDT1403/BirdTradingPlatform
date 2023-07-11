import React from "react";
import TopShop from "./TopShop";
import ShopStatics from "./ShopStatics";
import UserStatics from "./UserStatics";
import { useSelector } from "react-redux";


const DashBoard = () => {
    const userList = useSelector((state) => state.userList);
    const { users } = userList || {}; // Provide default value of empty object
    const shopList = useSelector((state) => state.shopList);
    const { shops } = shopList || {}; // Provide default value of empty object

    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Dashboard </h2>

                </div>
                {/* Top Total */}

                <TopShop users={users} shops={shops} />

                <div className="row">
                    {/* STATICS */}
                    <ShopStatics />
                    <UserStatics />
                </div>

                {/* LATEST ORDER */}
                <div className="card mb-4 shadow-sm">
                    {/* <LatestOrder orders={orders} loading={loading} error={error} /> */}
                </div>
            </section>
        </>
    );
};

export default DashBoard;