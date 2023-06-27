import React from "react";
import { ListGroupItem } from "reactstrap";
import "../../../style/cart-item.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
    const { productId, productName, thumbnail, soldPrice, quantity, totalPrice } = item || {}

    const dispatch = useDispatch()

    const incrementItem = () => {
        dispatch(cartActions.addItem({
            productId,
            productName,
            soldPrice,
            thumbnail,
<<<<<<< HEAD
            quantity: 1,
=======
            quantity:1
>>>>>>> 97e3a9c740c9b5403ab61b70ce5d02036c2a0b23
        }))
    }
    const decrementItem = () => {
        dispatch(cartActions.removeItem(productId))
    }
    const deleteItem = () => {
        dispatch(cartActions.deleteItem(productId))
    }
    function truncateName(productName, maxLength) {
        if (productName.length <= maxLength) {
            return productName;
        } else {
            return productName.substring(0, maxLength) + '...';
        }
    }
    return (
        <ListGroupItem className="border-0 cart__item">
            <div className="cart__item-info d-flex gap-2">
                <Link to={`/shop/${productId}`}>
                    <img src={thumbnail} alt="product-img" /></Link>
                <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div>
                        <h6 className="cart__product-title">{truncateName(productName,25)}</h6>
                        <p className="d-flex align-items-center  gap-5 cart__product-price">{quantity}x <span>{soldPrice}$</span></p>
                        {/* <div className="d-flex align-items-center justify-content-between
                         increase__decrease-btn">
                            <span className="increase__btn" onClick={incrementItem}><i className="ri-add-line"></i></span>
                            <span className="quantity justify-content-center">{quantity}</span>
                            <span className="decrease__btn" onClick={decrementItem}><i className="ri-subtract-line"></i></span>

                        </div> */}
                    </div>

                    <span onClick={deleteItem}>
                        <i className="ri-close-line"></i></span>

                </div>
            </div>
        </ListGroupItem>
    )
}

export default CartItem;