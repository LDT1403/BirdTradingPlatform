import React, { useRef, useEffect, useState } from "react"
import { Container } from "reactstrap";
import logo from '../../assets/images/logo bird.png';
import { NavLink, Link } from "react-router-dom";
import '../../style/header.css'
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";


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
        display: "Contact",
        path: "/contact",
    },
];

const Header = () => {
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    console.log(user);
    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    const toggleCart = () => {
        dispatch(cartUiActions.toggle());
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("header__shrink");
            } else {
                headerRef.current.classList.remove("header__shrink");
            }
        });

        return () => window.removeEventListener("scroll");
    }, []);
    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <div className="logo" >
                        <img src={logo} alt="logo" />
                        <h5>Brid Trading</h5>
                    </div>
                    {/* ======= menu ======= */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div
                            className="menu d-flex align-items-center gap-5"
                        // onClick={(event) => event.stopPropagation()}
                        >
                            <div className="header__closeButton">
                                <span >
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
                        <span className="user">
                            {/* <Link to='/login'> */}
                            {user ? (
                                <> <Link to='/login'>
                                    <i className="ri-user-line"></i>
                                </Link>
                                    <span className="avatar"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}>
                                        <h6>{user.unique_name}</h6>
                                        {isHovered && (
                                            <div className="manager-info">
                                                {/* Display manager account */}
                                                <p>Manager Account</p>

                                                {/* Display logout option */}
                                                <p>Logout</p>
                                            </div>
                                        )}


                                        {/* <h6 onclick={toggleDiv}></h6>
                                    <div id="myDiv"> <Link to="/logout">Logout</Link></div> */}

                                        {/* <h6 onClick={toggleDiv}>{user.token}</h6>
                                    {!isVisible && <div><Link to="/logout">Logout</Link></div>} */}
                                        {/* <select>
                                            <option></option>
                                            <option><Link to="/logout" class="nav-link active" >Logout</Link></option>
                                        </select> */}
                                    </span>
                                </>
                            ) : (

                                <Link to='/login'>
                                    <i className="ri-user-line"></i>
                                </Link>
                            )

                            }
                            {/* </Link> */}
                        </span>
                        <span className="mobile__menu" onClick={toggleMenu} >
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header