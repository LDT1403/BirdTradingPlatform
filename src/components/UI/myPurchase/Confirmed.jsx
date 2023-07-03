import React from "react";
import { useEffect, useState } from 'react';
import {useNavigate ,NavLink} from "react-router-dom";
import axios from "axios";
import '../../../style/toConfirmation.css';
const Confirmed = () => {

     const accessToken = localStorage.getItem('jwtToken');
     const [orderList, setOrderList] = useState([]);
     const [ShowLogItems, setShowLogItems] = useState(true);
     const [ShowLogItemsNull, setShowLogItemsNull] = useState(false);
    
     const navigate = useNavigate();
     
     useEffect(() => {
          axios.get(`https://localhost:7241/api/Order/confirmed?toConfirm=3`, {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then((response) => {
                    console.log(response.data);
                    if (!response.data.length) {
                         setShowLogItemsNull(true)
                         setShowLogItems(false)

                    }

                    setOrderList(response.data)



               })
               .catch(error => {
                    console.log(error);
               });
     }, []);

     // Trong component chính
     const calculateTotal = (items) => {
          // Sử dụng reduce() để tính tổng total của các items
          const total = items.reduce((accumulator, currentItem) => {
               return accumulator + currentItem.total;
          }, 0);

          return total;
     };
    
     const handleTabClick = (order) => {
          const orderID = order.orderID
          navigate(`/MyPurchase/${orderID}`, { state: { order } });
     }
  
     return (
          <div className="option-page-MyPurChase"   >
               {ShowLogItemsNull && (
                    <div style={{ minHeight: '500px', backgroundColor: '#fff' }}></div>
               )}
               {ShowLogItems && (
                    <div>
                         {orderList.map((order) => (
                              <div key={order.orderID}>
                                   {order.shops.map((shop) =>

                                        <div className="toPay-list-log" key={shop.shopID} >
                                             <div>
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
                                             </div>

                                             {shop.items.map((product) => (
                                                  <div className="toPay-product" key={product.productId} onClick={() => handleTabClick(order)}>
                                                       <img src={product.firstImagePath} alt="" />
                                                       <div className="toPay-ProductName">
                                                            <div className="toPay-name">{product.productName}</div>
                                                            <div className="toPay-quantity">x{product.quantity}</div>
                                                       </div>
                                                       <div className="toPay-Product-price">
                                                            <div className="toPay-num" style={{ textDecoration: "line-through" }}>${product.productPrice}</div>
                                                            <div className="toPay-numSoldPrice">${product.discountPrice}</div>
                                                       </div>


                                                  </div>
                                             ))}
                                             <div className="toPay-totalPay-log">TotalPay:{calculateTotal(shop.items)}</div>
                                             <div className="toPay-list-button">
                                                  {/* {shop.items.map((product) => ()} */}

                                                  <button
                                                  // onClick={() => handlePayNow(order.orderId)}
                                                  >Cancel Order</button>
                                             </div>

                                        </div>
                                   )}
                              </div>
                         ))}
                    </div>
               )}

          </div>
     )
}
export default Confirmed;