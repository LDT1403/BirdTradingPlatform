import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux/cartSlice"
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../style/cart-page.css";
import numeral from 'numeral';
import { data } from "jquery";
import { listCarts } from "./redux/Actions/CartActions";
const Cart = () => {
    const accessToken = localStorage.getItem('jwtToken');
    const [orderSelect, setOrderSelect] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [ProductName, setProductName] = useState("");
    const [productsData, setProductsData] = useState([]);
    const productsByShop = {};
    const [showNotification, setShowNotification] = useState(false);
    const [dataCart, setDataCart] = useState([]);
    const [ShowNull, setShowNull] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartID, setcartID] = useState(0);
    const [quantity, setquantity] = useState(0);
    const reloadData = () => {
        axios.get(`https://localhost:7241/api/Order/ViewCart`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((rep) => {
            if (rep.data.length !== 0) {
                setShowNull(false);
                setDataCart(rep.data);
            }
            if (rep.data.length === 0) {
                setShowNull(true)
            }

        })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        reloadData();
    }, []);

    useEffect(() => {
        axios
            .get("https://localhost:7241/api/Products/All_Product")
            .then((res) => {
                setProductsData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const toggleSelectProduct = () => {

    };

    const toggleSelectShop = (shopId) => {

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

    };

    const getProductById = (productId) => {
    };

    const incrementItem = (product) => {

    };

    const UpdateItem = (data) => {
        setProductName(data.productName);
        const UpdateCart =
        {
            cartID: data.cartId,
            quantity: data.quantity,
        }
        if (data.quantityCart + data.quantity >= 1) {
            axios.post("https://localhost:7241/api/Order/UpdateQuantity", UpdateCart, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((rep) => {
                    if (rep.data === 'success') {
                        reloadData();
                    }
                    if (rep.data !== 'success') {

                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (data.quantityCart + data.quantity < 1) {
            setShowConfirmation(true);
            setcartID(data.cartId);
            setquantity(0)
        }

    };


    const handleConfirmation = () => {

        const UpdateCart =
        {
            cartID: cartID,
            quantity: quantity,
        }

        axios.post("https://localhost:7241/api/Order/UpdateQuantity", UpdateCart, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((rep) => {
                if (rep.data === 'delete') {
                    setDataCart([]);
                    reloadData();
                    setShowConfirmation(false);
                    dispatch(listCarts());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteItem = (data) => {
        setProductName(data.productName);
        setcartID(data.cartId);
        setShowConfirmation(true);


    };
    const calculateTotalPrice = () => {

    };
    const handleCheckout = () => {
        if (Object.keys(orderSelect).length === 0) {
            setShowNotification(true);
        } else {
            navigate("/checkout", { state: { orderSelect } });
        }
    };

    const handleCheckoutOk = () => {
        setShowNotification(false);

    };

    return (
        <div className="Cart-page">
            {
                showConfirmation && (
                    <div className="confirmation-modal">
                        <div className="confirmation-modal-content">
                            <div className="text-confirmation">Do you want to remove this item?</div>
                            <div className="productName-confirmation"> {ProductName}</div>
                            <div className="button-confirm" >
                                <button className="button-yes-confirm" onClick={() => handleConfirmation()}>Yes</button>
                                <button onClick={() => setShowConfirmation(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="Cart-page-body">
                <div className="Cart-scroll">
                    <div className="Cart-page-inFor">
                        <div className="cart-shop-select">

                        </div>
                        <div className="cart-products-info">
                            <div className="cart-inFor">
                                Sản Phẩm
                            </div>
                        </div>
                        <div className="cart-products-num">
                            <div className="cart-inFor">
                                Đơn Giá
                            </div>
                        </div>
                        <div className="cart-products-quantitytii">
                            <div className="cart-inFor">
                                Số Lượng
                            </div>
                        </div>
                        <div className="cart-products-num">
                            <div className="cart-inFor">
                                Số Tiền
                            </div>
                        </div>
                        <div className="cart-products-num">
                            <div className="cart-inFor">
                                Thao Tác
                            </div>
                        </div>
                    </div>

                    {
                        ShowNull == true && (
                            <div style={{ height: '400px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div>
                                    <img style={{ height: '100px', margin: '0% 40%' }} src="https://th.bing.com/th/id/R.243d0e0ebe06da1c163b355961f024a7?rik=%2f6oK8VKD8oY%2fmg&riu=http%3a%2f%2fwww.bulongviet.com%2fUploads%2fimages%2ficon_03.png&ehk=1%2fn9ChdNLIGH5HrtYoChSZvw5ST66JFRc7bI7B9OfhA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Bạn chưa có sản phẩm nào trong Giỏ hàng</div>
                                </div>

                            </div>
                        )


                    }

                    {dataCart.map((shop, indexshop) => (
                        <div key={shop.shopId}>

                            <div className="cart-shopId">
                                <div className="cart-shop-name">
                                    <div className="cart-shop-select">
                                        <input
                                            class="red-input"
                                            type="checkbox"
                                            onChange={() => toggleSelectShop(shop.shopId)}
                                        />
                                    </div>
                                    {shop.shopName}

                                </div>

                                <div className="cart-page-products">
                                    {shop.products.map((product, index) => (
                                        <div className="cart-shop-products" key={product.productId}>
                                            {
                                                product.quantityProduct > 0 && (
                                                    <>
                                                        <div className="cart-shop-select">
                                                            <input
                                                                class="red-input"
                                                                type="checkbox"
                                                                onChange={() => toggleSelectProduct(product.productId)}
                                                            // checked={!!orderSelect[product.productId]}
                                                            />

                                                        </div>
                                                        < div className="cart-products-info">
                                                            <img src={product.imageProduct} alt="" />
                                                            <div className="name-product-cart">{product.productName}</div>
                                                        </div>

                                                        <div className="cart-products-num"><div className="don-vi">₫</div>{numeral(product.priceProduct).format('0,0')}</div>
                                                        <div className="cart-products-quantity">
                                                            <button className="cart-clickQuantity" onClick={() => UpdateItem({ cartId: product.cartId, quantity: -1, index: index, indexshop: indexshop, quantityCart: product.quantityCart, productName: product.productName })}><i className="ri-subtract-line" /></button>
                                                            <span type="text" className="cart-view-quantity">{product.quantityCart} </span>
                                                            <button className="cart-clickQuantity" onClick={() => UpdateItem({ cartId: product.cartId, quantity: 1, index: index, indexshop: indexshop, quantityCart: product.quantityCart, productName: product.productName })}><i className="ri-add-line" /></button>
                                                        </div>

                                                        <div className="cart-products-num">
                                                            <div className="totalPrice-cart"><div className="don-vi">₫</div>{numeral(product.priceCart).format('0,0')}</div>
                                                        </div>
                                                        <div className="cart-products-num">
                                                            <button onClick={() => deleteItem({ cartId: product.cartId, productName: product.productName })}>Xóa</button>
                                                        </div>
                                                    </>
                                                )
                                            }


                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>
                    ))}
                </div>

                <div className="Cart-page-inFor">
                    <div className="cart-shop-select">
                        <input class="red-input" type="checkbox" />
                    </div>
                    <div className="cart-products-info">
                        <div className="cart-inFor">
                            Chọn Tất Cả
                        </div>
                    </div>
                    <div className="cart-products-totalCheckOut">
                        <div className="cart-inFor">Tổng Thanh Toán:  <div className="don-vi" style={{ marginLeft: '5px' }}>₫</div>{numeral(calculateTotalPrice()).format('0,0')}</div>
                    </div>
                    <div className="cart-products-num">

                        <div className="btn-cart-checkOut">
                            <button className="bt-checkout-page" onClick={handleCheckout}>
                               Mua Hàng
                            </button>
                        </div>


                    </div>
                </div>
                <div className="product-reldate">
                    <div className="product-text">
                        CÓ THỂ BẠN CŨNG THÍCH
                    </div>
                    <div className="product-item">
                        <Col lg='12' md=''>
                            <Container>
                                <Row style={{ padding: '0px 0px' }}>
                                    {productsData?.map(item => (
                                        <Col lg='3' md='7' sm='7' style={{ padding: '0', marginLeft: '7px', maxWidth: '209px' }} key={item.productId}>
                                            <ProductCard item={item} onReloadData={reloadData} />
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