import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/logo bird.png";
import logo1 from "../../assets/images/Food.png";
import avatar from "../../assets/images/account-circle-line.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../style/header.css";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { logOut } from "../../pages/redux/apiRequest";
import HomeShop from "../../pageShop/HomeShop";



const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const nav__links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: "Shop",
      path: "/shop",
    },
    {
      display: "Cart",
      path: "/cart",
    },
    {
      display: "My Purchase",
      path: "/MyPurchase/to-pay",
    },
  ];
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isHovered, setIsHovered] = useState(false);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("jwtToken");
  const handleLogOut = () => {
    logOut(dispatch, navigate);
  };
  console.log(user);
  const isShopExist = user?.IsShop === "True";
  console.log(isShopExist);

  const profileActionRef = useRef(null);

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("header__shrink");
      } else {
        headerRef.current?.classList.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
            <h5>Bird Trading</h5>
          </div>
          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div
              className="menu d-flex align-items-center gap-5"
            // onClick={(event) => event.stopPropagation()}
            >
              <div className="header__closeButton">
                <span>
                  <i className="ri-close-fill"></i>
                </span>
              </div>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                // onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>

              <span className="cart__badge">{totalQuantity}</span>
            </span>
            <div className="profile">
              {user.UserId ? (
                <div
                  className="d-flex align-items-center justify-content-center profile__wrapper "
                  onClick={toggleProfileActions}
                >

                  <img
                    className="profile__image"
                    src={user.Avatar === "null" ? avatar : user.Avatar}
                    alt="User Profile"
                  />

                  <h6 className="profile__title">{user.unique_name}</h6>
                </div>
              ) : (
                <i className="ri-user-line" onClick={toggleProfileActions}>
                  {user.unique_name}
                </i>
              )}
              {/* <i className="ri-user-line" onClick={toggleProfileActions}>{user.unique_name}</i> */}
              <div
                className="profile__actions"
                ref={profileActionRef}
                onClick={toggleProfileActions}
              >
                {user.UserId ? (
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <Link to={isShopExist ? "/manageshop" : "/registerShop"}>
                      My Shop
                    </Link>
                    <Link to="/AccountUser">Account</Link>
                    <Link to="/logout" onClick={handleLogOut}>
                      Logout
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    Login
                    {/* <i className="ri-user-line"></i> */}
                  </Link>
                )}
              </div>
              {/* </Link> */}
            </div>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
