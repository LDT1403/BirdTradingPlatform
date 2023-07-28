import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { useRef } from 'react';
import { useDispatch } from "react-redux";

import ProductCard from "../components/UI/product-card/ProductCard";
import '../style/shop-detail.css';
import numeral from 'numeral';
import UserReportShop from "../components/UI/UserRepostShop/UserReportShop";
import { listCarts } from "./redux/Actions/CartActions";

const ShopDetail = () => {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('jwtToken');
    const idpro = useParams();
    const [productsData, setProductsData] = useState([]);
    const [infoShop, setInfoShop] = useState([]);
    const [details, setDetails] = useState([]);
    const [refreshPage, setRefreshPage] = useState(0);
    const scrollToTopRef = useRef(null);
    const navigate = useNavigate();
    const [ListImg, setListImg] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [quantity, setQuantity] = useState(1);
    const [feedback, setFeedback] = useState([]);
    const [showReportShop, setShowReportShop] = useState(false);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const [selectedRate, setSelectedRate] = useState(0);
    const [feedbackCounts, setFeedbackCounts] = useState({});
    const [ShowRepAdd, setShowRepAdd] = useState(false);
    const [repAdd, setRepAdd] = useState("");
    const [ShowRepAddFailed, setShowRepAddFailed] = useState(false);
    const reloadData = () => {

    };

    useEffect(() => {
        if (ShowRepAdd) {
            setTimeout(() => {
                setShowRepAdd(false);
            }, 2000);
        }
    }, [ShowRepAdd]);

    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Products/detail_product?id=${idpro.id}`)
            .then(resp => {
                setDetails(resp.data);

                axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Products/Shop_Detail_Product?id=${resp.data.shopId}`)
                    .then(responseShop => {
                        setInfoShop(responseShop.data)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Products/List_Image_ProductID?productId=${resp.data.productId}`)
                    .then(res => {
                        setSelectedImage(res.data[0])
                        setListImg(res.data)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/FeedBack?productID=${resp.data.productId}`)
                    .then(resp => {
                        setFeedback(resp.data);
                        setFilteredFeedback(resp.data);


                    })
                    .catch((err) => {
                        console.log(err);
                    });
                axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Products/Product_ShopId?shopId=${resp.data.shopId}`)
                    .then(resp => {
                        const maxProducts = resp.data.slice(0, 12);
                        setProductsData(maxProducts);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            })
            .catch(err => {
                console.log(err)
            })
    }, [refreshPage, idpro.id]);
    useEffect(() => {
        calculateFeedbackCounts();
    }, [feedback]);
    const handleFilter = (rate) => {
        if (rate === selectedRate) {
            setSelectedRate(0);
            setFilteredFeedback(feedback);
        } else {
            setSelectedRate(rate);
            const filtered = feedback.filter((item) => item.rate === rate);
            setFilteredFeedback(filtered);
        }
    };

    const calculateFeedbackCounts = () => {
        const counts = feedback.reduce((acc, item) => {
            const rate = item.rate;
            acc[rate] = (acc[rate] || 0) + 1;
            return acc;
        }, {});
        setFeedbackCounts(counts);
    };


    const addToCart = (productId) => {

        const addProductNow =
        {
            quantity: quantity,
            productID: productId
        }
        if (accessToken) {
            axios.post("https://birdtradingplatformapi.azurewebsites.net/api/Order/Addtocart", addProductNow, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((rep) => {
                    if (rep.data !== 'Sản phẩm đã được thêm vào Giỏ hàng!') {
                        setShowRepAddFailed(true);
                        setRepAdd(rep.data)
                        setQuantity(1)

                    }
                    if (rep.data === 'Sản phẩm đã được thêm vào Giỏ hàng!') {
                        setRepAdd(rep.data)
                        setQuantity(1)
                        setShowRepAdd(true);
                        dispatch(listCarts());

                    }

                })

        }
        if (!accessToken) {
            navigate("/login");
        }



    };
    const handleCheckoutOk = () => {
        setShowRepAddFailed(false);
    }
    function formatDescriptionValue(description) {
        if (!description) {
            return null;
        }

        const formattedValue = description.replace(/^(.*)$/gm, ' $1');
        return formattedValue;
    }



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


    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = (detail) => {
        if (quantity < detail.quantity) {
            setQuantity(quantity + 1);
        }

    };
    let currentImageSrc = null;
    const handleImageClick = (event, index) => {
        const clickedImageSrc = event.target.src;
        const imageViewElement = document.querySelector(`.user-imageView-${index}`);
        const images = document.querySelectorAll(`.user-listImage-${index} img`);
        if (currentImageSrc === clickedImageSrc) {
            imageViewElement.classList.add("hidden");
            currentImageSrc = null;
            images.forEach((image) => {
                image.classList.remove("clicked");
            });
        } else {
            imageViewElement.innerHTML = `<img src="${clickedImageSrc}" alt="Clicked Image" style="max-width: 300px; max-height: 300px;" />`;
            imageViewElement.classList.remove("hidden");
            currentImageSrc = clickedImageSrc;
            images.forEach((image) => {
                if (image.src === clickedImageSrc) {
                    image.classList.add("clicked");
                } else {
                    image.classList.remove("clicked");
                }
            });
        }
    };
    const orderSelect = {
        [details.productId]: {
            shopId: infoShop.shopId,
            shopName: infoShop.shopName,
            productId: details.productId,
            productName: details.productName,
            thumbnail: ListImg[0],
            quantity: quantity,
            soldPrice: details.soldPrice,
            totalPrice: quantity * details.soldPrice,
            cartId: 0,
        }
    }

    const handleBuyNow = () => {
        navigate("/checkout", { state: { orderSelect } });


    }
    const handleReported = () => {
        setShowReportShop(true)
    }

    return (

        <div className="shopDetail" ref={scrollToTopRef} >
            {ShowRepAddFailed === true && (
                <div className="confirmation-modal">
                    <div className="confirm-checkout-OK" style={{ width: '600px' }}>
                        <div className="confirm-checkout-text"> {repAdd}</div>
                        <button style={{ width: '200px' }} onClick={handleCheckoutOk}>OK</button>
                    </div>

                </div>
            )}
            {
                ShowRepAdd && (
                    <div className="confirmation-modal" style={{ background: 'none' }}>
                        <div className="confirm-checkout-OK" style={{ backgroundColor: 'rgb(0 0 0 / 73%)', width: 'auto', height: '200px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                <svg style={{ borderRadius: '100%', backgroundColor: '#fff', width: '70px', color: '#1cbf12', marginBottom: '30px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="addToCart" style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: '500', color: '#fff' }}>{repAdd}</div>

                        </div>

                    </div>
                )
            }
            {
                showReportShop && (
                    <UserReportShop shopId={infoShop.shopId} setShowReportShop={setShowReportShop} />
                )
            }
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
                            <div className="productRate1">
                                <div className="rate-detail">
                                    <div className="num-rate">{details.rate}</div>
                                    <div className="star-rate">{renderRating()}</div>
                                </div>
                                <div className="feedback-pro">
                                    <div className="num-sold">{totalFeedback}</div>
                                    <div className="text-sold"> Đánh Giá</div>
                                </div>
                                <div className="quantitySold">
                                    <div className="num-sold">{details.quantitySold || 0}</div>
                                    <div className="text-sold">Đã Bán</div>
                                </div>
                            </div>

                          
                                <button onClick={handleReported} style={{ border: 'none', backgroundColor: '#fff', height: '40px', display: 'flex', alignItems: 'center' }}>
                                    <i className="ri-error-warning-line" style={{ color: "red", fontSize: "40px" }} />
                                </button>
                          
                        </div>
                    </div>
                    <div className="viewPrice">
                        {details.discountPercent !== 0 && (
                            <div className="price"><div className="don-vi">₫</div>{numeral(details.price).format('0,0')}</div>
                        )}
                        <div className="soldPrice"><div className="don-vi">₫</div>{numeral(details.soldPrice).format('0,0')} </div>
                        {details.discountPercent !== 0 && (
                            <div className="discount">{details.discountPercent}% Giảm</div>
                        )}
                    </div>

                    {/* select quantity */}
                    <div className="quantity">
                        <div className="quantityText">Số Lượng</div>
                        <div className="quantitySelect">
                            <button className="buttonSelect" onClick={decreaseQuantity}>-</button>
                            <input type="text" value={quantity} readOnly />
                            <button className="buttonSelect" onClick={() => increaseQuantity(details)}>+</button>
                        </div>
                        <div className="quantityText">{details.quantity} sản phẩm có sẵn</div>
                    </div>

                    {/* //  onClick={addToCart} */}
                    <div className="order">
                        <button className="addButton" onClick={() => addToCart(details.productId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconAdd">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                            Thêm Vào Giỏ Hàng
                        </button>

                        <button className="orderButton" onClick={handleBuyNow}>
                            Mua Ngay
                        </button>

                    </div>

                </div>
            </div>
            {/* </Row>
            </Container> */}
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

                                <div>Xem Shop</div>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="shopInfo-details">
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Đánh Giá </div>
                        <div className="detail-value">{infoShop.rate || 0} </div>
                    </div>
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Sản Phẩm </div>
                        <div className="detail-value">{infoShop.totalProduct} </div>
                    </div>
                </div>
                <div className="shopInfo-details">
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Tham Gia</div>
                        <div className="detail-value">{moment(infoShop.createDate).format('DD-MM-YYYY')} </div>
                    </div>
                    <div className="shopInfo-detail-info">
                        <div className="detail-name">Địa Chỉ</div>
                        <div className="detail-value">{infoShop.address} </div>
                    </div>
                </div>
            </div>
            {/* Product Description */}
            <div className="description-product">
                {/* <div className="description-text">
                    Product Detail:
                </div>
                <div className="description-value">
                    {details && details.detail && formatDescriptionValue(details.detail)}
                </div> */}
                <div className="description-text">
                    MÔ TẢ SẢN PHẨM
                </div>
                <div className="description-value">
                    {details && details.decription && formatDescriptionValue(details.decription)}
                </div>
            </div>
            {/* Feeback Product */}
            <div class="feedback-product">
                <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '20px' }}>ĐÁNH GIÁ SẢN PHẨM</div>
                <div class="feedback-top" style={{ display: 'flex' }}>
                    <div style={{ margin: ' 0 6% 0 3%' }}>
                        <div className="feed-rate">
                            <div className="num-fb">{details.rate || 0}</div>
                            <div className="text-fb"> trên 5</div>
                        </div>
                        <div className="star-fb">{renderRating()}</div>
                    </div>

                    <div className="optiom-star-fb">
                        <button style={{ border: '1px solid  #b5babd', borderRadius: '4px', fontSize: '18px', backgroundColor: '#fff', marginRight: '10px', padding: '5px 35px', height: '50%', fontWeight: '500' }} onClick={() => handleFilter()}>Tất Cả</button>
                        <button style={{ border: '1px solid  #b5babd', borderRadius: '4px', fontSize: '18px', backgroundColor: '#fff', marginRight: '10px', padding: '5px 20px', height: '50%', fontWeight: '500' }} onClick={() => handleFilter(5)}>
                            5 Sao ({feedbackCounts[5] || 0})
                        </button>
                        <button style={{ border: '1px solid  #b5babd', borderRadius: '4px', fontSize: '18px', backgroundColor: '#fff', marginRight: '10px', padding: '5px 20px', height: '50%', fontWeight: '500' }} onClick={() => handleFilter(4)}>
                            4 Sao ({feedbackCounts[4] || 0})
                        </button>
                        <button style={{ border: '1px solid  #b5babd', borderRadius: '4px', fontSize: '18px', backgroundColor: '#fff', marginRight: '10px', padding: '5px 20px', height: '50%', fontWeight: '500' }} onClick={() => handleFilter(3)}>
                            3 Sao ({feedbackCounts[3] || 0})
                        </button>
                        <button style={{ border: '1px solid  #b5babd', borderRadius: '4px', fontSize: '18px', backgroundColor: '#fff', marginRight: '10px', padding: '5px 20px', height: '50%', fontWeight: '500' }} onClick={() => handleFilter(2)}>
                            2 Sao ({feedbackCounts[2] || 0})
                        </button>
                        <button style={{ border: '1px solid  #b5babd', borderRadius: '4px', fontSize: '18px', backgroundColor: '#fff', marginRight: '10px', padding: '5px 20px', height: '50%', fontWeight: '500' }} onClick={() => handleFilter(1)}>
                            1 Sao ({feedbackCounts[1] || 0})
                        </button>
                    </div>

                </div>
                <div className="feedback-body">
                    {filteredFeedback.slice().reverse().map((user, index) => (
                        <div className="feedback-info" key={index}>
                            <div className="feedback-user">
                                <div className="userImage">
                                    <img src={user.imgAvatar} alt="" />
                                </div>
                                <div className="user-name-rate">
                                    <div className="user-name">{user.userName}</div>
                                    <div className="user-rate">{userRating(user.rate)}</div>
                                    <div className="user-date">

                                        {user.createDate}
                                    </div>
                                    <div className="user-text">{user.detail}</div>
                                    <div className="user-image">
                                        <div className="user-listImage">
                                            {user.imgFeedback.map((item, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={item}
                                                    alt=""
                                                    onClick={(event) => handleImageClick(event, index)}

                                                />
                                            ))}
                                        </div>
                                        <div className={`user-imageView-${index}`} ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* related products */}
            <div className="product-reldate">
                <div className="product-text" >
                    CÁC SẢN PHẨM KHÁC CỦA SHOP
                    <Link to={`/viewShop/${infoShop.shopId}`}>
                        <button className="viewShop" style={{ border: 'none', background: 'none', width: '150px' }}>
                            <div style={{ paddingBottom: '3px', textDecoration: 'none', fontSize: '18px' }}>Xem Tất Cả</div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                            </svg>



                        </button>
                    </Link>
                </div>
                <div className="product-item">
                    <Col lg='12' md=''>
                        <Container className="p-0">
                            <Row style={{ padding: '0px 0px' }}>
                                {productsData?.map(item => (
                                    <Col lg='3' md='7' sm='7' style={{ padding: '0', marginLeft: '11px', maxWidth: '209px' }} key={item.productId}>
                                        <ProductCard item={item} onReloadData={reloadData} />
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