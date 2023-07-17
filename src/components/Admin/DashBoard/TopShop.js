import axios from "axios";
import React, { useEffect, useState } from "react";

const TopShop = (props) => {
    const { users, shops } = props;
    const [totalReport, setTotalReport] = useState(0)
    const accessToken = localStorage.getItem('jwtToken')
    useEffect(() => {
        axios.get('https://localhost:7241/api/Admin/CountReport', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res.data);
                setTotalReport(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [accessToken]
    )


    return (
        <div className="row">
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-primary">
                            <i className="text-primary ri-money-dollar-circle-fill" style={{ fontSize: "33px" }}></i>

                        </span>
                        <div className="text">
                            <h6 className="mb-1">Total Report</h6>{" "}
                            <span>{totalReport.toFixed(0)}</span>
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-success">
                            <i className="text-success ri-handbag-fill" style={{ fontSize: "30px" }}></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Total Users</h6>
                            {users ? <span>{users.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-warning">
                            <i className="text-warning fas fa-shopping-basket"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Total Shops</h6>
                            {shops ? <span>{shops.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default TopShop;