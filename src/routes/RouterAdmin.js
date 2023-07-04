import React from "react";
import Dashboard from "../components/Admin/Dashboard";
import { Route, Routes } from "react-router-dom";

const RouterAdmin = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default RouterAdmin;