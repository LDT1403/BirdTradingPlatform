import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import BirdImg from "../assets/images/11.png";
import "../style/brid-section.css";
import { Link, useNavigate } from "react-router-dom";
import Category from "../components/UI/category/Category";
import "../style/home.css";
import axios from "axios";
import ProductCard from "../components/UI/product-card/ProductCard";
import { useDispatch } from "react-redux";
import { listCarts } from "./redux/Actions/CartActions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import { useRef } from "react";
import chim1 from "../assets/images/chim1.png";
import chim2 from "../assets/images/1.png";
import chim3 from "../assets/images/2.png";
import chim4 from "../assets/images/3.png";
import chim5 from "../assets/images/4.png";
SwiperCore.use([Navigation, Pagination, Autoplay]);
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const reloadData = () => { };
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://birdtradingplatformapi.azurewebsites.net/api/Products/Hot_Product")
      .then((res) => {
        dispatch(listCarts());
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let slidesPerView;
  if (windowWidth >= 1400) {
    slidesPerView = 6;
  } else if (windowWidth < 1390 && windowWidth > 1200) {
    slidesPerView = 5;
  } else if (windowWidth < 1200 && windowWidth > 1000) {
    slidesPerView = 4;
  } else if (windowWidth < 1000 && windowWidth > 800) {
    slidesPerView = 3;
  } else {
    slidesPerView = 2;
  }
  const swiperRef = useRef(null);
  return (
    <Helmet title="Home">
      <div className="home-page-log ">
        <div style={{ backgroundColor: "#fff", padding: "15px" }} className="mb-3">
          <div className="slider-log">
            <Swiper
              tag="section"
              id="swiper"
              navigation
              spaceBetween={33}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onTransitionEnd={(swiper) =>
                console.log("Swiper Initialized!", swiper)
              }
              onSlideChange={(swiper) =>
                console.log("Slide index changed to:", swiper.activeIndex)
              }
              style={{ marginRight: "10px" }}
            >
              <SwiperSlide key={1}>
                {" "}
                <img
                  src={chim1}
                  alt=""
                  style={{ width: "910px", height: "300px" }}
                />
              </SwiperSlide>
              <SwiperSlide key={2}>
                {" "}
                <img
                  src={chim2}
                  alt=""
                  style={{ width: "910px", height: "300px" }}
                />
              </SwiperSlide>
              <SwiperSlide key={3}>
                {" "}
                <img
                  src={chim3}
                  alt=""
                  style={{ width: "910px", height: "300px" }}
                />
              </SwiperSlide>
            </Swiper>
            <div className="slider-img-small">
              <img src={chim5} alt="" />
              <img src={chim4} alt="" />
            </div>
          </div>
        </div>

        <section style={{ backgroundColor: '#fff', width: '1297px', margin: '0 auto' }}>
          <Category />
        </section>

        {/* <div className="mb-5 ">
                    <Container>
                        <Row>
                            <Col lg='12' className="text-center" >
                                <h5 className="feature__subtitle mb-4">Don't miss out on this opportunity </h5>
                                <h2 className="feature__title">Bring a bird into your life today and enjoy unforgettable moments!</h2>
                                <h2 className="feature__title">We will <span>taken care</span></h2>
                            </Col>
                        </Row>
                    </Container>
                </div> */}

        <div className="pb-5 mt-3 product-best-seller">
          <Container>
            <div className="best-seller">
              <div className="best-seller-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon-bestseller"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                    clipRule="evenodd"
                  />
                </svg>
                Sản Phẩm Hot
              </div>
              <Row style={{ padding: "0px 10px" }} className="container1">
                <React.Fragment>
                  <Swiper
                    ref={swiperRef}
                    id="swiper"
                    spaceBetween={6}
                    slidesPerView={slidesPerView}
                    slidesPerGroup={3}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    onTransitionEnd={(swiper) =>
                      console.log("Swiper Initialized!", swiper)
                    }
                    onSlideChange={(swiper) =>
                      console.log("Slide index changed to:", swiper.activeIndex)
                    }
                    style={{ width: "1320px" }}
                  >
                    {data?.map((item) => (
                      <SwiperSlide>
                        <Col
                          lg="12"
                          md="12"
                          sm="12"
                          style={{
                            padding: "0",
                            marginLeft: "11px",
                            maxWidth: "209px",
                          }}
                          key={item.productId}
                        >
                          <ProductCard item={item} onReloadData={reloadData} />
                        </Col>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </React.Fragment>
              </Row>

              <button
                className="btn-next"
                onClick={() => swiperRef.current.swiper.slideNext()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon-bestseller"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="btn-pre"
                onClick={() => swiperRef.current.swiper.slidePrev()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon-bestseller"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </Container>
        </div>
      </div>
    </Helmet>
  );
};

export default Home;
