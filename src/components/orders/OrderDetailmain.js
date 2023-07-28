import React, { useEffect, useState } from "react";
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
import OrderCancel from "./OrderCancel";

const OrderDetailmain = (props) => {

    const [confirmed, setConfirmed] = useState(false);
    const { orderId } = props;
    console.log(props)
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const orderComfirm = useSelector((state) => state.comfirmOrder);
    const { loading: loadingComfirmed, success: successConfirmed } = orderComfirm;
    const orderCancel = useSelector((state) => state.cancelOrder);
    const { loading: loadingCanceled, success: successCanceled } = orderCancel;


    useEffect(() => {

        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, successConfirmed, successCanceled]);

    const deliverHandler = () => {
        setConfirmed(true);
        dispatch(confirmOrder(order));
    };
    const cancelHandler = () => {
        setConfirmed(false);
        dispatch(cancelOrder(order));
    };
    const [showCancel, setShowCancel] = useState(false);

    const toggle = () => {
        setShowCancel(true);
    }
    const handleCancelSuccess = () => {
        setShowCancel(false);
    };



    return (
        <section className="content-main">
            <div className="content-header">
                <Link to="/orders" className="btn btn-dark text-white">
                    Quay Về
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
                                        {moment(order.dateOrder).format("DD/MM/YYYY HH:MM")}
                                    </b>
                                </span>
                                <br />
                                <small className="text-white mx-3 ">
                                    Mã Đơn Hàng: {order.orderId}
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
                                    {loadingCanceled && <Loading />}
                                    {(order.toConfirm === 3 && order.receivedDate === null) ? (
                                        <button className="btn btn-primary col-12 mb-2 ">
                                            Đã Xác Nhận ({moment(order.confirmDate).format("DD/MM/YYYY")})
                                        </button>
                                    ) : (order.toConfirm === 3 && order.receivedDate !== null) ? (
                                        <button className="btn btn-success col-12 mb-2">
                                            Hoàn Thành ({moment(order.receivedDate).format("DD/MM/YYYY")})
                                        </button>
                                    ) : order.toConfirm === 4 ? (
                                        <button className="btn btn-danger col-12 mb-2">
                                            Đã Hủy ({moment(order.cancelDate).format("DD/MM/YYYY")})
                                        </button>
                                    ) : (
                                        <>
                                            {loadingComfirmed && <Loading />}

                                            {confirmed ? (
                                                <button className="btn btn-dark col-12 mb-2" disabled>
                                                    Xác Nhận
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={deliverHandler}
                                                    className="btn btn-dark col-12 mb-2"
                                                >
                                                    Xác Nhận
                                                </button>
                                            )}
                                            {confirmed ? (
                                                <button className="btn btn-dark col-12" disabled>
                                                    Hủy
                                                </button>
                                            ) : (
                                                <button onClick={toggle} className="btn btn-dark col-12">
                                                    Hủy
                                                </button>
                                            )}
                                            {

                                                showCancel && (
                                                    <OrderCancel orderId={orderId} isVisible={showCancel}
                                                        onSuccess={handleCancelSuccess} />
                                                )
                                            }
                                        </>
                                    )}



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