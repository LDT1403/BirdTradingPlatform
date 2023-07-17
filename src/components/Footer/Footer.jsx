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
                                <h5>Brid Trading</h5>
                            </div>

                            <p className="text-center">

                                Bird Trading - fun, reliable, safe and free online shopping app!
                                Bird Trading is the leading online trading platform in Southeast Asia.
                            </p>
                        </div>
                    </Col>
                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title mb-2" style={{ paddingLeft: "30px" }}>Category</h5>
                        <div className="delivery__time_list">
                            <div className="delivery__time-item border-0 " style={{ paddingLeft: "30px" }}>
                                <p>Brids</p>
                                <p>Foods</p>
                                <p>Bird Cages</p>
                                <p>Accessory</p>

                            </div>
                            <div className="delivery__time-item border-0 " style={{ paddingLeft: "30px" }}>
                                <span>SIMPLE, FAST AND SAFE ONLINE SHOPPING AND SELLING</span>

                            </div>
                        </div>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Contact</h5>
                        <ListGroup>

                            <div className="delivery__time-item border-0 ps-0">
                                <p> Bird Trading is to allow you to buy and sell goods anytime, anywhere.
                                </p>
                                <span>Phone: 03977337051</span>
                            </div>
                            <div className="delivery__time-item border-0 ps-0">
                                <span>Email: example@gmail.com</span>
                            </div>
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Newsletter</h5>
                        <p>Subscribe our newsletter</p>
                        <div className="newsletter">
                            <input type="email" placeholder="Enter your email" />
                            <span>
                                <i className="ri-send-plane-line"></i>
                            </span>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col lg="6" md="6">
                        <p className="copyright__text">
                            Copyright - 2023, website made by SWP391. All Rights
                            Reserved.
                        </p>
                    </Col>
                    <Col lg="6" md="6">
                        <div className="social__links d-flex align-items-center gap-4 justify-content-end">
                            <p className="m-0">Follow: </p>
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
            </Container>



        </footer>
    )
}

export default Footer;