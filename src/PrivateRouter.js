import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

function PrivateRouter({ component: Component, ...rest }) {
    // const userLogin = useSelector((state) => state.auth.login.currentUser);
    // const { userInfo } = userLogin;
    return <Component {...rest} />
}


export default PrivateRouter;