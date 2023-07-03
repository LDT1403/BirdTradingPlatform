import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import BirdImg from '../assets/images/11.png';
import '../style/brid-section.css';
import { Link, useNavigate } from "react-router-dom";
import Category from "../components/UI/category/Category";
import '../style/home.css';
import axios from "axios";
import ProductCard from "../components/UI/product-card/ProductCard";

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:7241/api/Products/Hot_Product')
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);




    const productsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [showRetry, setShowRetry] = useState(false);

    const loadMoreProducts = () => {
        setLoadingMore(true);

        setTimeout(() => {
            setCurrentPage(currentPage + 1);
            setLoadingMore(false);

            if (currentPage * productsPerPage >= data.length) {
                setShowLoadMore(false);
                setShowRetry(true);
            }
        }, 200);
    };

    const retryLoadMore = () => {
        setCurrentPage(1);
        setShowRetry(false);
        setShowLoadMore(true);
    };

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const displayedProducts = data.slice(0, end);

    return (
        <Helmet title="Home">
            <div className="home-page-log ">
                <div className="mb-4 " >
                    <Container className="pt-5">
                        <Row style={{backgroundColor: '#fff', boxShadow: '0 2px 1px 0 rgba(0, 0, 0, .05)'}}>
                            <Col lg='6' md='6'>
                                <div className="brid__content">
                                    <h5 className="mb-3">Esay way to make an order</h5>
                                    <h1 className="mt-4 bird__title"><span>BIRD SONG?</span> the fascinating sound of nature that harmonizes with your heartbeat.</h1>
                                    <p>Own a charming bird today and bring life and joy to your space!</p>

                                    <div className="bird__btns d-flex align-items-center gap-5 mt-4">
                                        <button className="order__btn d-flex align-items-center justify-content-between ">Order now <i className="ri-arrow-right-s-line"></i></button>
                                        <button className="all__bird-btn"><Link to='/shop'>See all brids</Link></button>
                                    </div>

                                    <div className=" brid__service d-flex align-item-center gap-5 mt-5">
                                        <p className="d-flex align-item-center gap-2"><span className="money__icon"><i className="ri-money-cny-box-line"></i></span>Many free benefits.</p>
                                        <p className="d-flex align-item-center gap-2"><span className="money__icon"><i className="ri-shield-check-line"></i></span>100% secure checkout</p>
                                    </div>
                                </div>
                            </Col>

                            <Col lg='6' md='6'>
                                <div className="brid__img">
                                    <img src={BirdImg} alt="brid-img" className="w-100" />
                                </div>

                            </Col>
                        </Row>

                    </Container>
                </div>

                <section className="pt-0">
                    <Category />
                </section>

                <div className="mb-5 ">
                    <Container>
                        <Row>
                            <Col lg='12' className="text-center" >
                                <h5 className="feature__subtitle mb-4">Don't miss out on this opportunity </h5>
                                <h2 className="feature__title">Bring a bird into your life today and enjoy unforgettable moments!</h2>
                                <h2 className="feature__title">We will <span>taken care</span></h2>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="pb-5" >
                    <Container>
                        <Row>
                            <Col lg='12' className="text-center mb-5" >
                                <h2>Best Seller</h2>
                            </Col>
                            {
                                displayedProducts?.map(item => (
                                    <Col lg='3' md='4' key={item.productId}>
                                        <ProductCard item={item} />
                                    </Col>
                                ))
                            }

                        </Row>
                        {showLoadMore && !loadingMore && (
                            <button className="load-more-button mt-2" onClick={loadMoreProducts}>
                                Load More
                            </button>
                        )}
                        {loadingMore && (
                            <div className="loading-message">
                                Loading more products...
                            </div>
                        )}
                        {!showLoadMore && showRetry && (
                            <div className="no-more-products-message">
                                No more products available
                                <button className="retry-button" onClick={retryLoadMore}>
                                    Retry
                                </button>
                            </div>
                        )}
                    </Container>
                </div>
            </div>
        </Helmet>
    )
}

export default Home;