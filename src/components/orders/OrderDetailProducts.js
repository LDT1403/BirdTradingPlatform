import numeral from "numeral";
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
                    <th style={{ width: "10%" }}>Hình ảnh</th>
                    <th style={{ width: "30%" }}>Tên Sản Phẩm</th>

                    <th style={{ width: "10%" }}>Giá</th>
                    <th style={{ width: "20%" }}>Giá Giảm</th>
                    <th style={{ width: "10%" }}>Số Lượng</th>
                    <th style={{ width: "20%" }} className="text-end">
                        Tổng
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
                            </Link>
                        </td>
                        <td> {item.nameProduct}</td>
                        <td>₫{numeral(item.soldPrice).format('0,0')}</td>
                        <td>₫{numeral(item.discountPrice).format('0,0')}</td>
                        <td>{item.quantity} </td>
                        <td className="text-end">₫ {numeral(item.totalDetail).format('0,0')}</td>
                    </tr>
                ))}

                <tr>
                    <td colSpan="6">
                        <article className="float-end">
                            {/* <dl className="dlist">
                                <dt>Subtotal:</dt> <dd>${order.totalAll}</dd>
                            </dl>
                            <dl className="dlist">
                                <dt>Shipping:</dt> <dd>
                                    {/* ${order.shippingPrice} */}
                            {/* </dd>
                            </dl>  */}
                            <dl className="dlist">
                                <dt>Tổng Tiền:</dt>
                                <dd>
                                    <b className="h5">₫ {numeral(order.totalAll).format('0,0')}</b>
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="text-muted">Trạng Thái:</dt>
                                <dd>
                                    {(order.paymentMethod === "VnPay" || order.receivedDate !== null) ? (
                                        <span className="badge rounded-pill alert alert-success text-success">
                                            Đã Thanh Toán
                                        </span>
                                    ) : (
                                        <span className="badge rounded-pill alert alert-danger text-danger">
                                            Chưa Thanh Toán
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