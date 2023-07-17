import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Main from "../components/HomeShop/Main";


const HomeScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <Main />
            </main>
        </>
    );
};

export default HomeScreen;