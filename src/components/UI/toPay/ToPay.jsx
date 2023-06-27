import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../../../style/toPay.css';
const ToPay = () => {
     const accessToken = localStorage.getItem('jwtToken');
     // const [orderData, setOrderData] = useState([]);
     const [orderList, setOrderList] = useState([]);
     useEffect(() => {
          axios.get("https://localhost:7241/api/Order/OrderFailed", {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then((response) => {
                    const processedData = response.data.map((order) => {
                         const { orderId,subTotal, items } = order;
                         const groupedItems = items.reduce((acc, item) => {
                              const { shopId, shopName } = item;
                              const existingShop = acc.find(
                                   (shop) => shop.shopId === shopId && shop.shopName === shopName
                              );
                              if (existingShop) {
                                   existingShop.products.push(item);
                              } else {
                                   acc.push({ shopId, shopName, products: [item] });
                              }
                              return acc;
                         }, []);
                         return { orderId,subTotal, shops: groupedItems };
                    });
                    setOrderList(processedData);
               })
               .catch(error => {
                    console.log(error);
               });
     }, []);
     const paymentMethodSelect = {
          method: "VnPay"
     }
     const handlePayNow = (order) => {
          axios.post(`https://localhost:7241/api/Order/${order}/Pay`, paymentMethodSelect, {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then(response => {
                    const paymentUrl = response.data.paymentUrl;
                    window.location.href = `${paymentUrl}`;

               })
     }
     return (
          <div>
 
               {orderList.map((order, index) => (
                    <div className="toPay-list-log" key={index}>
                         <h3>{order.orderId}</h3>
                         <div className="toPay-body-product" >
                              {order.shops.map((shop) => (
                                   <div className="toPay-log-shop" key={shop.shopId}>
                                        <div className="toPay-nameShop">
                                             <div className="toPay-nameShop-log">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop-log-toPay">
                                                       <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                                       <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                                                  </svg>
                                                  {shop.shopName}
                                             </div>

                                             <div className="toPay-Product-text">

                                                  <div className="toPay-subitem-text">TO PAY</div>
                                             </div>
                                        </div>

                                        {shop.products.map((product) => (
                                             <div className="toPay-product" key={product.productId}>
                                                  <img src={product.imagePath} alt="" />
                                                  <div className="toPay-ProductName">
                                                       <div className="toPay-name">{product.productName}</div>
                                                       <div className="toPay-quantity">x{product.quantity}</div>
                                                  </div>
                                                  <div className="toPay-Product-price">
                                                       <div className="toPay-num" style={{ textDecoration: "line-through" }}>${product.price}</div>
                                                       <div className="toPay-numSoldPrice">${product.soldPrice}</div>
                                                  </div>


                                             </div>
                                        ))}


                                   </div>
                              ))}
                         </div>
                         <div className="toPay-list-button">
                              <div>TotalPay: {order.subTotal}</div>
                              <button onClick={() => handlePayNow(order.orderId)}>Pay Now</button>
                         </div>
                    </div>
               ))}
          </div>
     );


}
export default ToPay;