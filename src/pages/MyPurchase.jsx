import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import axios from "axios";
import ToPay from "../components/UI/toPay/ToPay";
import '../style/myPurchase.css'
const MyPurchase = () => {
    const [activeTab, setActiveTab] = useState("ToPay");
    const accessToken = localStorage.getItem('jwtToken')
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const renderTabContent = () => {
        if (activeTab === "ToPay") {
            return <ToPay/>;
        } else if (activeTab === "ToConfirmation") {
            return 2;
        } else if (activeTab === "Confirmed") {
            return 1;
        }

        return null;
    };

    return (
        <div className="MyPurchase-page">
            <div className="MyPurchase-log-cate">
                <div
                    className={`MyPurchase-cate ${activeTab === "ToPay" ? "active" : ""}`}
                    onClick={() => handleTabClick("ToPay")}
                >
                    ToPay
                </div>
                <div
                    className={`MyPurchase-cate ${activeTab === "ToConfirmation" ? "active" : ""
                        }`}
                    onClick={() => handleTabClick("ToConfirmation")}
                >
                    ToConfirmation
                </div>
                <div
                    className={`MyPurchase-cate ${activeTab === "Confirmed" ? "active" : ""}`}
                    onClick={() => handleTabClick("Confirmed")}
                >
                    Confirmed
                </div>
            </div>
            <div className="MyPurchase-log-Item">{renderTabContent()}</div>
        </div>

    )
}
export default MyPurchase;