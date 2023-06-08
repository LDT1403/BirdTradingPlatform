import React from "react";
import '../../../style/product-card.css';
import { useDispatch } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";


const ProductCard = (props) => {
    const { productId, name, image, price, quantitySold, rate, discountPercent } = props.item;
    const dispatch = useDispatch();



    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                productId,
                name,
                image,
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
        // <div className="product__item d-flex flex-column justify-content-between mt-5">
        //     <div className="product__content">
        //         <img className="product__img w-50" src={image} alt="Bird" />
        //         <h5>
        //             <Link to={`/bird/${productId}`}>{name}</Link>
        //         </h5>
        //     </div>
        //     <div className="d-flex flex-column align-items-center justify-content-between">
        //         <span className="product__price mb-2">{price} $ </span>
        //         <button className="addTOCART__btn" onClick={addToCart}>
        //             Add to Cart
        //         </button>
        //     </div>
        // </div>
        <div className="product-tag card">
            <img src={image} alt="Product Image" className="card-img-top" />
            <div className="card-body">
                <h3 className="card-title"><Link to={`/bird/${productId}`}>{name}</Link></h3>
                <p className="card-text">
                    <span className="original-price">Price: {price}$</span><br />
                    <span className="discount-price">Discount Price: <span className="discount-price-color">{discountPercent}$</span></span><br />
                    <span className="rate">Rating: {renderRating()}</span><br />
                    <span className="quantity-sold">Quantity Sold: {quantitySold}</span>
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