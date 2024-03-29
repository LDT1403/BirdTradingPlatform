import React from "react";
import { NavLink, Routes, Route } from 'react-router-dom';
import ToPay from "../components/UI/myPurchase/ToPay";
import ToConfirmation from "../components/UI/myPurchase/ToConfirmation";
import Confirmed from "../components/UI/myPurchase/Confirmed";
import Received from "../components/UI/myPurchase/Received ";
import ToRate from "../components/UI/myPurchase/ToRate";
import '../style/myPurchase.css';
import Failed from "../components/UI/myPurchase/Failed";

const MyPurchase = () => {

    return (
        <header className="MyPurchase-page" style={{ minHeight: '700px' }}>
            <div className="MyPurchase-log-cate" style={{ boxShadow: '0 2px 1px 0 rgba(0, 0, 0, .05)' }}>
                <NavLink
                    to="/MyPurchase/to-pay"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Chờ Thanh Toán</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/to-confirmation"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Chờ Xác Nhận</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/confirmed"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Đang Giao</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/received"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Hoàn Thành</span>
                </NavLink>
                <NavLink
                    to="/MyPurchase/failed"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Thất Bại</span>
                </NavLink>
                <NavLink
                    to="/feedback/to-rate"
                    className="MyPurchase-cate"
                    activeClassName="active"
                >
                    <span className="NavLink-text">Đánh Giá</span>
                </NavLink>
                
            </div>
                <div className="MyPurchase-log-Item">
                    <Routes>
                        <Route path="/to-pay" element={<ToPay />}/>
                        <Route path="/to-confirmation" element={<ToConfirmation />} />
                        <Route path="/confirmed" element={<Confirmed />} />
                        <Route path="/received" element={<Received />} />
                        <Route path="/failed" element={<Failed />} />
                    </Routes>

                </div>
        </header>
    );
};

export default MyPurchase;
