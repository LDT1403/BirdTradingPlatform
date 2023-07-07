import React from "react";
import UserComponent from "../components/Admin/users/UserComponent";
import Header from "../components/Admin/Header/Header";
import Sidebar from "../components/Admin/sidebar/Sidebar";




const UserScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <UserComponent />
            </main>
        </>
    );
};

export default UserScreen;