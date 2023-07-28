import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../../pages/redux/apiRequest";
import { useDispatch } from "react-redux";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut(dispatch, navigate);
    };
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <div className="aside-top">
                    <Link to="/dashboard" className="brand-wrap">
                        {/* <img
              src="/images/logo.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            /> */}
                    </Link>
                    <div>
                        <button className="btn btn-icon btn-aside-minimize">
                            <i className="text-muted fas fa-stream"></i>
                        </button>
                    </div>
                </div>

                <nav>
                    <ul className="menu-aside">
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/dashboard"
                                exact={true}
                            >
                                <i className="icon fas fa-home"></i>
                                <span className="text">Thống Kê</span>
                            </NavLink>
                        </li>
                        {/* <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/report"
                            >
                                <i className="icon fas fa-shopping-bag"></i>
                                <span className="text">Report</span>
                            </NavLink>
                        </li> */}
                        {/* <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/addproduct"
                            >
                                <i className="icon fas fa-cart-plus"></i>
                                <span className="text">Add product</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/category"
                            >
                                <i className="icon fas fa-list"></i>
                                <span className="text">Categories</span>
                            </NavLink>
                        </li> */}
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/shops"
                            >
                                <i class="icon ri-shopping-cart-fill"></i>
                                <span className="text">Cửa Hàng</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/users"
                            >
                                <i className="icon fas fa-user"></i>
                                <span className="text">Khách Hàng</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/logout"
                                onClick={handleLogOut}
                            >

                                <i className="icon fa-solid fa-right-from-bracket"></i>
                                <span className="text">Đăng Xuất</span>
                            </NavLink>
                        </li>
                        {/* <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link disabled"
                                to="/logout"
                                onClick={handleLogOut}
                            >
                                <i className="icon fas fa-store-alt"></i>
                                <span className="text">Logout</span>
                            </NavLink>
                        </li> */}

                        {/* <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link disabled"
                                to="/transaction"
                            >
                                <i className="icon fas fa-usd-circle"></i>
                                <span className="text">Transactions</span>
                            </NavLink>
                        </li> */}
                    </ul>
                    <br />
                    <br />
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;