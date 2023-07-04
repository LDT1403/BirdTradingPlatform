import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
    const { order } = props;

    // if (!loading) {
    //     // Calculate Price
    //     const addDecimals = (num) => {
    //         return (Math.round(num * 100) / 100).toFixed(2);
    //     };

    //     order.itemsPrice = addDecimals(
    //         // order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    //     );
    // }

    return (
        <table className="table border table-lg">
            <thead>
                <tr>
                    <th style={{ width: "40%" }}>Product</th>
                    <th style={{ width: "10%" }}>Price</th>
                    <th style={{ width: "20%" }}>Discount Price</th>
                    <th style={{ width: "10%" }}>Quantity</th>
                    <th style={{ width: "20%" }} className="text-end">
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.productDetails.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link className="itemside" to="#">
                                <div className="left">
                                    <img
                                        src={item.imagePath}
                                        alt={item.nameProduct}
                                        style={{ width: "40px", height: "40px" }}
                                        className="img-xs"
                                    />
                                </div>
                                <div className="info">{item.nameProduct}</div>
                            </Link>
                        </td>
                        <td>${item.soldPrice} </td>
                        <td>${item.discountPrice} </td>
                        <td>{item.quantity} </td>
                        <td className="text-end">{item.totalDetail}  VNĐ</td>
                    </tr>
                ))}

                <tr>
                    <td colSpan="5">
                        <article className="float-end">
                            <dl className="dlist">
                                <dt>Subtotal:</dt> <dd>${order.totalAll}</dd>
                            </dl>
                            <dl className="dlist">
                                <dt>Shipping:</dt> <dd>
                                    {/* ${order.shippingPrice} */}30$
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt>Grand total:</dt>
                                <dd>
                                    <b className="h5">${order.totalAll + 30}</b>
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="text-muted">Status:</dt>
                                <dd>
                                    {order.isPaid ? (
                                        <span className="badge rounded-pill alert alert-success text-success">
                                            Payment done
                                        </span>
                                    ) : (
                                        <span className="badge rounded-pill alert alert-danger text-danger">
                                            Not Paid
                                        </span>
                                    )}
                                </dd>
                            </dl>
                        </article>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default OrderDetailProducts;