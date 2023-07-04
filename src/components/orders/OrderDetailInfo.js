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
                        <h6 className="mb-1">Customer</h6>
                        <p className="mb-1">
                            <label style={{ fontWeight: 'bold' }}>Name</label> : {order.userName} <br />
                            <label style={{ fontWeight: 'bold' }}>Email</label>: <a href={`mailto:${order.email}`}>{order.email}</a> <br />
                            <label style={{ fontWeight: 'bold' }}>Phone</label>: {order.phone}
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
                        <h6 className="mb-1">Order info</h6>
                        <p className="mb-1">
                            <label style={{ fontWeight: 'bold' }}>Shiping </label>
                            : {order.address}
                            <br />
                            <label style={{ fontWeight: 'bold' }}> Pay method{" "} </label>

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
                        <h6 className="mb-1">Deliver to</h6>
                        <p className="mb-1">
                            <label style={{ fontWeight: 'bold' }}> Address </label>
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