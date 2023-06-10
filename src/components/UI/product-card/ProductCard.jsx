import React from "react";
import '../../../style/product-card.css';
import { useDispatch } from "react-redux";
import { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";
import ShopDetail from "../../../pages/ShopDetail";


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
<<<<<<< HEAD
            <img src={thumbnail} alt="Product Image" className="card-img-top" />
            <div className="card-body">
                <h3 className="card-title"><Link to={`/shop/${productId}`}>{productName}</Link></h3>
                <p className="card-text">
                    {soldPrice && (
                        <span className="original-price">Price: {soldPrice}$ </span>
                    )}
                    <br />
                    <span className="discount-price">Sale Price: <span className="discount-price-color">{price}$</span></span><br />
                    <span className="rate">Rating: {renderRating()}</span><br />
=======
            <Link to={`/shop/${productId}`}>
                <img src={image} alt="Product Image" className="card-img-top" />
                <ShopDetail
                id = {productId}/>
            </Link>
            <div className="card-body">
                <h3 className="card-title">
                    <Link to={`/shop/${productId}`}>{name}</Link>
                </h3>
                <p className="card-text">
                    <span className="original-price">Price: {price}$</span>
                    <br />
                    <span className="discount-price">
                        Discount Price: <span className="discount-price-color">{discountPercent}$</span>
                    </span>
                    <br />
                    <span className="rate">Rating: {renderRating()}</span>
                    <br />
>>>>>>> 8e50a3f0b306614235b75889ab5de7f30cb20f8b
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