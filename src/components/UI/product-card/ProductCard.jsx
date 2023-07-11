import React, { useState } from "react";
import '../../../style/product-card.css';
import { useDispatch } from "react-redux";
import cartSlice, { cartActions } from "../../../pages/redux/cartSlice";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { calcLength, useSpring } from "framer-motion";

const ProductCard = (props) => {
    const { productId, productName, thumbnail, price, quantitySold, rate, soldPrice, discountPercent, shopId, shopName, address } = props.item;
    const dispatch = useDispatch();
    const handleProductClick = props.handleProductClick;
    let countadd = 1;

    const addToCart = () => {

        if (countadd > 1) {

        }
        if (countadd === 1) {
            dispatch(
                cartActions.addItem({
                    productId,
                    productName,
                    thumbnail,
                    soldPrice,
                    quantity: 1,
                    shopId,
                    shopName,

                })

            );
            countadd++;
        }

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

        <div className="product-tag" onClick={handleProductClick}>
            <Link to={`/shop/${productId}`} className="productDetail">
                <img src={thumbnail} alt="Product Image" className="card-img-top" />
            </Link>
            <div class="cart-icon-product" onClick={addToCart}>
                <button class="fas fa-cart-plus" ></button>
                <span class="label-text">Add to Cart</span>
            </div>

            <div className=" p-2">
                <div className="card-title">
                    <Link to={`/shop/${productId}`}>
                        {truncateProductName(productName, 25)}
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

                    {discountPercent !== 0 && (
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="discount-badge-icon">
                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                            </svg>
                            <div className="discount-badge">   {discountPercent}%</div>
                        </div>
                    )}
                    <div className="address-product">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-address-product">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        {address}
                    </div>

                </div>
            </div>
        </div>



    );
};

export default ProductCard;