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
        axios.get('https://dummyjson.com/products')
            .then(res => {
                console.log(res.data);
                setData(res.data.products);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <Helmet title="Home">
            <section>
                <Container>
                    <Row>
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
                                    <p className="d-flex align-item-center gap-2"><span className="money__icon"><i class="ri-money-cny-box-line"></i></span>Many free benefits.</p>
                                    <p className="d-flex align-item-center gap-2"><span className="money__icon"><i class="ri-shield-check-line"></i></span>100% secure checkout</p>
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
            </section>

            <section className="pt-0">
                <Category />
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='12' className="text-center">
                            <h5 className="feature__subtitle mb-4">Don't miss out on this opportunity </h5>
                            <h2 className="feature__title">Bring a bird into your life today and enjoy unforgettable moments!</h2>
                            <h2 className="feature__title">We will <span>taken care</span></h2>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='12' className="text-center">
                            <h2>Brids Hot</h2>
                        </Col>
                        {
                            data?.map(item => (
                                <Col lg='3' md='4' key={item.id}>
                                    <ProductCard item={item} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Home;