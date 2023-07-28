import React from "react";

const OrderDetailInfo = (props) => {
    const { order } = props;
    console.log(order)
    return (
        <div className="row mb-5 order-info-wrap">
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-user" style={{ backgroundColor: "#b2d8b2", borderRadius: '50%', padding: '8px' }}></i>
                    </span>
                    <div className="text">
                        <h6 className="mb-1">Khách Hàng</h6>
                        <p >
                            <label style={{ fontWeight: 'bold' }}>Tên</label> : {order.userName} <br />
                            <label style={{ fontWeight: 'bold' }}>Email</label>: <a href={`mailto:${order.email}`}>{order.email}</a> <br />
                            <label style={{ fontWeight: 'bold' }}>Số Điện Thoại</label>: {order.phone}
                        </p>

                    </div>
                </article>
            </div >
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-truck-moving" style={{ backgroundColor: "#b2d8b2", borderRadius: '50%', padding: '8px' }}></i>
                    </span>
                    <div className="text">
                        <h6 className="mb-1">Thông Tin Đơn Hàng</h6>
                        <p >
                            <label style={{ fontWeight: 'bold' }}>Vận Chuyển </label>
                            : {order.address}
                            <br />
                            <label style={{ fontWeight: 'bold' }}> Phương Thức Thanh Toán{" "} </label>

                            :{order.paymentMethod}
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-map-marker-alt" style={{ backgroundColor: "#b2d8b2", borderRadius: '50%', padding: '8px' }}></i>
                    </span>
                    <div className="text">
                        <h6 className="mb-1">Thông Tin Nhận Hàng</h6>
                        <p>
                            <label style={{ fontWeight: 'bold' }}> Địa Chỉ </label>
                            : {order.addressDetail}
                            <br />
                            {order.address}
                            {/* <br /> {order.shippingAddress.postalCode} */}
                        </p>
                    </div>
                </article>
            </div>
        </div >
    );
};

export default OrderDetailInfo;