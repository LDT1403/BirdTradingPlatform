import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import { banUser, deleteUser, listUser, unbanUser } from "../../../pages/redux/Actions/userActions";
import logo from '../../../assets/images/Chim.png'
import moment from "moment";


const UserComponent = () => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    // const userDelete = useSelector((state) => state.userDelete);
    // const { error: errorDelete, success: successDelete } = userDelete;
    const banList = useSelector((state) => state.banUser);
    const { loading: loadingBaned, success: successBaned } = banList;
    useEffect(() => {
        dispatch(listUser());
    }, [dispatch, successBaned]);

    const deleteHandler = (userId) => {
        // if (window.confirm("Are you sure?")) {
        dispatch(banUser(userId));
        // }
    };

    const UnBanHandler = (userId) => {
        // if (window.confirm("Are you sure?")) {
        dispatch(unbanUser(userId));
        window.location.reload();
        // }
    };

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Customer</h2>
            </div>

            <div className="card mb-4 shadow-sm">
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
                                        <th scope="col">No</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">BrithDay</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col" className="text-end">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user, index) => (
                                        <tr key={user.userId}>
                                            <td className="align-middle">{index + 1}</td>
                                            <td className="align-middle">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt="User" width="50" height="50" style={{ borderRadius: '50%', overflow: 'hidden' }} />
                                                ) : (
                                                    <img src={logo} alt="User" width="50" height="50" style={{ borderRadius: '50%', overflow: 'hidden' }} />
                                                )}
                                            </td>
                                            <td className="align-middle">
                                                <b>{user.username}</b>
                                            </td>
                                            <td className="align-middle">{user.email}</td>
                                            <td className="align-middle">{user.gender}</td>
                                            <td className="align-middle">{moment(user.birth).format("DD/MM/YYYY")}</td>
                                            <td className="align-middle">{user.address}</td>
                                            <td className="align-middle">{user.phone}</td>
                                            <td className="d-flex justify-content-end align-item-center">
                                                {loadingBaned && <Loading />}
                                                {
                                                    user.status === false ? (
                                                        <button
                                                            onClick={() => deleteHandler(user.userId)}
                                                            className="btn btn-sm btn-outline-danger pb-2 mt-2"
                                                        >
                                                            <i class="ri-lock-line"></i>
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <div className="badge bg-danger mt-2 pt-2" style={{ marginRight: '5px' }}>
                                                                Baned
                                                            </div>
                                                            <button
                                                                onClick={() => UnBanHandler(user.userId)}
                                                                className="btn btn-sm btn-outline-success pb-2 mt-2"
                                                            >
                                                                <i class="ri-lock-unlock-line"></i>
                                                            </button>
                                                        </>
                                                    )
                                                }

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserComponent;
