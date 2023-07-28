import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/images/logo bird.png'

const Sidebar = () => {
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <div className="aside-top">
                    <nav>
                        <Link to="/manageshop" className="brand-wrap">
                            <img
                                src={logo}
                                style={{ height: "46" }}
                                className="logo"
                                alt="Ecommerce dashboard template"
                            />
                        </Link>

                        <h6 className="brand-wrap" style={{ fontSize: '20px', fontWeight: 'bold' }}>BirdTrading</h6>
                    </nav>


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
                                to="/manageshop"
                                exact={true}
                            >
                                <i className="icon fas fa-home"></i>
                                <span className="text">Thống Kê</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/products"
                            >
                                <i className="icon fas fa-shopping-bag"></i>
                                <span className="text">Sản Phẩm</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/addproduct"
                            >
                                <i className="icon fas fa-cart-plus"></i>
                                <span className="text">Thêm Sản Phẩm</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/category"
                            >
                                <i className="icon fas fa-list"></i>
                                <span className="text">Tài Khoản</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/orders"
                            >
                                <i className="icon ri-handbag-fill"></i>
                                <span className="text">Đơn Hàng</span>
                            </NavLink>
                        </li>
                        {/* <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/users"
                            >
                                <i className="icon fas fa-user"></i>
                                <span className="text">Users</span>
                            </NavLink>
                        </li> */}
                        {/* <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link disabled"
                                to="/sellers"
                            >
                                <i className="icon fas fa-store-alt"></i>
                                <span className="text">Sellers</span>
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