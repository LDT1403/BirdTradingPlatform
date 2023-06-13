import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import '../style/checkout.css';

const CheckOut = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý yêu cầu đơn hàng tùy thuộc vào phương thức thanh toán (COD hoặc PayPal)
        if (paymentMethod === 'COD') {
            // Xử lý thanh toán COD tại đây
            alert('Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn sẽ được giao trong thời gian sớm nhất.');
            // Reset form sau khi xử lý thanh toán thành công
            setName('');
            setPhone('');
            setEmail('');
            setAddress('');
        }
        // if (paymentMethod === 'COD') {
        //     // Xử lý thanh toán COD tại đây
        //   } else if (paymentMethod === 'PayPal') {
        //     // Thực hiện thanh toán PayPal
        //   }
    };

    const shippingInfo = [];
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const shippingCost = 30;

    const totalAmount = cartTotalAmount + Number(shippingCost);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const userShippingAddress = {
    //         name: enterName,
    //         email: enterEmail,
    //         phone: enterNumber,
    //         country: enterCountry,
    //         city: enterCity,
    //         postalCode: postalCode,
    //     };
    //     alert("SUccess")
    //     //   shippingInfo.push(userShippingAddress);
    //     //   console.log(shippingInfo);
    // };
    return (
        <Helmet title="Checkout">
            {/* <CommonSection title="Checkout" /> */}
            <section>
                <Container>
                    <Row>
                        <Col lg="8" md="6">
                            <div className="checkout-container">
                                <h2>Checkout</h2>
                                <form className="checkout-form" onSubmit={handleSubmit}>
                                    <div className="checkout-form-group">
                                        <label className="checkout-label">
                                            Họ và tên:
                                            <input className="checkout-input" type="text" value={name} onChange={handleNameChange} />
                                        </label>
                                    </div>
                                    <div className="checkout-form-group">
                                        <label className="checkout-label">
                                            Số điện thoại:
                                            <input className="checkout-input" type="tel" value={phone} onChange={handlePhoneChange} />
                                        </label>
                                    </div>
                                    <div className="checkout-form-group">
                                        <label className="checkout-label">
                                            Email:
                                            <input className="checkout-input" type="email" value={email} onChange={handleEmailChange} />
                                        </label>
                                    </div>
                                    <div className="checkout-form-group">
                                        <label className="checkout-label">
                                            Địa chỉ:
                                            <textarea className="checkout-input" value={address} onChange={handleAddressChange} />
                                        </label>
                                    </div>
                                    <div className="checkout-form-group">
                                        <label className="checkout-label">
                                            Phương thức thanh toán:
                                            <select className="checkout-input" value={paymentMethod} onChange={handlePaymentMethodChange}>
                                                <option value="COD">Cash on Delivery</option>
                                                <option value="PayPal">PayPal</option>
                                            </select>
                                        </label>
                                        {/* {paymentMethod === 'PayPal' && (
                                            <PayPalButton
                                                amount={/* Tổng số tiền cần thanh toán */}
                                        {/* onSuccess={handlePayPalPayment}
                                                options={{
                                                    // Cấu hình PayPal
                                                    clientId: 'YOUR_PAYPAL_CLIENT_ID',
                                                }}
                                            />
                                        )} */}
                                    </div>
                                    <button className="checkout-button" type="submit">Đặt hàng</button>
                                </form>
                            </div>
                        </Col>

                        <Col lg="4" md="6">
                            <div className="checkout__bill">
                                <h6 className="d-flex align-items-center justify-content-between mb-3">
                                    Subtotal: <span>${cartTotalAmount}</span>
                                </h6>
                                <h6 className="d-flex align-items-center justify-content-between mb-3">
                                    Shipping: <span>${shippingCost}</span>
                                </h6>
                                <div className="checkout__total">
                                    <h5 className="d-flex align-items-center justify-content-between">
                                        Total: <span>${totalAmount}</span>
                                    </h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default CheckOut;