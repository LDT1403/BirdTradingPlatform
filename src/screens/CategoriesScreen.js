import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";

import AddressShop from "./../components/Categories/AddressShop";

import MainCategories from "./../components/Categories/MainCategories";

import AccountShop from "../components/Categories/AccountShop";

const CategoriesScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AccountShop />

                {/* <AddressShop /> */}


            </main>
        </>
    );
};

export default CategoriesScreen;