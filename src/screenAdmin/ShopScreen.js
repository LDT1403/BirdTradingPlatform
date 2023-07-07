import React from "react";
import UserComponent from "../components/Admin/users/UserComponent";
import Header from "../components/Admin/Header/Header";
import Sidebar from "../components/Admin/sidebar/Sidebar";
import ShopComponent from "../components/Admin/users/ShopComponent";




const ShopScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <ShopComponent />
            </main>
        </>
    );
};

export default ShopScreen;