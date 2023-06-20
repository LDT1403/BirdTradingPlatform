import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux/cartSlice";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useRef } from 'react';
import ProductCard from "../components/UI/product-card/ProductCard";
import '../style/shop-detail.css';


const ShopDetail = () => {
    const id = useParams();
    const [productsData, setProductsData] = useState([]);
    const [infoShop, setInfoShop] = useState([]);
    const [details, setDetails] = useState([]);
    const [refreshPage, setRefreshPage] = useState(0);
    const scrollToTopRef = useRef(null);
    const [ListImg, setListImg] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        axios.get(`https://localhost:7241/api/Products/detail_product?id=${id.id}`)
            .then(resp => {
                setDetails(resp.data);
                axios.get(`https://localhost:7241/api/Products/Shop_Detail_Product?id=${resp.data.shopId}`)
                    .then(responseShop => {
                        setInfoShop(responseShop.data)
                    })
                axios.get(`https://localhost:7241/api/Products/List_Image_ProductID?productId=${resp.data.productId}`)
                    .then(res => {
                        setSelectedImage(res.data[0])
                        setListImg(res.data)
                    })
                axios.get(`https://localhost:7241/api/Products/Product_ShopId?shopId=${resp.data.shopId}`)
                    .then(resp => {
                        const maxProducts = resp.data.slice(0, 8); // Lấy tối đa 10 sản phẩm
                        setProductsData(maxProducts);
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [refreshPage]);


    const handleProductClick = () => {
        setRefreshPage(prevCount => prevCount + 1);
    };

    console.log(details.shopId)
    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                productId: details.productId,
                productName: details.productName,
                thumbnail: details.images[0],
                price: details.soldPrice,
                shopId: details.shopId,
            })

        );
    };
    const formatDescriptionValue = (text) => {
        return text.replace(/([A-ZĐÁÀẢẠÃĂẮẰẲẶẴÂẤẦẨẬẪÉÈẺẸẼÊẾỀỂỆỄÍÌỈỊĨÓÒỎỌÕÔỐỒỔỘỖƠỚỜỞỢỠÚÙỦỤŨƯỨỪỬỰỮÝỲỶỴỸ])/g, '-$1');
    };


    const feedback =
        [
            {
                userName: "Dinh Thanh",
                userImage: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/330973722_491663389838233_7275732520578483402_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=VqTcG6a48XwAX9xxRtS&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCBNL1cDmeJVRC1ErLB9sCR8hWa1xZF8nqVYVIQhtseww&oe=648AA0D8",
                feedbackText: "sản phẩm tạm ổn",
                rate_fb: 5,
                image_fb: [
                    "https://cf.shopee.vn/file/262b61bc7babfe00afb78d10ca72c682_tn",
                    "https://cf.shopee.vn/file/5a8d5a63ccc3776a3488f9377a716887_tn"
                ]
            },
            {
                userName: "Long Nhat",
                userImage: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/272861636_619618709102384_3040732955244006395_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=76bRZZt8GeMAX-ds1-C&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfADb-efNmUdn6y7YDWSYtcq_JC9Y8xyj9HC0UuCOj2Leg&oe=648B32D5",
                feedbackText: "Hàng ngon vãi ",
                rate_fb: 4,
                image_fb: [
                    "https://cf.shopee.vn/file/59e2c691601487c692dea145cf3433b2",
                    "https://cf.shopee.vn/file/927bf619bd9b3c4de3ab764e5317f8a8",

                ]
            }
        ]

    const countFeedback = (feedback) => {
        return feedback.length;
    };

    const totalFeedback = countFeedback(feedback);


    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const renderRating = () => {
        const filledStars = Math.floor(details.rate);
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

    function userRating(rating) {
        const filledStars = Math.floor(rating);
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
    const [galleryIndex, setGalleryIndex] = useState(0);

    const handleNextClick = () => {
        if (galleryIndex < ListImg.length - 4) {
            setGalleryIndex(galleryIndex + 1);
        }
    };

    const handlePrevClick = () => {
        if (galleryIndex > 0) {
            setGalleryIndex(galleryIndex - 1);
        }
    };
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    let currentImageSrc = null;
    const handleImageClick = (event, index) => {
        // Lấy src của ảnh đã click
        const clickedImageSrc = event.target.src;

        // Lấy user-imageView tương ứng với index
        const imageViewElement = document.querySelector(`.user-imageView-${index}`);

        // Lấy tất cả các ảnh trong user-listImage tương ứng với index
        const images = document.querySelectorAll(`.user-listImage-${index} img`);

        // Kiểm tra nếu đang hiển thị ảnh và ảnh đã click trùng nhau
        if (currentImageSrc === clickedImageSrc) {
            // Ẩn user-imageView
            imageViewElement.classList.add("hidden");
            currentImageSrc = null;

            // Đặt lại trạng thái của ảnh về ban đầu
            images.forEach((image) => {
                image.classList.remove("clicked");
            });
        } else {
            // Hiển thị ảnh đã click trong user-imageView
            imageViewElement.innerHTML = `<img src="${clickedImageSrc}" alt="Clicked Image" />`;
            imageViewElement.classList.remove("hidden");
            currentImageSrc = clickedImageSrc;

            // Đặt lại trạng thái của ảnh
            images.forEach((image) => {
                if (image.src === clickedImageSrc) {
                    image.classList.add("clicked");
                } else {
                    image.classList.remove("clicked");
                }
            });
        }
    };


    return (

        <div className="shopDetail" ref={scrollToTopRef} >
            <div className="detail-product">
                <div className="view-image">
                    <div sm="4" className="main-image">
                        <img src={selectedImage} alt="Selected Image" />
                    </div>
                    <div className="gallery-img">

                        <div className={`gallery-pre ${galleryIndex <= 0 ? "disabled" : ""}`} onClick={handlePrevClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>

                        </div>
                        <div className="gallery">
                            {ListImg.slice(galleryIndex, galleryIndex + 4).map((image, index) => (
                                console.log(image),
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    onMouseEnter={() => handleThumbnailClick(image)}
                                    className={`thumbnail ${image === selectedImage ? "active" : ""}`}
                                />
                            ))}
                        </div>
                        <div className={`gallery-next ${galleryIndex >= ListImg.length - 4 ? "disabled" : ""}`} onClick={handleNextClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                        </div>

                    </div>

                </div>
                <div className="viewInfor">
                    <div className="infor">
                        <div className="decription">{details.productName}</div>
                        <div className="productRate">
                            <div className="rate-detail">
                                <div className="num-rate">{details.rate}</div>
                                <div className="star-rate">{renderRating()}</div>
                            </div>
                            <div className="feedback-pro">
                                <div className="num-sold">{totalFeedback}</div>
                                <div className="text-sold"> Feed back</div>
                            </div>
                            <div className="quantitySold">
                                <div className="num-sold">{details.quantitySold}</div>
                                <div className="text-sold">Sold</div>
                            </div>
                        </div>
                    </div>
                    <div className="viewPrice">
                        {details.discountPercent !== 0 && (
                            <div className="price">{details.price}</div>
                        )}
                        <div className="soldPrice">{details.soldPrice}</div>
                        {details.discountPercent !== 0 && (
                            <div className="discount">{details.discountPercent}% Sale</div>
                        )}
                    </div>

                    {/* select quantity */}
                    <div className="quantityDetail">
                        <div className="quantityText">Quantity</div>
                        <div className="quantity-Select">
                            <button className="button-Select" onClick={decreaseQuantity}>-</button>
                            <input type="text" value={quantity} readOnly />
                            <button className="button-Select" onClick={increaseQuantity}>+</button>
                        </div>
                        <div className="quantityText">{details.quantity} products available</div>
                    </div>

                    {/* //  onClick={addToCart} */}
                    <div className="order">
                        <button className="addButton" onClick={addToCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconAdd">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                            Add to Cart
                        </button>

                        <button className="orderButton">
                            Order
                        </button>

                    </div>

                </div>
            </div>

            {/* Shop infomationg */}
            <div className="Shop-info">
                <Link to={`/viewShop/${infoShop.shopId}`} className="shopImg">
                    <img src={infoShop.avatar} alt="" />
                </Link>

                <div className="shop-1">
                    <div className="shop-Name">

                        {infoShop.shopName}


                    </div>
                    <div className="shopButton">
                        <Link to={`/viewShop/${infoShop.shopId}`}>
                            <button className="viewShop">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="iconShop">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg>

                                <div>View shop</div>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="shopInfo-details">
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Evaluate </div>
                        <div className="detail-value">{infoShop.rate} </div>
                    </div>
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Total Products </div>
                        <div className="detail-value">{infoShop.totalProduct} </div>
                    </div>
                </div>
                <div className="shopInfo-details">
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Participation date</div>
                        <div className="detail-value">"" </div>
                    </div>
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Address</div>
                        <div className="detail-value">{infoShop.address} </div>
                    </div>
                </div>
            </div>
            {/* Product Description */}
            <div className="description-product">
                <div className="description-text">
                    Product Detail:
                </div>
                <div className="description-value">
                    {details && details.detail && formatDescriptionValue(details.detail)}
                </div>
                <div className="description-text">
                    Product Description:
                </div>
                <div className="description-value">
                    {details && details.decription && formatDescriptionValue(details.decription)}
                </div>
            </div>
            {/* Feeback Product */}
            <div class="feedback-product">
                <div class="feedback-top">
                    <div className="feed-rate">
                        <div className="num-fb">{details.rate}</div>
                        <div className="text-fb">over 5</div>
                    </div>
                    <div className="star-fb">{renderRating()}</div>
                </div>
                <div className="feedback-body">
                    {feedback.map((user, index) => (
                        <div className="feedback-info" key={index}>
                            <div className="feedback-user">
                                <div className="userImage">
                                    <img src={user.userImage} alt="" />
                                </div>
                                <div className="user-name-rate">
                                    <div className="user-name">{user.userName}</div>
                                    <div className="user-rate">{userRating(user.rate_fb)}</div>
                                    <div className="user-text">{user.feedbackText}</div>
                                    <div className="user-image">
                                        <div className="user-listImage">
                                            {user.image_fb.map((item, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={item}
                                                    alt=""
                                                    onClick={(event) => handleImageClick(event, index)}
                                                />
                                            ))}
                                        </div>
                                        <div className={`user-imageView-${index}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* related products */}
            <div className="product-reldate">
                <div className="product-text">
                    Other products of the shop
                </div>
                <div className="product-item">
                    <Col lg='12' md=''>
                        <Container>
                            <Row>
                                {productsData?.map(item => (
                                    <Col lg='3' md='4' key={item.productId}>
                                        <ProductCard item={item} handleProductClick={handleProductClick} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Col>
                </div>

            </div>
        </div>
    )
}

export default ShopDetail;