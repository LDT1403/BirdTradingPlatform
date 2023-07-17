import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCategories from "./../components/Categories/MainCategories";
import AccountShop from "../components/Categories/AccountShop";

const CategoriesScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AccountShop />
            </main>
        </>
    );
};

export default CategoriesScreen;