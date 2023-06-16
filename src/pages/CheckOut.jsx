import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import '../style/checkout.css';
import { cartActions } from "./redux/cartSlice";

const CheckOut = () => {

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }
    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: '',
        }
    }

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);

    return (
        <Helmet title="Checkout">
            <section>
                <Container>
                    <Row>
                        {/* <Col lg="8" md="8"> */}
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Check Out</h4>
                                </div>
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> First Name</label>
                                                <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                                {/* <small className="text-danger">{error.firstname}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Last Name</label>
                                                <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                                {/* <small className="text-danger">{error.lastname}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Phone Number</label>
                                                <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                                {/* <small className="text-danger">{error.phone}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Email Address</label>
                                                <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                                {/* <small className="text-danger">{error.email}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label> Full Address</label>
                                                <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                                {/* <small className="text-danger">{error.address}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>City</label>
                                                <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                                {/* <small className="text-danger">{error.city}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>State</label>
                                                <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                                {/* <small className="text-danger">{error.state}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Zip Code</label>
                                                <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                                {/* <small className="text-danger">{error.zipcode}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <button type="button" className="btn btn-primary mx-1" onClick={(e) => submitOrder(e, 'cod')}>Place Order</button>
                                                {/* <button type="button" className="btn btn-primary mx-1" onClick={(e) => submitOrder(e, 'razorpay')}>Pay by Razorpay</button>
                                <button type="button" className="btn btn-warning mx-1" onClick={(e) => submitOrder(e, 'payonline')}>Pay Online</button> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </Col> */}

                        <div className="col-md-5">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th width="50%">Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <Tr item={item} key={item.productId} />
                                    ))}
                                    <tr>
                                        <td colSpan="4" className="text-end fw-bold">Grand Total</td>
                                        <td colSpan="3" className="text-end fw-bold">{totalAmount}$</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Row>
                </Container>
            </section >
        </Helmet >
    )
}
const Tr = (props) => {
    const { thumbnail, productName, soldPrice, quantity } = props.item;
    const dispatch = useDispatch();


    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={thumbnail} alt="" />
            </td>
            <td className="text-center">{productName}</td>
            <td className="text-center">${soldPrice}</td>
            <td className="text-center">{quantity}px</td>
            <td className="text-center">{quantity * soldPrice}$</td>
        </tr>
    );
};

export default CheckOut;