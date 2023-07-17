import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
    const { orders } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Date</th>
                    <th>Status</th>
                    <th scope="col" className="text-end">
                        Action
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
                        <td>${order.totalPrice}</td>
                        <td>
                            {order.status ? (
                                <span className="badge bg-success">
                                    Paid At {moment(order.paidAt).format("MMM Do YY")}
                                </span>
                            ) : (
                                <span className="badge bg-danger">
                                    Not Paid
                                </span>
                            )}
                        </td>
                        <td>{moment(order.orderDate).format("MMM Do YY")}</td>
                        <td>
                            {
                                order.toConfirm === 2 ? (
                                    <span className="badge bg-warning">Proceesing</span>
                                ) : order.toConfirm === 3 ? (
                                    <span className="badge bg-success">Confirmed</span>
                                ) : order.toConfirm === 4 ? (
                                    <span className="badge bg-danger">Cancel</span>
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