import React from "react";
import { ListGroupItem } from "reactstrap";
import "../../../style/cart-item.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import numeral from "numeral";

const CartItem = ({ item }) => {
    const navigate = useNavigate()
    const { productId, productName, cartId, imageProduct, priceProduct } = item || {}
    const cart = useSelector((state) => state.cart.carts)
    const dispatch = useDispatch()
    console.log(cart);
    const toggleCart = () => {
        dispatch(cartUiActions.toggle())
    }
    function truncateProductName(productName, maxLength) {
        if (productName.length <= maxLength) {
            return productName;
        } else {
            return productName.substring(0, maxLength) + '...';
        }
    }
    const handleclick = () => {
        toggleCart();
        navigate(`/shop/${productId}`)
    }
    return (
        <ListGroupItem className="border-0 cart__item">
            <div className="cart__item-info d-flex gap-2" onClick={handleclick}>
                <img src={imageProduct} alt="product-img" />
                <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div>
                        <h6 className="cart__product-title">{truncateProductName(productName, 25)}</h6>
                        <p className="d-flex align-items-center  gap-5 cart__product-price"> ₫ {numeral(priceProduct).format('0,0')}</p>
                    </div>
                </div>
            </div>
        </ListGroupItem>
    )
}

export default CartItem;