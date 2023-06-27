import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux/cartSlice"
import { Link } from "react-router-dom";
import { ViewProduct } from "../components/UI/view-product/ViewProduct"
import "../style/cart-page.css";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [orderSelect, setOrderSelect] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductName, setSelectedProductName] = useState("");
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const productsByShop = {};
    const dispatch = useDispatch()

    const toggleSelectProduct = (productId) => {
        const isSelected = orderSelect.includes(productId);
        if (isSelected) {
            setOrderSelect(orderSelect.filter((id) => id !== productId));
        } else {
            setOrderSelect([...orderSelect, productId]);
        }
    };

    const toggleSelectShop = (shopId) => {
        const productsInShop = productsByShop[shopId].products.map((product) => product.productId);
        const isSelected = productsInShop.every((productId) => orderSelect.includes(productId));
        if (isSelected) {
            setOrderSelect(orderSelect.filter((id) => !productsInShop.includes(id)));
        } else {
            setOrderSelect([...orderSelect, ...productsInShop]);
        }
    };
    cartItems.forEach((item) => {
        const { shopId, shopName } = item;
        if (!productsByShop[shopId]) {
            productsByShop[shopId] = { shopName: shopName, products: [] };
        }
        productsByShop[shopId].products.push(item);
    });

    const incrementItem = (productId) => {
        dispatch(cartActions.addItem({
            productId: productId,
            quantity: 1
        }));
    };
    console.log(orderSelect)

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
        <div className="Cart-page">
            <div className="Cart-page-body">
                {Object.entries(productsByShop).map(([shopId, { shopName, products }]) => (
                    <div key={shopId}>
                        <div className="cart-shopId">
                            <div className="cart-shop-name">
                                <div className="cart-shop-select">
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleSelectShop(shopId)}
                                    />
                                </div>
                                {shopName}

                            </div>


                            {products.map((product) => (
                                <div className="cart-shop-products" key={product.productId}>
                                    <div className="cart-shop-select">
                                        <input
                                            type="checkbox"
                                            onChange={() => toggleSelectProduct(product.productId)}
                                        />
                                    </div>
                                    < div className="cart-products-info">
                                        <img src={product.thumbnail} alt="" />
                                        <div className="name-product-cart">{product.productName}</div>
                                    </div>

                                    <div className="cart-products-num">${product.soldPrice}</div>
                                    <div className="cart-products-quantity">
                                        <button className="cart-clickQuantity" onClick={() => decrementItem(product.productId)}><i className="ri-subtract-line" /></button>
                                        <span className="cart-view-quantity">{product.quantity}</span>
                                        <button className="cart-clickQuantity" onClick={() => incrementItem(product.productId)}><i className="ri-add-line" /></button>
                                    </div>

                                    <div className="cart-products-num">
                                        <div className="totalPrice-cart">${product.totalPrice}</div>
                                    </div>
                                    <div className="cart-products-num">
                                        <button onClick={() => deleteItem(product.productId)}>Delete</button>
                                    </div>

                                </div>

                            ))}



                        </div>

                    </div>
                ))}
                <div className="mt-4 pb-4">
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
            </div>


            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="confirmation-modal-content">
                        <div className="text-confirmation">Do you want to remove this item?</div>
                        <div className="productName-confirmation"> {selectedProductName}</div>
                        <div className="button-confirm" >
                            <button className="button-yes-confirm" onClick={() => handleConfirmation(true)}>Yes</button>
                            <button onClick={() => handleConfirmation(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>



    );
};

export default Cart;