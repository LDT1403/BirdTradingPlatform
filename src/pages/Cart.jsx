import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import '../style/cart-page.css';
import { Link } from "react-router-dom";
import { cartActions } from "./redux/cartSlice";


const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    return (
        <Helmet title="Cart">
            {/* <CommonSection title="Your Cart" /> */}
            <section>
                <Container>
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
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <Tr item={item} key={item.productId} />
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            <div className="mt-4">
                                <h6>
                                    Subtotal:
                                    <span className="cart__subtotal">{totalAmount}$</span>
                                </h6>
                                <p>Taxes and shipping will calculate at checkout</p>
                                <div className="cart__page-btn">
                                    <button className="addTOCart__btn me-4">
                                        <Link to="/shop">Continue Shopping</Link>
                                    </button>
                                    <button className="addTOCart__btn">
                                        <Link to="/checkout">Proceed to checkout</Link>
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

const Tr = (props) => {
    const { productId, thumbnail, productName, price, quantity } = props.item;
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch(cartActions.deleteItem(productId));
    };
    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={thumbnail} alt="" />
            </td>
            <td className="text-center">{productName}</td>
            <td className="text-center">${price}</td>
            <td className="text-center">{quantity}px</td>
            <td className="text-center cart__item-del">
                <i class="ri-delete-bin-line" onClick={deleteItem}></i>
            </td>
        </tr>
    );
};

export default Cart;