import React from "react";
import '../../../style/product-card.css';
import { useDispatch } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";


const ProductCard = (props) => {

    const { productId, productName, thumbnail, price, quantitySold, rate, soldPrice, discountPercent } = props.item;
    const dispatch = useDispatch();
    const handleProductClick = props.handleProductClick;


    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                productId,
                productName,
                thumbnail,
                soldPrice,
                quantity:1,
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
    function truncateProductName(productName, maxLength) {
        if (productName.length <= maxLength) {
            return productName;
        } else {
            return productName.substring(0, maxLength) + '...';
        }
    }
    return (
        <div className="product-tag card" onClick={handleProductClick}>
            <Link to={`/shop/${productId}`} className="productDetail">
                <img src={thumbnail} alt="Product Image" className="card-img-top" />
            </Link>

            <div className="card-body">
                <div className="card-title">
                    <Link to={`/shop/${productId}`}>
                        {truncateProductName(productName, 24)}
                    </Link>
                </div>
                <div className="card-text">
                    {discountPercent !== 0 && (
                        <span className="original-price">Price: {price}$ </span>
                    )}
                    <br />
                    <span className="discount-price">Sale Price: <span className="discount-price-color">{soldPrice}$</span></span><br />
                    <span className="rate">{rate} {renderRating()}</span><br />
                    <span className="quantity-sold">Quantity Sold: {quantitySold}</span>
                    {discountPercent && (
                        <span className="discount-badge">{discountPercent}%</span>
                    )}

                    <div className="text-center mt-2">
                        <button className="addTOCART__btn" onClick={addToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;