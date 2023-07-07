import React from "react";
import { NavLink, Routes, Route } from 'react-router-dom';
import ToPay from "../components/UI/myPurchase/ToPay";
import ToConfirmation from "../components/UI/myPurchase/ToConfirmation";
import Confirmed from "../components/UI/myPurchase/Confirmed";
import Received from "../components/UI/myPurchase/Received ";
import ToRate from "../components/UI/myPurchase/ToRate";
import '../style/myPurchase.css';

const MyPurchase = () => {
    console.log("Tôi vẫn đây")
    return (
        <header className="MyPurchase-page" style={{ minHeight: '700px' }}>
            <div className="MyPurchase-log-cate" style={{ boxShadow: '0 2px 1px 0 rgba(0, 0, 0, .05)' }}>
                <NavLink
                    to="/MyPurchase/to-pay"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">To Pay</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/to-confirmation"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">To Confirmation</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/confirmed"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Confirmed</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/received"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Received</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/to-rate"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">To Rate</span>
                </NavLink>
            </div>
            <div className="MyPurchase-log-Item">
                <Routes>
                    <Route path="/to-pay" element={<ToPay />}/>
                    <Route path="/to-confirmation" element={<ToConfirmation />} />
                    <Route path="/confirmed" element={<Confirmed />} />
                    <Route path="/received" element={<Received />} />
                    <Route path="/to-rate" element={<ToRate />} />
                </Routes>

            </div>
        </header>
    );
};

export default MyPurchase;
