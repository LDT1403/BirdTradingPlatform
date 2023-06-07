import React from "react";
import '../../../style/product-card.css';
import { useDispatch } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";


const ProductCard = (props) => {
    const { id, title, images, price } = props.item;
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                title,
                images,
                price,
            })

        );
    };

    return (
        <div className="product__item d-flex flex-column justify-content-between mt-5">
            <div className="product__content">
                <img className="product__img w-50" src={images} alt="Pizza" />
                <h5>
                    <Link to={`/bird/${id}`}>{title}</Link>
                </h5>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between">
                <span className="product__price mb-2">{price} $ </span>
                <button className="addTOCART__btn" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;