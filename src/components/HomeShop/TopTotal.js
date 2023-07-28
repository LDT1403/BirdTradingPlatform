import axios from "axios";
import { data } from "jquery";
import numeral from "numeral";
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
        axios.get('https://birdtradingplatformapi.azurewebsites.net/api/Shop/ToTal_Revenue', {
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
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-primary">
                            <i className="text-primary ri-money-dollar-circle-fill" style={{ fontSize: "33px" }}></i>

                        </span>
                        <div className="text d-flex justify-content-between">
                            <div style={{ marginRight: "50px" }}>
                                <div className="mb-1" >Tổng Tiền</div>{" "}
                                <span className="d-flex ">₫ {numeral(totalSale.totalRevenue).format('0,0')}</span>
                            </div>
                            <div>

                            </div>

                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-success">

                            <i className="text-danger fa-solid fa-wallet" style={{ fontSize: "30px" }}></i>
                        </span>
                        <div className="text">
                            <p className="mb-0 d-flex"><nav style={{ fontWeight: "bold", marginRight: '5px' }}> Phí sàn:  </nav >  ₫ {numeral(totalSale.fee).format('0,0')}</p>

                            <p className="mb-0 d-flex"> <nav style={{ fontWeight: "bold", marginRight: '5px' }}> Lợi nhuận:  </nav>  ₫ {numeral(totalSale.lastTotalP).format('0,0')}</p>
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-success">
                            <i className="text-success ri-handbag-fill" style={{ fontSize: "30px" }}></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng Đơn Hàng</h6>
                            {orders ? <span>{orders.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                        <span className="icon icon-sm rounded-circle alert-warning">
                            <i className="text-warning fas fa-shopping-basket"></i>
                        </span>
                        <div className="text">
                            <h6 className="mb-1">Tổng sản phẩm</h6>
                            {products ? <span>{products.length}</span> : <span>0</span>}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default TopTotal;