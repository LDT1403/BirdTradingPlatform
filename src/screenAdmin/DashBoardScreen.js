import React from "react";
import Header from "../components/Admin/Header/Header";
import Sidebar from "../components/Admin/sidebar/Sidebar";
import DashBoard from "../components/Admin/DashBoard/DashBoard";




const DashBoardScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <DashBoard />
            </main>
        </>
    );
};

export default DashBoardScreen;