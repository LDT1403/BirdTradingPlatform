import React, { useEffect } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../pages/redux/Actions/OrderActions";
import { useState } from "react";

const OrderMain = () => {

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const [statusFilter, setStatusFilter] = useState("Tất Cả");
    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };
    const filteredOrders = orders?.filter((order) => {
        if (statusFilter === "Tất Cả") {
            return true;
        } else if (statusFilter === "Đang Xử Lý") {
            return order.toConfirm === 2;
        } else if (statusFilter === "Đã Xác Nhận") {
            return (order.toConfirm === 3 && order.receivedDate === null);
        } else if (statusFilter === "Đã Hủy") {
            return order.toConfirm === 4;
        } else if (statusFilter === "Hoàn Thành") {
            return (order.toConfirm === 3 && order.receivedDate !== null);
        }
        return false;
    });
    console.log(filteredOrders)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    return (
        <section className="content-main">
            {/* <div className="content-header">
                <h2 className="content-title">Đơn Hàng</h2>
            </div> */}

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            {/* <input
                                type="text"
                                placeholder="Search..."
                                className="form-control p-2"
                            /> */}
                            <div style={{ fontSize: '30px' }}>Đơn Hàng</div>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select" onChange={handleStatusFilterChange}>
                                <option>Tất Cả</option>
                                <option>Đang Xử Lý</option>
                                <option>Đã Xác Nhận</option>
                                <option>Đã Hủy</option>
                                <option>Hoàn Thành</option>
                            </select>

                        </div>
                        {/* <div className="col-lg-2 col-6 col-md-3">
                            <i className="fa-solid fa-filter"></i>
                        </div> */}
                    </div>
                </header>
                <div className="card-body">
                    <div className="table-responsive">
                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : (
                            <Orders orders={filteredOrders} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderMain;