import axios from "axios";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TopShop = (props) => {
    const { users, shops, totalorder } = props;

    console.log(totalorder)


    return (
        <div className="row">
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-primary">
                            <i className="text-primary ri-money-dollar-circle-fill" style={{ fontSize: "33px" }}></i>

                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng Doanh Thu</h6>{" "}
                            {totalorder.totalorder ? <span className="d-flex"><div className="don-vi">₫</div>{numeral(totalorder.totalorder.amountSystem.totalAmountSystem).format('0,0')}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-warning">
                            <i className=" text-danger fa-solid fa-hand-holding-dollar" style={{ fontSize: "28px" }}></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng Lợi Nhuận</h6>
                            {totalorder.totalorder ? <span className="d-flex"><div className="don-vi">₫</div>{numeral(totalorder.totalorder.profit.profitAdmin).format('0,0')} </span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-success">

                            <i className="text-success fa-solid fa-user"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng Khách Hàng</h6>
                            {users ? <span>{users.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-warning">

                            <i className="text-warning fa-solid fa-shop"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng Cửa Hàng</h6>
                            {shops ? <span>{shops.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>

        </div>
    );
};

export default TopShop;