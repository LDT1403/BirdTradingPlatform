import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import '../style/checkout.css';
import { Link } from "react-router-dom";
import { cartActions } from "./redux/cartSlice";
import axios from "axios";

const CheckOut = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [orderId, setOrderId] = useState();
    const accessToken = localStorage.getItem('jwtToken');
    const orderInfo = {
        items:
            cartItems.map((itemss) => ({
                productId: itemss.productId,
                quantity: itemss.quantity
            }))
        ,
        note: ""
    }
    useEffect(() => {
        axios.post("https://localhost:7241/api/Order/Create", orderInfo, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                setOrderId(res.data.orderId);

            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const [methodPay, setMethodPay] = useState();
    const handleCOD = () => {
        setMethodPay("Cash")
    };
    const handleVnPay = () => {
        setMethodPay("VnPay")
    };
    const handlePay = () => {
        if (orderId) {
            const orderPayApiUrl = `https://localhost:7241/api/Order/${orderId}/Pay`;
            const orderMethod = {
                method: methodPay
            };

            axios.post(orderPayApiUrl, orderMethod, {
                headers: {
                    Authorization: ` Bearer ${accessToken}`
                }
            })
                .then(res => {
                    setpayData(res.data);
                })
                .catch(err => {
                    // Xử lý lỗi nếu có
                    console.log(err);
                });
        }
    };
    const [payData, setpayData] = useState();
    const handleSubmit = () => {
        // if (payData.paymentUrl === null) {
        //     alert("thanh cong roi ")
        // } else {
        //     const orderVnPay = `https://localhost:7241/api/Order/${orderId}/Pay`;
        // }
    }


    const totalAmount = useSelector(state => state.cart.totalAmount);
    const users = [
        { id: 1, name: 'John Doe', address: '123 Main Street', phone: '123-456-7890' },
    ];
    return (
        <Helmet title="Checkout">
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h5 className="addrees__info">
                                < i class="ri-map-pin-line"></i>Delivery address </h5>
                            <ul>
                                {users.map(user => (
                                    <li key={user.id}>
                                        <strong>Name:</strong> {user.name},<strong>Phone:</strong> {user.phone} <strong>Address:</strong> {user.address}

                                        <Link to={`/update-user/${user.id}`}>Change</Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>


                    <Row>

                        <Col lg="12">
                            {cartItems.length === 0 ? (
                                <h5 className="text-center">Your cart is empty</h5>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="text-center">
                                            <th>Image</th>
                                            <th>Product Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <Tr item={item} key={item.productId} />

                                        )
                                        )}
                                    </tbody>
                                </table>
                            )}

                            <div className="mt-4">
                                <h6>
                                    Subtotal:
                                    <span className="cart__subtotal">{totalAmount}$</span>
                                </h6>

                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>

            <section>
                <Container>
                    <label className="checkout-label">
                        Phương thức thanh toán:
                        {/* <select className="checkout-input" value={paymentMethod} onChange={handlePaymentMethodChange}>
                            <option value="COD" onClick={handlePay} >Cash on Delivery</option>
                            <option value="PayPal" onClick={handlePay}      >PayPal</option>
                        </select> */}
                        <button onClick={handleCOD}>COD</button>
                        <button onClick={handleVnPay}>VNPAY</button>
                        <button onClick={handlePay}>apply</button>
                    </label>

                    <button className="checkout-button" type="submit" onClick={handleSubmit}>Đặt hàng</button>

                </Container>
            </section >
        </Helmet >
    )
}
const Tr = (props) => {
    const { thumbnail, productName, soldPrice, quantity, productId } = props.item;
    const dispatch = useDispatch();

    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={thumbnail} alt="" />
            </td>
            <td className="text-center">{productName}</td>
            <td className="text-center">${soldPrice}</td>
            <td className="text-center">{quantity}px</td>

        </tr>
    );
};

export default CheckOut;