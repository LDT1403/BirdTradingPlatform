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

                            <p>
                                Lorem uhuhasduhfauhsfduuahfdancsjkncsajnc
                                ccasdca
                                a
                            </p>
                        </div>
                    </Col>
                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title mb-3">Delivery Time</h5>
                        <ListGroup className="delivery__time_list">
                            <ListGroupItem className="delivery__time-item border-0 ps-0">
                                <span>Friday - Tuesday</span>
                                <p>10:00am - 11:00pm</p>
                            </ListGroupItem>
                            <ListGroupItem className="delivery__time-item border-0 ps-0">
                                <span>Wednesday - Thursday</span>
                                <p>Off day</p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Contact</h5>
                        <ListGroup>

                            <ListGroupItem className="delivery__time-item border-0 ps-0">
                                <p> hadfaikjj ádfafdshjajkjafsdf
                                    sadfasfafj dsadsa
                                </p>
                                <span>Phone: 03977337051</span>
                            </ListGroupItem>
                            <ListGroupItem className="delivery__time-item border-0 ps-0">
                                <span>Email: example@gmail.com</span>
                            </ListGroupItem>
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
                            Copyright - 2022, website made by Muhibur Rahman. All Rights
                            Reserved.
                        </p>
                    </Col>
                    <Col lg="6" md="6">
                        <div className="social__links d-flex align-items-center gap-4 justify-content-end">
                            <p className="m-0">Follow: </p>
                            <span>


                                <Link to="https://www.facebook.com/profile.php?id=100017088730777">
                                    <i className="ri-facebook-line"></i></Link>

                                <Link to="https://www.facebook.com/muhib160">
                                    <i className="ri-facebook-line"></i></Link>


                            </span>

                            <span>
                                <Link to="https://github.com/LDT1403">
                                    <i className="ri-github-line"></i></Link>

                                <Link to="https://github.com/muhib160">
                                    <i className="ri-github-line"></i>
                                </Link>
                            </span>

                            <span>
                                {" "}

                                <Link to=" https://www.youtube.com/">
                                    <i className="ri-youtube-line"></i></Link>

                                <Link to=" https://www.youtube.com/c/MuhibsTechDiary">
                                    <i className="ri-youtube-line"></i>

                                </Link>
                            </span>

                            <span>
                                <Link to="">
                                    <i className="ri-linkedin-line"></i></Link>
                                <Link to=" https://www.linkedin.com/in/muhib160/">
                                    <i className="ri-linkedin-line"></i>

                                </Link>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>



        </footer>
    )
}

export default Footer;