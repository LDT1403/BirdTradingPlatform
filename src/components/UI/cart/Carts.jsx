import React from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import "../../../style/shopping-cart.css";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";

const Carts = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cart.carts)
    const toggleCart = () => {
        dispatch(cartUiActions.toggle())
    }

    return (
        <div className="cart__container" >
            <ListGroup className="cart">
                <div className="cart__close">
                    <span onClick={toggleCart}><i className="ri-close-fill"></i></span>
                </div>

                <div className="cart__item-list">
                    {
                        cartProducts === 0 ? <h6 className="text-center mt-5">Bạn Chưa có sản phẩm trong giỏ hàng</h6>
                            : cartProducts?.map((item, index) => (
                                <CartItem item={item} key={index} />
                            ))
                    }


                </div>

                <div className="cart__bottom d-flex align-items-center justify-content-between">

                    <button className="cart__bottom-btn" onClick={toggleCart}><Link to="/cart">Xem Giỏ Hàng</Link></button>
                </div>
            </ListGroup>

        </div>
    );
};

export default Carts;