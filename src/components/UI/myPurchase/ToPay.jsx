import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../../../style/toPay.css';
import numeral from 'numeral';
import LoadingFive from "../../Loadingfive/LoadingWrap";
import moment from "moment";
const ToPay = () => {
     const accessToken = localStorage.getItem('jwtToken');
     const [orderList, setOrderList] = useState([]);
     const [ShowLogItemsNull, setShowLogItemsNull] = useState(true);
     const [listOrderId, setListOrderId] = useState();
     const [showLoadDing, setShowLoadDing] = useState(false);

     useEffect(() => {
          axios.get("https://birdtradingplatformapi.azurewebsites.net/api/Order/OrderFailed", {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then((response) => {

                    if (response.data.length) {
                         setShowLogItemsNull(false)
                         setOrderList(response.data);
                    }


               })
               .catch(error => {
                    console.log(error);
               });
     }, []);

     const handlePayNow = (order) => {
          setShowLoadDing(true)
          const orderId = order.orders.map(order => order.parentOrderId)

          const paymentMethodSelect = {
               "parentOrderId": orderId[0],
               method: "VnPay"
          }
          axios.post(`https://localhost:7241/api/Order/Pay`, paymentMethodSelect, {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then(response => {
                    console.log(response.data)
                    const paymentUrl = response.data.paymentUrl;
                    setShowLoadDing(false);
                    window.location.href = `${paymentUrl}`;

               })
     }
     return (
          <div className="option-page-MyPurChase">
               {ShowLogItemsNull && (
                    <div style={{ minHeight: '85vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div>
                              <img style={{ height: '100px' }} src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR-350x274.png" alt="" />
                              <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Chưa có thanh toán nào !</div>
                         </div>

                    </div>
               )}
               {orderList.slice().reverse().map((order, index) => (
                    <div className="toPay-list-log" key={index} style={{ boxShadow: '0 2px 1px 0 rgba(0, 0, 0, .05)' }}>
                         <div className="toPay-body-product" >
                              {order.orders.map((shop) => (
                                   <div className="toPay-log-shop" key={shop.shopId}>
                                        <div className="toPay-nameShop">
                                             <div className="toPay-nameShop-log">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop-log-toPay">
                                                       <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                                       <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                                                  </svg>
                                                  {shop.shopName}
                                                  <div id="order_date">
                                                       {moment(shop.orderDate).format('DD-MM-YYYY HH:mm')}
                                                  </div>

                                             </div>

                                             <div className="toPay-Product-text">
                                                  Thanh Toán Lại
                                             </div>
                                        </div>

                                        {shop.items.map((product) => (
                                             <div className="toPay-product" key={product.productId}>
                                                  <div style={{ display: "flex" }}>
                                                       <img src={product.firstImagePath} alt="" />
                                                       <div className="toPay-ProductName">
                                                            <div className="toPay-name">{product.productName}</div>
                                                            <div className="toPay-quantity">x{product.quantity}</div>
                                                       </div>
                                                  </div>

                                                  <div className="toPay-Product-price">
                                                       <div className="toPay-num" style={{ textDecoration: "line-through" }}><div className="don-vi-pay" >₫</div>{numeral(product.productPrice).format('0,0')}</div>
                                                       <div className="toPay-numSoldPrice"><div className="don-vi-pay" >₫</div>{numeral(product.discountPrice).format('0,0')}</div>
                                                  </div>


                                             </div>
                                        ))}


                                   </div>
                              ))}

                         </div>
                         <div className="toPay-totalPay-log">
                              <div>Thành Tiền:</div>
                              <div id="toPay-totalPay"><div className="don-vi-pay" >₫</div>{numeral(order.amount).format('0,0')}</div>
                         </div>


                         <div className="toPay-list-button">
                              <button onClick={() => handlePayNow(order)}>Thanh Toán</button>
                         </div>

                    </div>

               ))}
               {
                    showLoadDing && (
                         <div className="confirmation-modal" style={{ background: "none" }}>
                              <LoadingFive />
                         </div>

                    )
               }
          </div>
     );


}
export default ToPay;