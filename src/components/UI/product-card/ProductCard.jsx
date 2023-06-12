import React from "react";
import '../../../style/product-card.css';
import { useDispatch } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";


const ProductCard = (props) => {
    const { productId, productName, thumbnail, price, quantitySold, rate, soldPrice, discountPercent } = props.item;
    const dispatch = useDispatch();



    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                productId,
                productName,
                thumbnail,
                price,
            })

        );
    };
    const renderRating = () => {
        const filledStars = Math.floor(rate);
        const emptyStars = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={filledStars + i} className="far fa-star"></i>);
        }

        return stars;
    };

    return (

        <div className="product-tag card mt-3">
            <img src={thumbnail} alt="Product Image" className="card-img-top" />
            <div className="card-body">
                <div className="card-title"><Link to={`/shop/${productId}`}>{productName}</Link></div>
                <p className="card-text">
                    {soldPrice && (
                        <span className="original-price">Price: {soldPrice}$ </span>
                    )}
                    <br />
                    <span className="discount-price">Sale Price: <span className="discount-price-color">{price}$</span></span><br />
                    <span className="rate">Rating: {renderRating()}</span><br />
                    <span className="quantity-sold">Quantity Sold: {quantitySold}</span>
                    {discountPercent && (
                        <span className="discount-badge">{discountPercent}%</span>
                    )}

                    <div className="text-center mt-2">
                        <button className="addTOCART__btn" onClick={addToCart}>
                            Add to Cart
                        </button>
                    </div>
                </p>
            </div>
        </div>
    );
};

export default ProductCard;