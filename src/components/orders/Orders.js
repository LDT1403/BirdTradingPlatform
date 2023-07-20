import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const Orders = (props) => {
    const { orders } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Tổng Tiền</th>
                    <th scope="col">Thanh Toán</th>
                    <th scope="col">Ngày Thanh Toán</th>
                    <th>Trạng Thái</th>
                    <th scope="col" className="text-end">
                        Xem
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders?.slice().reverse().map((order) => (
                    <tr key={order.orderId}>
                        <td>
                            <b>{order.userName}</b>
                        </td>
                        <td>{order.email}</td>
                        <td>₫ {numeral(order.totalPrice).format('0,0')}</td>
                        <td>
                            {order.status ? (
                                <span className="badge bg-success">
                                    Đã Thanh Toán {moment(order.paidAt).format("MMM Do YY")}
                                </span>
                            ) : (
                                <span className="badge bg-danger">
                                    Chưa Thanh Toán
                                </span>
                            )}
                        </td>
                        <td>{moment(order.orderDate).format("MMM Do YY")}</td>
                        <td>
                            {
                                order.toConfirm === 2 ? (
                                    <span className="badge bg-warning">Đang xử lý</span>
                                ) : order.toConfirm === 3 ? (
                                    <span className="badge bg-success">Đã xác nhận</span>
                                ) : order.toConfirm === 4 ? (
                                    <span className="badge bg-danger">Đã Hủy</span>
                                ) : (
                                    <span className="badge bg-info">Không xác định</span>
                                )
                            }
                        </td>
                        <td className="d-flex justify-content-end align-item-center">
                            <Link to={`/order/${order.orderId}`} className="text-success">
                                <i className="fas fa-eye"></i>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Orders;