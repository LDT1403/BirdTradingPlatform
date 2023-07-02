import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux/cartSlice"
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../style/cart-page.css";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [orderSelect, setOrderSelect] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductName, setSelectedProductName] = useState("");
    const [productsData, setProductsData] = useState([]);
    const productsByShop = {};
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        axios
            .get("https://localhost:7241/api/Products/All_Product")
            .then((res) => {
                const allProducts = res.data;
                const filteredProducts = allProducts.filter(
                    (product) =>
                        !cartItems.some((item) => item.productId === product.productId)
                );
                const limitedProducts = filteredProducts.slice(0, 8);
                setProductsData(limitedProducts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    const toggleSelectProduct = (productId) => {
        const isProductSelected = !!orderSelect[productId];

        if (isProductSelected) {
            const updatedOrderSelect = { ...orderSelect };
            delete updatedOrderSelect[productId];
            setOrderSelect(updatedOrderSelect);


            // Check if all products from the same shop are unselected
            const productShopId = getProductShopId(productId);
            const shopProducts = productsByShop[productShopId].products;
            const isShopSelected = Object.values(updatedOrderSelect).some((product) =>
                shopProducts.includes(product)

            );

            if (!isShopSelected) {
                setShopSelected(productShopId, false);
            }
        } else {
            const updatedOrderSelect = { ...orderSelect };
            const product = getProductById(productId);
            updatedOrderSelect[productId] = product;
            setOrderSelect(updatedOrderSelect);

            // Check if all products from the same shop are selected
            const productShopId = getProductShopId(productId);
            const shopProducts = productsByShop[productShopId].products;
            const areAllShopProductsSelected = shopProducts.every((product) =>
                updatedOrderSelect.hasOwnProperty(product.productId)
            );

            if (areAllShopProductsSelected) {
                setShopSelected(productShopId, true);
            }
        }
    };

    const toggleSelectShop = (shopId) => {
        const shopProducts = productsByShop[shopId].products;
        const isShopSelected = Object.values(orderSelect).some((product) =>
            shopProducts.includes(product)
        );

        if (isShopSelected) {
            const updatedOrderSelect = { ...orderSelect };
            const missingProducts = shopProducts.filter((product) => !updatedOrderSelect.hasOwnProperty(product.productId));

            missingProducts.forEach((product) => {
                updatedOrderSelect[product.productId] = product;
            });
            setOrderSelect(updatedOrderSelect);
        } else {
            const updatedOrderSelect = { ...orderSelect };
            const remainingProducts = shopProducts.filter((product) => !updatedOrderSelect.hasOwnProperty(product.productId));
            remainingProducts.forEach((product) => {
                updatedOrderSelect[product.productId] = product;
            });
            setOrderSelect(updatedOrderSelect);
        }
    };

    const setShopSelected = (shopId, selected) => {
        const updatedOrderSelect = { ...orderSelect };
        const shopProducts = productsByShop[shopId].products;

        if (selected) {
            shopProducts.forEach((product) => {
                updatedOrderSelect[product.productId] = product;
            });
        } else {
            shopProducts.forEach((product) => {
                delete updatedOrderSelect[product.productId];
            });
        }

        setOrderSelect(updatedOrderSelect);
    };

    const getProductShopId = (productId) => {
        for (const [shopId, { products }] of Object.entries(productsByShop)) {
            if (products.some((product) => product.productId === productId)) {
                return shopId;
            }
        }
        return null;
    };

    const getProductById = (productId) => {
        for (const { products } of Object.values(productsByShop)) {
            const product = products.find((product) => product.productId === productId);
            if (product) {
                return product;
            }
        }
        return null;
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

        // Xóa sản phẩm khỏi orderSelect (nếu có)
        setOrderSelect((prevOrderSelect) => {
            const updatedOrderSelect = { ...prevOrderSelect };
            delete updatedOrderSelect[productId];
            return updatedOrderSelect;
        });
    };
    const calculateTotalPrice = () => {
        let totalPrice = 0;

        Object.values(orderSelect).forEach((product) => {
            const productPrice = product.soldPrice * product.quantity;
            totalPrice += productPrice;
        });

        return totalPrice;
    };
    const handleCheckout = () => {
        // Check if any products are selected
        if (Object.keys(orderSelect).length === 0) {
            setShowNotification(true); // Show the notification if no products are selected
        } else {
            // Redirect to the checkout page
            navigate("/checkout", { state: { orderSelect } });
        }
    };
    console.log(orderSelect);
    const handleCheckoutOk = () => {
        // Check if any products are selected

        setShowNotification(false); // Show the notification if no products are selected

    };

    return (
        <div className="Cart-page">
            <div className="Cart-page-body">
                <div className="Cart-page-inFor">
                    <div className="cart-shop-select">
                     
                    </div>
                    <div className="cart-products-info">
                        <div className="cart-inFor">
                            Product
                        </div>
                    </div>
                    <div className="cart-products-num">
                        <div className="cart-inFor">
                            Unit Price
                        </div>
                    </div>
                    <div className="cart-products-quantitytii">
                        <div className="cart-inFor">
                            Quantity
                        </div>
                    </div>
                    <div className="cart-products-num">
                        <div className="cart-inFor">
                            Total Price
                        </div>
                    </div>
                    <div className="cart-products-num">
                        <div className="cart-inFor">
                            Actions
                        </div>
                    </div>
                </div>

                {Object.entries(productsByShop).map(([shopId, { shopName, products }]) => (
                    <div key={shopId}>

                        <div className="cart-shopId">
                            <div className="cart-shop-name">
                                <div className="cart-shop-select">
                                    <input
                                        class="red-input"
                                        type="checkbox"
                                        checked={Object.values(orderSelect).length === products.length && Object.values(orderSelect).every((product) =>
                                            products.includes(product)
                                        )}
                                        onChange={() => toggleSelectShop(shopId)}
                                    />
                                </div>
                                {shopName}

                            </div>

                            <div className="cart-page-products">
                                {products.map((product) => (
                                    <div className="cart-shop-products" key={product.productId}>
                                        <div className="cart-shop-select">
                                            <input
                                                class="red-input"
                                                type="checkbox"
                                                onChange={() => toggleSelectProduct(product.productId)}
                                                checked={!!orderSelect[product.productId]}
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

                    </div>
                ))}
                <div className="Cart-page-inFor">
                    <div className="cart-shop-select">
                        <input class="red-input" type="checkbox" />
                    </div>
                    <div className="cart-products-info">
                        <div className="cart-inFor">
                            Select All
                        </div>
                    </div>
                    <div className="cart-products-totalCheckOut">
                        <div className="cart-inFor">Total Price: ${calculateTotalPrice()}</div>
                    </div>
                    <div className="cart-products-num">

                        <div className="btn-cart-checkOut">
                            <button className="bt-checkout-page" onClick={handleCheckout}>
                                Check out
                            </button>
                        </div>


                    </div>
                </div>
                <div className="product-reldate">
                    <div className="product-text">
                        You can refer to other products
                    </div>
                    <div className="product-item">
                        <Col lg='12' md=''>
                            <Container>
                                <Row>
                                    {productsData.map(item => (

                                        <Col lg='3' md='4' key={item.productId}>
                                            <ProductCard item={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    </div>

                </div>
            </div>
            <div className="cart-page-button">

            </div>

            {
                showConfirmation && (
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
                )
            }
            {showNotification && (
                <div className="confirmation-modal">
                    <div className="confirm-checkout-OK">
                        <div className="confirm-checkout-text">   Please select the products you want to purchase.</div>
                        <button onClick={handleCheckoutOk}>OK</button>
                    </div>

                </div>
            )}

        </div >



    );
};

export default Cart;