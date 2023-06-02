import React from "react";
import Head from "./Head";
import Search from "./Search";


const Header = ({ CartItem }) => {
    return (
        <>
            <Head />
            <Search CartItem={CartItem} />
            {/* <Navbar /> */}
        </>
    )
}

export default Header