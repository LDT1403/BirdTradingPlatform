import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//     deliverOrder,
//     getOrderDetails,
// } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import { cancelOrder, confirmOrder, getOrderDetails } from "../../pages/redux/Actions/OrderActions";

const OrderDetailmain = (props) => {

    const { orderId } = props;
    console.log(props)
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const orderComfirm = useSelector((state) => state.comfirmOrder);
    const { loading: loadingComfirmed, success: successConfirmed } = orderComfirm;
    useEffect(() => {

        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, successConfirmed]);

    const deliverHandler = () => {
        dispatch(confirmOrder(order));
    };
    const cancelHandler = () => {
        dispatch(cancelOrder(order));
        window.location.reload();
    };

    return (
        <section className="content-main">
            <div className="content-header">
                <Link to="/orders" className="btn btn-dark text-white">
                    Back To Orders
                </Link>
            </div>

            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div className="card">
                    <header className="card text-white bg-success p-3">
                        <div className="row align-items-center ">
                            <div className="col-lg-6 col-md-6">
                                <span>
                                    <i className="far fa-calendar-alt mx-2"></i>
                                    <b className="text-white">
                                        {moment(order.dateOrder).format("llll")}
                                    </b>
                                </span>
                                <br />
                                <small className="text-white mx-3 ">
                                    Order ID: {order.orderId}
                                </small>
                            </div>
                            {/* <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                                <select
                                    className="form-select d-inline-block"
                                    style={{ maxWidth: "200px" }}
                                >
                                    <option>Change status</option>
                                    <option>Awaiting payment</option>
                                    <option>Confirmed</option>
                                    <option>Shipped</option>
                                    <option>Delivered</option>
                                </select>
                                <Link className="btn btn-success ms-2" to="#">
                                    <i className="fas fa-print"></i>
                                </Link>
                            </div> */}
                        </div>
                    </header>
                    <div className="card-body">
                        {/* Order info */}
                        <OrderDetailInfo order={order} />

                        <div className="row">
                            <div className="col-lg-9">
                                <div className="table-responsive">
                                    <OrderDetailProducts order={order} loading={loading} />
                                </div>
                            </div>
                            {/* Payment Info */}
                            <div className="col-lg-3">
                                <div className="box shadow-sm bg-light">
                                    {order.toConfirm === 3 ? (
                                        <button className="btn btn-success col-12 mb-2">
                                            CONFIRMED ({" "}
                                            {moment(order.confirmDate).format("MMM Do YY")})
                                        </button>
                                    ) : (
                                        <>
                                            {loadingComfirmed && <Loading />}
                                            <button
                                                onClick={deliverHandler}
                                                className="btn btn-dark col-12 mb-2"
                                            >
                                                Confirm
                                            </button>
                                        </>
                                    )
                                    }

                                    <button
                                        onClick={cancelHandler}
                                        className="btn btn-dark col-12"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrderDetailmain;