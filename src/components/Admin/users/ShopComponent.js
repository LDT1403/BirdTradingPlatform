import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import { banShop, listShop, unbanShop } from "../../../pages/redux/Actions/userActions";
import logo from '../../../assets/images/account-circle-line.png'
import moment from "moment";
import { useState } from "react";
import ReportShop from "./ReportShop";
import numeral from "numeral";


const ShopComponent = () => {
    const dispatch = useDispatch();

    const shopList = useSelector((state) => state.shopList);
    const { loading, error, shops } = shopList;

    const banListShop = useSelector((state) => state.banShop);
    const { loading: loadingBaned, success: successBaned } = banListShop;

    const unbanListShop = useSelector((state) => state.unbanShop);
    const { loading: loadingunBaned, success: successunBaned } = unbanListShop;
    useEffect(() => {
        dispatch(listShop());
    }, [dispatch, successBaned, successunBaned]);
    const deleteHandler = (shopId) => {
        if (window.confirm("Are you sure?")) {
            dispatch(banShop(shopId));
        }
    };
    const UnBanHandler = (userId) => {
        dispatch(unbanShop(userId));

    };
    const [shopId, setShopId] = useState();
    const [userId, setUserId] = useState();
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [isBanned, setIsBanned] = useState(false);
    const handleBanUser = (userId) => {
        setIsBanned(true);
    };

    const handleReportSuccess = () => {
        setIsReportVisible(false);
    };
    const toggleForgotPassword = (shopId, userId) => {
        setUserId(userId);
        setShopId(shopId);
        setIsReportVisible(!isReportVisible);

    };
    const renderRating = (rate) => {
        const filledStars = Math.floor(rate);
        const emptyStars = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={filledStars + i} className="far fa-star"></i>);
        }

        return stars;
    };
    return (

        <section className="content-main">

            <div className="content-header">
                <h2 className="content-title">Cửa Hàng</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                {/* <header className="card-header bg-white">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="form-control p-2"
                            />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>Status</option>
                                <option>Active</option>
                                <option>Disabled</option>
                                <option>Show all</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>Show 20</option>
                                <option>Show 30</option>
                                <option>Show 40</option>
                            </select>
                        </div>
                    </div>
                </header> */}
                <div className="card-body">

                    <div className="table-responsive">
                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Tên </th>

                                        <th scope="col">Email</th>

                                        {/* <th scope="col">Address</th>
                                        <th scope="col">Phone</th> */}
                                        <th scope="col">Cửa Hàng</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Đánh giá</th>
                                        <th scope="col">Doanh Thu</th>
                                        {/* <th>Status</th> */}
                                        <th scope="col" >
                                            Tố Cáo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody  >
                                    {shops?.map((user, index) => (
                                        <tr key={index}>
                                            <td className="align-middle">{index + 1}</td>
                                            <td className="align-middle">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt="User" width="50" height="50" style={{ borderRadius: '50%', overflow: 'hidden' }} />
                                                ) : (
                                                    <img src={logo} alt="User" width="50" height="50" style={{ borderRadius: '50%', overflow: 'hidden' }} />
                                                )}
                                            </td>
                                            <td className="align-middle">
                                                <b>{user.username} </b>
                                            </td>
                                            <td className="align-middle">{user.email}</td>

                                            {/* <td className="align-middle">{user.addressHome}</td>
                                            <td className="align-middle">{user.phoneHome}</td> */}
                                            <td className="align-middle">{user.shopName}</td>
                                            <td className="align-middle">{user.phoneShop}</td>
                                            <td className="align-middle">{user.addressShop}</td>
                                            <td className="align-middle">{renderRating(user.rateShop)}</td>

                                            <td className="align-middle">₫ {numeral(user.totalRevenue).format('0,0')}</td>

                                            <td className="d-flex justify-content-end align-item-center">
                                                {(loadingunBaned || loadingBaned) && <Loading />}
                                                {!isBanned && (
                                                    <>
                                                        {user?.isActive === true ? (
                                                            <div onClick={() => toggleForgotPassword(user.shopId, user.userId)}>
                                                                <i className="ri-error-warning-line" style={{ color: "red", fontSize: "40px" }}></i>
                                                            </div>
                                                        ) : (
                                                            user.status === true && (
                                                                <>
                                                                    <div className="badge bg-danger mt-2 pt-2" style={{ marginRight: '5px' }}>
                                                                        Khóa
                                                                    </div>
                                                                    <button
                                                                        onClick={() => UnBanHandler(user.userId)}
                                                                        className="btn btn-sm btn-outline-success pb-2 mt-2"
                                                                    >
                                                                        <i className="ri-lock-unlock-line"></i>
                                                                    </button>
                                                                </>

                                                            )

                                                        )}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            {isReportVisible && (
                <ReportShop shopId={shopId}
                    userId={userId}
                    isVisible={isReportVisible}
                    onSuccess={handleReportSuccess}
                />
            )}
        </section>

    );
};

export default ShopComponent;