import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
    const { loading, error, orders } = props;

    return (
        <div className="card-body">
            <h4 className="card-title">New orders</h4>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                            {orders && orders.slice(0, 5)?.reverse().map((order) => (
                                <tr key={order.orderId}>
                                    <td>
                                        <p>{order.name}</p>
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
                                    <td>{moment(order.orderDate).calendar()}</td>
                                    <td className="d-flex justify-content-end align-item-center">
                                        <Link to={`/order/${order.orderId}`} className="text-success">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


export default LatestOrder;