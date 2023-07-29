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
import { listCarts } from "../../pages/redux/Actions/CartActions";
import { toast } from "react-toastify";



const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const nav__links = [
    {
      display: "Trang Chủ",
      path: "/home",
    },
    {
      display: "Mua Sắm",
      path: "/shop",
    },
    {
      display: "Giỏ Hàng",
      path: "/cart",
    },
    {
      display: "Đơn Hàng Của Tôi",
      path: "/MyPurchase/confirmed",
    },
  ];

  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const [sub, setSub] = useState([])
  const cartList = useSelector((state) => state.cart);
  const { loading, error, carts } = cartList;

  useEffect(() => {
    const loadsub = () => {
      setSub(cartList.carts?.map((cart) => cart))
    };
    if (loading === false && error !== "Request failed with status code 401") {
      loadsub();
    }
    if (error === "Request failed with status code 401") {
      setSub([])
    }
  }, [loading]);

  useEffect(() => {
    dispatch(listCarts());
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isHovered, setIsHovered] = useState(false);
  console.log(loading);



  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("jwtToken");
  const handleLogOut = () => {
    logOut(dispatch, navigate);
  };




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
  const isShopExist = (user?.IsShop === "True" && user?.roleId === "SP");
  const isShopBan = (user?.IsShop === "True" && user?.roleId === "CUS");
  console.log(isShopExist)
  console.log(isShopBan)


  const checkShop = () => {
    if (user?.IsShop === "null" && user?.role === "CUS") {
      navigate('/registerShop');
    }
    if (user?.IsShop === "True" && user?.role === "SP") {
      navigate('/manageshop');
    }
    if (user?.IsShop === "True" && user?.role === "CUS") {
      toast.error("Tài khoản Shop không khả dụng", {
        autoClose: 1000,
      });
    }
  }

  const handleGotohome = () => {
    navigate("/home");
  }
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo" onClick={handleGotohome}>
            <img src={logo} alt="logo" />
            <div className="NameLogo">Bird Trading</div>
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
                <>
                  {(!user.UserId && item.display !== "Đơn Hàng Của Tôi") && (
                    (
                      <NavLink
                        to={item.path}
                        key={index}
                        className={(navClass) =>
                          navClass.isActive ? "active__menu" : ""
                        }
                      >
                        {item.display}
                      </NavLink>

                    )
                  )

                  }

                  {user.UserId && (
                    <NavLink
                      to={item.path}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive ? "active__menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  )}
                </>
                // <NavLink
                //   to={item.path}
                //   key={index}
                //   className={(navClass) =>
                //     navClass.isActive ? "active__menu" : ""
                //   }
                // // onClick={toggleMenu}
                // >
                //   {item.display}
                // </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart} style={{ fontSize: '35px' }}>
              <i className="ri-shopping-basket-line" ></i>

              <span className="cart__badge">{sub?.length || 0}</span>
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

                  <h6 className="profile__title" style={{ fontSize: '20px', fontWeight: 'bold' }}>{user.unique_name}</h6>
                </div>
              ) : (
                <i className="ri-user-line" style={{ fontSize: '28px' }} onClick={toggleProfileActions}>
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
                  <div className="d-flex align-items-center justify-content-left flex-column">

                    <div onClick={checkShop} style={{ fontSize: "18px" }}>
                      Cửa Hàng của Tôi
                    </div>
                    <Link to="/AccountUser">Tài Khoản</Link>
                    <Link to="/logout" onClick={handleLogOut}>
                      Đăng Xuất
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    Đăng Nhập
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
