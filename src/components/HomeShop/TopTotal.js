import axios from "axios";
import React, { useEffect, useState } from "react";

const TopTotal = (props) => {
    const { orders, products } = props;
    // let totalSale = 0;
    // if (orders) {
    //     orders.map((order) =>
    //         order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    //     );
    // }
    const [totalSale, setTotalSale] = useState(0)
    const accessToken = localStorage.getItem('jwtToken')
    useEffect(() => {
        axios.get('https://localhost:7241/api/Shop/ToTal_Revenue', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res.data);
                setTotalSale(res.data);
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
                            <h6 className="mb-1">Total Sales</h6>{" "}
                            <span>${totalSale.toFixed(0)}</span>
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
                            <h6 className="mb-1">Total Orders</h6>
                            {orders ? <span>{orders.length}</span> : <span>0</span>}
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
                            <h6 className="mb-1">Total Products</h6>
                            {products ? <span>{products.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default TopTotal;