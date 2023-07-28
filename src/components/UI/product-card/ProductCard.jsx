import React, { useState, useEffect } from "react";
import '../../../style/product-card.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import numeral from 'numeral';
import { useDispatch } from "react-redux";
import { listCarts } from "../../../pages/redux/Actions/CartActions";

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('jwtToken');
    const [ShowRepAdd, setShowRepAdd] = useState(false);
    const [repAdd, setRepAdd] = useState("");
    const navigate = useNavigate();
    const { productId, productName, thumbnail, price, quantitySold, rate, soldPrice, discountPercent, quantity, address } = props.item;
    const handleProductClick = props.handleProductClick;
    useEffect(() => {
        if (ShowRepAdd) {
            setTimeout(() => {
                setShowRepAdd(false);
            }, 1000);
        }
    }, [ShowRepAdd]);
    const addToCart = () => {
        const addProductNow =
        {
            quantity: 1,
            productID: productId
        }
        if (accessToken) {
            axios.post("https://localhost:7241/api/Order/Addtocart", addProductNow, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((rep) => {
                    setRepAdd(rep.data)
                    if (rep.data === "Sản phẩm đã được thêm vào Giỏ hàng!") {
                        dispatch(listCarts())
                        props.onReloadData();
                    }

                })

        }
        if (!accessToken) {
            navigate("/login");
        }

        setShowRepAdd(true)

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
        <div className="product-page1">
            <div className="product-tag" onClick={handleProductClick}>
                {
                    ShowRepAdd && (
                        <div className="confirmation-modal" style={{ background: 'none' }}>

                            {
                                repAdd !== "Sản phẩm đã được thêm vào Giỏ hàng!" && (
                                    <div className="confirm-checkout-OK" style={{ backgroundColor: 'rgb(0 0 0 / 73%)', width: 'auto', height: '200px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <i className="ri-error-warning-line" style={{ color: "red", fontSize: "70px" }} />
                                        </div>
                                        <div className="addToCart" style={{ display: 'flex', justifyContent: 'center', fontSize: '15px', fontWeight: '500', color: '#fff' }}>Số lượng thêm đã vượt quá giới hạn</div>
                                    </div>
                                )
                            }
                            {
                                repAdd === "Sản phẩm đã được thêm vào Giỏ hàng!" && (
                                    <div className="confirm-checkout-OK" style={{ backgroundColor: 'rgb(0 0 0 / 73%)', width: 'auto', height: '200px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <svg style={{ borderRadius: '100%', backgroundColor: '#fff', width: '70px', color: '#1cbf12', marginBottom: '30px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="addToCart" style={{ display: 'flex', justifyContent: 'center', fontSize: '15px', fontWeight: '500', color: '#fff' }}>{repAdd}</div>
                                    </div>
                                )
                            }

                        </div>
                    )
                }
                <Link to={`/shop/${productId}`} className="productDetail">
                    <img src={thumbnail} alt="Product Image" className="card-img-top" />
                </Link>
                <div class="cart-icon-product" onClick={addToCart}>
                    <button class="fas fa-cart-plus" ></button>
                    <div class="label-text">Thêm Giỏ Hàng</div>
                </div>

                <div className=" p-2">
                    <div className="card-title">
                        <Link to={`/shop/${productId}`}>
                            {truncateProductName(productName, 18)}
                        </Link>
                    </div>
                    <div className="card-text">
                        <span className="discount-price">
                            {discountPercent !== 0 && (
                                <span className="original-price"><div className="don-vi">₫</div>{numeral(price).format('0,0')}</span>
                            )}

                            <span className="discount-price-color"><div className="don-vi">₫</div>{numeral(soldPrice).format('0,0')}</span>
                        </span>
                        <span className="rate">{rate} {renderRating()}</span><br />
                        <span className="quantity-sold">Đã Bán: {quantitySold||0}</span>

                        {discountPercent !== 0 && (
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="discount-badge-icon">
                                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                </svg>
                                <div className="discount-badge">{discountPercent}%</div>
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
        </div>




    );
};

export default ProductCard;