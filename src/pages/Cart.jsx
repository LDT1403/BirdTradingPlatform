import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    const decrementItem = (productId) => {
        const item = cartItems.find((item) => item.productId === productId);
        if (item.quantity === 1) {
            setSelectedProductName(item.productName);
            // Hiển thị thông báo xác nhận
            setSelectedProductId(productId);
            setShowConfirmation(true);
        } else {
            dispatch(cartActions.removeItem(productId));
        }
    };
    const handleConfirmation = (confirmed) => {
        setShowConfirmation(false);
        if (confirmed) {
            deleteItem(selectedProductId);
        }
    };
    const deleteItem = (productId) => {
        dispatch(cartActions.deleteItem(productId));
        setOrderSelect(orderSelect.filter((id) => id !== productId));
    };
    return (
        <Helmet title="Cart">
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>Cart</h1>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.productId}>
                                            <td>
                                                <Link to={`/product/${item.productId}`}>
                                                    {item.productName}
                                                </Link>
                                            </td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.subtotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Link to="/checkout" className="btn btn-primary">
                            Proceed to Checkout
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Helmet>
    );
};

export default Cart;