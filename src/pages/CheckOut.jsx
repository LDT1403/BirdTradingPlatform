import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "./redux/cartSlice"
import NewAddress from "../components/UI/addNewAddress/NewAddress";
import '../style/checkout.css';
import axios from "axios";
import { useLocation } from "react-router-dom";
import numeral from 'numeral';
import Loading from "../components/LoadingError/Loading"
import LoadingFive from "../components/Loadingfive/LoadingWrap";
const CheckOut = () => {
    // const users = useSelector(state => state.auth.login.currentUser)
    const accessToken = localStorage.getItem('jwtToken');
    const location = useLocation();
    const orderSelect = location.state?.orderSelect || {};
    const [showConFirmAddress, setShowConFirmAddress] = useState(false);
    const [showNtPayMethod, setShowNtPayMethod] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAddNewAddress, setShowAddNewAddress] = useState(false);
    const [addressSelectList, setAddressSelectList] = useState();
    const [checkedAddressId, setCheckedAddressId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [note, setNote] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [addressData, setAddressData] = useState([]);
    const [showLoadDing, setLoadDing] = useState(false);



    useEffect(() => {
        const fetchData = () => {
            axios
                .get("https://localhost:7241/api/Order/GetAddressOder", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setAddressData(response.data);
                    const data = response?.data;
                    if (data.length > 0) {
                        data.map((item, index) => {
                            if (index === 0) {
                                setFirstAddress(item);
                            }
                            return null;
                        });
                    }
                });
        };
        if (!showAddNewAddress) {
            fetchData();
        }
    }, [showAddNewAddress]);
    const [firstAddress, setFirstAddress] = useState([])
    const orderInfo = {
        items:
            Object.values(orderSelect).map((items) => ({
                productId: items.productId,
                quantity: items.quantity
            }))
        ,
        note: note,
        addressId: firstAddress.addressId
    }
    console.log(orderInfo)
    const orderSelectID = Object.values(orderSelect).map((items) => items.productId)

    const shops = Object.values(orderSelect).reduce((acc, product) => {
        const { shopId, shopName } = product;
        if (!acc[shopId]) {
            acc[shopId] = {
                shopName,
                products: [],
            };
        }
        acc[shopId].products.push(product);
        return acc;
    }, {});
    const handleChangeAddress = () => {
        setShowNotification(true)
    }
    const handleCancelChange = () => {
        setShowNotification(false)
    }

    const handleChoiceAddress = (event, address) => {
        if (event.target.checked) {
            setAddressSelectList([address]);
            setCheckedAddressId(address.addressId);
        } else {
            setAddressSelectList([]);
            setCheckedAddressId(null);
        }
    }
    const handleConfirmSelect = () => {
        if (addressSelectList != null) {
            addressSelectList.map(address => setFirstAddress(address))
            setShowNotification(false)
        } else {
            setShowConFirmAddress(true)
        }

    }
    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const calculateTotalItem = () => {
        let totalItem = 0;

        Object.values(orderSelect).forEach(() => {
            totalItem++;
        });

        return totalItem;
    };
    const calculateTotalQuantity = () => {
        let totalQuantity = 0;

        Object.values(orderSelect).forEach((product) => {
            const productPrice = product.quantity;
            totalQuantity += productPrice;
        });

        return totalQuantity;
    };
    const calculateTotalPrice = () => {
        let totalPrice = 0;

        Object.values(orderSelect).forEach((product) => {
            const productPrice = product.soldPrice * product.quantity;
            totalPrice += productPrice;
        });

        return totalPrice;
    };
    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };
    const handleShowNtPayMethod = () => {
        setShowNtPayMethod(false);
        setShowConFirmAddress(false);
    }

    const handlePlaceOrder = () => {
        if (!addressData.length) {
            setShowConFirmAddress(true)
        } else {
            switch (paymentMethod) {
                case "Cash":
                    setLoadDing(true)
                    axios.post("https://localhost:7241/api/Order/Create", orderInfo, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                        .then(res => {
                            const listOrder = res.data
                            const listOrderId = listOrder.map(id => id.orderId)
                            const paymentSelect = {

                                "orderIds": listOrderId
                                ,
                                "method": paymentMethod
                            }
                            axios.post(`https://localhost:7241/api/Order/Pay`, paymentSelect, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            })
                                .then(response => {
                                    if (response.data.paymentUrl === null) {
                                        setLoadDing(false)
                                        navigate("/MyPurchase/to-confirmation");
                                    }
                                })
                        })
                    dispatch(cartActions.deleteMultipleItems(orderSelectID));
                    break;
                case "VnPay":
                    setLoadDing(true)
                    axios.post("https://localhost:7241/api/Order/Create", orderInfo, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                        .then(res => {
                            const listOrder = res.data
                            const listOrderId = listOrder.map(id => id.orderId)
                            const paymentSelect = {

                                "orderIds": listOrderId
                                ,
                                "method": paymentMethod
                            }
                            axios.post(`https://localhost:7241/api/Order/Pay`, paymentSelect, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            })
                                .then(response => {
                                    setLoadDing(false)
                                    const paymentUrl = response.data.paymentUrl;
                                    window.location.href = `${paymentUrl}`;

                                })
                            dispatch(cartActions.deleteMultipleItems(orderSelectID));

                        })
                    break;
                default:
                    setShowNtPayMethod(true);
                    break;
            }
        }
    }
    const handleAddNewAddress = () => {
        setShowNotification(false)
        setShowAddNewAddress(true)
    }
    return (
        <div className="Cart-page">
            <div className="Cart-page-body">
                <div className="checkOut-body-address">
                    <div className="checkOut-text">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-text-address">
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Delivery Address
                    </div>

                    <>
                        <div>
                            {!addressData.length ? (
                                <button className="cf-ad-button-add" onClick={handleAddNewAddress} >+ Add new Address</button>
                            ) : (
                                <div className="checkOut-info">
                                    <div className="checkOut-name-phone">
                                        <div className="checkOut-name">
                                            {firstAddress.nameRg}
                                        </div>
                                        <div className="checkOut-phone">
                                            {firstAddress.phone}
                                        </div>
                                    </div>
                                    <div className="checkOut-address">
                                        {firstAddress.addressDetail}, {firstAddress.address}
                                    </div>
                                    <div className="checkOut-change-address">
                                        <button onClick={handleChangeAddress}>Change</button>
                                    </div>
                                </div>

                            )}


                        </div>

                    </>

                </div>
                <div className="checkOut-body-product">
                    {Object.entries(shops).map(([shopId, { shopName, products }]) => (
                        <div className="checkOut-log-shop" key={shopId} style={{ boxShadow: '0 2px 1px 0 rgba(0, 0, 0, .05)' }}>
                            <div className="checkOut-nameShop">
                                <div className="checkOut-nameShop-log">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop-log-checkout">
                                        <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                        <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                                    </svg>
                                    {shopName}
                                </div>

                                <div className="checkOut-Product-text">
                                    <div className="checkOut-numText">Unit Price</div>
                                    <div className="checkOut-numText">Amount</div>
                                    <div className="checkOut-subitem-text">Item Subtotal</div>
                                </div>
                            </div>

                            {products.map((product) => (
                                <div className="checkOut-product" key={product.productId}>
                                    <img src={product.thumbnail} alt="" />
                                    <div className="checkOut-ProductName">{product.productName}</div>
                                    <div className="checkOut-Product-price">
                                        <div className="checkOut-num">${numeral(product.soldPrice).format('0,0')}</div>
                                        <div className="checkOut-num">{product.quantity}</div>
                                        <div className="checkOut-subitem">${numeral(product.totalPrice).format('0,0')}</div>
                                    </div>


                                </div>
                            ))}
                        </div>
                    ))}

                </div>
                <div className="checkOut-body-payMethod">
                    <div className="pay-text">Payment Method</div>
                    <div className="pay-method">
                        <div className="log-option-payment">
                            <div className="method-option">
                                <input
                                    className="red-input"
                                    type="radio"
                                    value="Cash"
                                    checked={paymentMethod === 'Cash'}
                                    onChange={handlePaymentChange}
                                />
                                <img src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.png_.webp" alt="" />
                                <div className="method-name">Cash on Delivery</div>
                            </div>
                            <div className="method-option">
                                <input
                                    className="red-input"
                                    type="radio"
                                    value="VnPay"
                                    checked={paymentMethod === 'VnPay'}
                                    onChange={handlePaymentChange}
                                />
                                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR-350x274.png" alt="" />
                                <div className="method-name">Payment via VNpay</div>
                            </div>

                        </div>
                        <div className="pay-description-log">
                            <div className="checkOut-Total">Total Item:
                                <div className="num-payTotal-item">{calculateTotalItem()}</div>
                            </div>
                            <div className="checkOut-Total">Total Quantity:
                                <div className="num-payTotal-item">{calculateTotalQuantity()}</div>
                            </div>
                            <div className="checkOut-Total">Total Payment:
                                <div className="num-payTotal">{numeral(calculateTotalPrice()).format('0,0')}$</div>
                            </div>
                        </div>

                    </div>

                    <div className="checkOut-log-placeOrder">
                        <div className="checkOut-message">
                            Message:  <input
                                type="text"
                                placeholder="Please leave a message..."
                                value={note}
                                onChange={handleNoteChange}
                            />
                        </div>
                        <div className="checkOut-button">
                            <button className="bt-placeOrder-page" onClick={handlePlaceOrder}>
                                Place Order
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            {
                showAddNewAddress &&
                <NewAddress setShowNotification={setShowNotification} setShowAddNewAddress={setShowAddNewAddress} accessToken={accessToken} />

            }
            {showNotification && (
                <div className="confirmation-modal">
                    <div className="confirm-address-change">
                        <div className="confirm-address-text"> My Address</div>
                        <div className="confirm-address-info">
                            {addressData.map((address) => (
                                <div className="cf-ad-cod" key={address.addressId}>
                                    <input
                                        className="red-input"
                                        type="radio"
                                        onChange={(event) => handleChoiceAddress(event, address)}
                                        checked={address.addressId === checkedAddressId}
                                    />
                                    <div className="cf-ad-info">
                                        <div className="cf-ad-name-phone">
                                            <div className="cf-ad-name"> {address.nameRg}</div>
                                            <div className="cf-ad-phone"> {address.phone}</div>
                                        </div>
                                        <div className="cf-ad-address">
                                            <div>{address.addressDetail}</div>
                                            <div>{address.address}</div>
                                        </div>
                                    </div>
                                    {/* <button className="cf-ad-button"> Edit </button> */}
                                </div>
                            ))}
                            <button className="cf-ad-button-add" onClick={handleAddNewAddress}>+ Add new Address</button>
                        </div>
                        <div className="cf-ad-bt-bottom">
                            <button onClick={handleCancelChange}>Cancel</button>
                            <button className="cf-ad-bt-confirm" onClick={handleConfirmSelect} >Confirm</button>
                        </div>

                    </div>
                </div>
            )}
            {
                showNtPayMethod && (
                    <div className="confirmation-modal">
                        <div className="message-payMethod">
                            <div className="ms-pay-text">Please choose a payment method</div>
                            <button className="ms-pay-button" onClick={handleShowNtPayMethod}>Ok</button>
                        </div>
                    </div>

                )
            }
            {
                showConFirmAddress && (
                    <div className="confirmation-modal">
                        <div className="message-payMethod">
                            <div className="ms-pay-text">Please select your desired delivery address</div>
                            <button className="ms-pay-button" onClick={handleShowNtPayMethod}>Ok</button>
                        </div>
                    </div>

                )
            }
            {
                showLoadDing && (
                    <div className="confirmation-modal" style={{ background: "none"}}>
                        <LoadingFive />
                    </div>

                )
            }
        </div>

    )
}

export default CheckOut;