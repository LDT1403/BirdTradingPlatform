import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../style/cart-page.css";
import numeral from 'numeral';
import { listCarts } from "./redux/Actions/CartActions";
const Cart = () => {
    const accessToken = localStorage.getItem('jwtToken');
    const [orderSelect, setOrderSelect] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [ProductName, setProductName] = useState("");
    const [productsData, setProductsData] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [dataCart, setDataCart] = useState([]);
    const [ShowNull, setShowNull] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartID, setcartID] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [productDeleteItem, setProductDeleteItem] = useState();
    const reloadData = () => {
        axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Order/ViewCart`, {
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
            .get("https://birdtradingplatformapi.azurewebsites.net/api/Products/All_Product")
            .then((res) => {
                setProductsData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(orderSelect)

    const toggleSelectProduct = (data) => {
        let updatedOrderSelect = [...orderSelect];
        const finded = updatedOrderSelect.find(u => u.productId === data.productId)
        if (finded) {
            updatedOrderSelect = updatedOrderSelect.filter(u => u.productId !== data.productId)
        } else {
            const shop = dataCart.find(item => item.shopId === data.shopId);
            const product = shop.products.find(item => item.productId === data.productId);
            if (product) {
                const p = {
                    shopId: shop.shopId,
                    shopName: shop.shopName,
                    productId: product.productId,
                    productName: product.productName,
                    thumbnail: product.imageProduct,
                    quantity: product.quantityCart,
                    soldPrice: product.priceProduct,
                    totalPrice: product.priceCart,
                    cartId: product.cartId
                }
                updatedOrderSelect.push(p)
            }
        }
        setOrderSelect(updatedOrderSelect);
    };


    const toggleSelectShop = (shopId) => {
        const shop = dataCart.find(item => item.shopId === shopId);
        const products = shop.products

        let isAllExist = true;
        for (let p of products) {
            let finded = orderSelect.find(o => o.productId === p.productId)
            if (!finded) {
                isAllExist = false;
            }
        }

        if (isAllExist) {
            let afterFilter = orderSelect.filter(o => !products.find(p => p.productId === o.productId))
            setOrderSelect(afterFilter)
        } else {
            const newArr = [...orderSelect]
            for (let p of products) {
                const finded = orderSelect.find(u => u.productId === p.productId)
                if (!finded) {
                    const prd = {
                        shopId: shop.shopId,
                        shopName: shop.shopName,
                        productId: p.productId,
                        productName: p.productName,
                        thumbnail: p.imageProduct,
                        quantity: p.quantityCart,
                        soldPrice: p.priceProduct,
                        totalPrice: p.priceCart,
                        cartId: p.cartId
                    }
                    newArr.push(prd)
                }
            }
            setOrderSelect(newArr)
        }
    };

    const handleShopChecked = (shopId) => {
        const shop = dataCart.find(item => item.shopId === shopId);
        const products = shop.products
        let isAllExist = true;
        for (let p of products) {
            let finded = orderSelect.find(o => o.productId === p.productId)
            if (!finded) {
                isAllExist = false;
            }
        }
        return isAllExist
    }

    const UpdateItem = (data) => {
        setProductName(data.productName);
        const UpdateCart =
        {
            cartID: data.cartId,
            quantity: data.quantity,
        }
        if (data.quantityCart + data.quantity >= 1) {
            axios.post("https://birdtradingplatformapi.azurewebsites.net/api/Order/UpdateQuantity", UpdateCart, {
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
            setProductDeleteItem(data.productId)
        }

    };


    const handleConfirmation = () => {
        let updatedOrderSelect = [...orderSelect];
        const finded = updatedOrderSelect.find(u => u.productId === productDeleteItem)
        if (finded) {
            updatedOrderSelect = updatedOrderSelect.filter(u => u.productId !== productDeleteItem)
        }
        setOrderSelect(updatedOrderSelect);
        const UpdateCart =
        {
            cartID: cartID,
            quantity: quantity,
        }

        axios.post("https://birdtradingplatformapi.azurewebsites.net/api/Order/UpdateQuantity", UpdateCart, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((rep) => {
                if (rep.data === 'delete') {
                    setDataCart([]);
                    reloadData();
                    setShowConfirmation(false);
                    setProductDeleteItem();
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
        setProductDeleteItem(data.productId)

    };

    useEffect(() => {
        if (dataCart) {
            let totalPrice = 0;

            for (const p of orderSelect) {
                const shop = dataCart.find(item => item.shopId === p.shopId);
                const product = shop.products.find(item => item.productId === p.productId);
                totalPrice += product.priceProduct * product.quantityCart;
                p.quantity = product.quantityCart;
                p.totalPrice = product.priceCart;

            }
            setTotal(totalPrice);
        }
    }, [dataCart, orderSelect])

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

    const setCheckedProduct = (productId) => {
        let finded = orderSelect.find(u => u.productId === productId)
        return !!finded;
    }

    return (
        <div className="Cart-page">

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
                        ShowNull === true && (
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
                                            checked={handleShopChecked(shop.shopId)}
                                        />
                                    </div>
                                    {shop.shopName}

                                </div>

                                <div className="cart-page-products">
                                    {shop.products.map((product, index) => (
                                        <div className="cart-shop-products" key={index}>
                                            {
                                                product.quantityProduct > 0 && (
                                                    <>
                                                        <div className="cart-shop-select">
                                                            <input
                                                                class="red-input"
                                                                type="checkbox"
                                                                onChange={() => toggleSelectProduct({ productId: product.productId, shopId: shop.shopId })}
                                                                checked={setCheckedProduct(product.productId)}
                                                            />

                                                        </div>
                                                        < div className="cart-products-info">
                                                            <img src={product.imageProduct} alt="" />
                                                            <div className="name-product-cart">{product.productName}</div>
                                                        </div>

                                                        <div className="cart-products-num"><div className="don-vi">₫</div>{numeral(product.priceProduct).format('0,0')}</div>
                                                        <div className="cart-products-quantity">
                                                            <button className="cart-clickQuantity" onClick={() => UpdateItem({ cartId: product.cartId, quantity: -1, index: index, indexshop: indexshop, quantityCart: product.quantityCart, productName: product.productName, productId: product.productId })}><i className="ri-subtract-line" /></button>
                                                            <span type="text" className="cart-view-quantity">{product.quantityCart} </span>
                                                            <button className="cart-clickQuantity" onClick={() => UpdateItem({ cartId: product.cartId, quantity: 1, index: index, indexshop: indexshop, quantityCart: product.quantityCart, productName: product.productName, productId: product.productId })}><i className="ri-add-line" /></button>
                                                        </div>

                                                        <div className="cart-products-num">
                                                            <div className="totalPrice-cart"><div className="don-vi">₫</div>{numeral(product.priceCart).format('0,0')}</div>
                                                        </div>
                                                        <div className="cart-products-num">
                                                            <button onClick={() => deleteItem({ cartId: product.cartId, productName: product.productName, productId: product.productId })}>Xóa</button>
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

                    </div>
                    <div className="cart-products-info">
                        <div className="cart-inFor">

                        </div>
                    </div>
                    <div className="cart-products-totalCheckOut">
                        <div className="cart-inFor">Tổng Thanh Toán:  <div className="don-vi" style={{ marginLeft: '5px' }}>₫</div>{numeral(total).format('0,0')}</div>
                    </div>
                    <div className="cart-products-num">

                        <div className="btn-cart-checkOut">
                            <button className="bt-checkout-page" onClick={handleCheckout}>
                                Mua Hàng
                            </button>
                        </div>


                    </div>
                </div>

            </div>
            <div className="cart-page-button">

            </div>

            <div className="product-reldate">
                <div className="product-text">
                    CÓ THỂ BẠN CŨNG THÍCH
                </div>
                <div className="product-item" >
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
            {showNotification && (
                <div className="confirmation-modal">
                    <div className="confirm-checkout-OK">
                        <div className="confirm-checkout-text">  Vui lòng chọn sản phẩm muốn mua.</div>
                        <button onClick={handleCheckoutOk}>Đồng Ý</button>
                    </div>

                </div>
            )}
            {
                showConfirmation && (
                    <div className="confirmation-modal">
                        <div className="confirmation-modal-content">
                            <div className="text-confirmation">Bạn có muốn xóa mục này không?</div>
                            <div className="productName-confirmation"> {ProductName}</div>
                            <div className="button-confirm" >
                                <button className="button-yes-confirm" onClick={() => handleConfirmation()}>Đồng Ý</button>
                                <button onClick={() => setShowConfirmation(false)}>Hủy</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >



    );
};

export default Cart;