import React from "react";
import { ListGroup, Container, Row, Col, ListGroupItem } from "reactstrap";
import "../../style/footer.css"
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo bird.png';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="3" md="4" sm="6">
                        <div className="logo footer__logo text-start">
                            <div className="text-center">
                                <img src={logo} alt="logo" />
                                <h5>Bird Trading</h5>
                            </div>

                            <p className="text-center">

                                Bird Trading - ứng dụng mua sắm trực tuyến thú vị, đáng tin cậy, an toàn và miễn phí!
                                Bird Trading là nền tảng giao dịch trực tuyến hàng đầu ở Đông Nam Á.
                            </p>
                        </div>
                    </Col>
                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title mb-2" style={{ paddingLeft: "30px" }}>Phân Loại</h5>
                        <div className="delivery__time_list">
                            <div className="delivery__time-item border-0 " style={{ paddingLeft: "30px" }}>
                                <p>Chim</p>
                                <p>Thức Ăn</p>
                                <p>Lồng Chim</p>
                                <p>Phụ Kiện</p>

                            </div>

                        </div>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Liên Hệ</h5>
                        <ListGroup>

                            <div className="delivery__time-item border-0 ps-0">
                                <p> Bird Trading là cho phép bạn mua và bán hàng hóa mọi lúc, mọi nơi.
                                </p>
                                <span>Liên Hệ: 03977337051</span>
                            </div>
                            <div className="delivery__time-item border-0 ps-0">
                                <span>Email: example@gmail.com</span>
                            </div>
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title" style={{ marginLeft: '60px' }}>Theo Dõi</h5>
                        <Row className="mt-3">

                            <Col lg="6" md="6">
                                <p className="copyright__text">

                                </p>
                            </Col>
                            <Col lg="6" md="6">
                                <div className="social__links d-flex align-items-center gap-4 justify-content-end">
                                    <p className="m-0">Chọn: </p>
                                    <span>
                                        <Link to="https://www.facebook.com/profile.php?id=100017088730777">
                                            <i className="ri-facebook-line"></i></Link>




                                    </span>

                                    <span>
                                        <Link to="https://github.com/LDT1403">
                                            <i className="ri-github-line"></i></Link>


                                    </span>

                                    <span>


                                        <Link to=" https://www.youtube.com/">
                                            <i className="ri-youtube-line"></i></Link>


                                    </span>

                                    <span>
                                        <Link to="">
                                            <i className="ri-linkedin-line"></i></Link>

                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>



        </footer>
    )
}

export default Footer;