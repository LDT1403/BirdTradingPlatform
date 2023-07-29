import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import numeral from 'numeral';
import AddFeedback from "../AddFeedback/AddFeedback";
import moment from "moment";
const Received = () => {

     const accessToken = localStorage.getItem('jwtToken');
     const [orderList, setOrderList] = useState([]);
     const [ShowLogItems, setShowLogItems] = useState(true);
     const [ShowLogItemsNull, setShowLogItemsNull] = useState(false);
     const [ShowFeedTable, setShowFeedTable] = useState(false);
     const navigate = useNavigate();
     const [LoadApi, setLoadApi] = useState(false);
     useEffect(() => {
          const ApiMain = () => {
               setOrderList([])
               axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Order/ToReceived/3`, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })
                    .then((response) => {

                         if (response.data.length === 0) {
                              setShowLogItemsNull(true)
                              setShowLogItems(false)

                         }

                         setOrderList(response.data)



                    })
                    .catch(error => {
                         console.log(error);
                    });
          }
          if (LoadApi === false) {
               setOrderList([]);
               ApiMain();
               setLoadApi(true);
          }

     }, [LoadApi]);

     // Trong component chính
     const calculateTotal = (items) => {
          // Sử dụng reduce() để tính tổng total của các items
          const total = items.reduce((accumulator, currentItem) => {
               return accumulator + currentItem.total;
          }, 0);

          return total;
     };

     const handleTabClick = (order) => {
          const orderID = order.orderId
          navigate(`/OrderDetail/${orderID}`, { state: { order } });
     }

     const handleViewShopClick = (shopID) => {
          navigate(`/viewShop/${shopID}`);
     }
     const handleFeedback = () => {
          setShowFeedTable(true)
     }

     return (
          <div className="option-page-MyPurChase"   >
               {ShowLogItemsNull && (
                    <div style={{ minHeight: '85vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div>
                              <img style={{ height: '100px' }} src="https://th.bing.com/th/id/R.243d0e0ebe06da1c163b355961f024a7?rik=%2f6oK8VKD8oY%2fmg&riu=http%3a%2f%2fwww.bulongviet.com%2fUploads%2fimages%2ficon_03.png&ehk=1%2fn9ChdNLIGH5HrtYoChSZvw5ST66JFRc7bI7B9OfhA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                              <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Chưa có đơn hàng</div>
                         </div>

                    </div>
               )}
               {ShowLogItems && (
                    <div>

                         {orderList.slice().reverse().map((shop) => (
                              <div className="toPay-list-log" key={shop.orderID} >

                                   <div>
                                        <div className="toPay-nameShop">
                                             <div className="toPay-nameShop-log">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop-log-toPay">
                                                       <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                                       <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                                                  </svg>
                                                  {shop.shopName}
                                                  <div className="receButton">
                                                       <button className="viewShop" onClick={() => handleViewShopClick(shop.shopId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="iconShop">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                                            </svg>

                                                            <div>Xem Shop</div>
                                                       </button>
                                                  </div>
                                                  <div id="order_date">
                                                       {moment(shop.orderDate).format('DD-MM-YYYY HH:mm')}
                                                  </div>
                                             </div>


                                             <div className="toPay-Product-text">

                                                  <div className="toPay-subitem-text" style={{ color: 'green' }}>Hoàn Thành</div>
                                             </div>
                                        </div>
                                   </div>

                                   {shop.items.map((product) => (
                                        <div className="toPay-product" key={product.productId}>
                                             <div style={{ display: "flex" }}>
                                                  <img src={product.firstImagePath} alt="" onClick={() => handleTabClick(shop)} />
                                                  <div className="toPay-ProductName" onClick={() => handleTabClick(shop)}>
                                                       <div className="toPay-name">{product.productName}</div>
                                                       <div className="toPay-quantity">x{product.quantity}</div>
                                                  </div>
                                             </div>
                                             {console.log(product)}
                                             <div className="toPay-Product-price" onClick={() => handleTabClick(shop)}>
                                                  <div className="toPay-num" style={{ textDecoration: "line-through" }}><div className="don-vi-pay" >₫</div>{numeral(product.productPrice).format('0,0')}</div>
                                                  <div className="toPay-numSoldPrice"><div className="don-vi-pay" >₫</div>{numeral(product.discountPrice).format('0,0')}</div>
                                             </div>
                                             {
                                                  product.toFeedback === null && (
                                                       <div onClick={handleFeedback}>
                                                            <button style={{ border: "none", backgroundColor: "#176eb0", color: "#fff", padding: "5px 10px", borderRadius: "3px" }}

                                                            >Đánh giá</button>
                                                       </div>
                                                  )
                                             }
                                             {/* {
                                                  product.toFeedback === true && (
                                                       <div>
                                                            <button style={{ border: "1.5px solid #176eb0", backgroundColor: "rgb(210, 229, 239)", color: "#176eb0", padding: "5px 10px", borderRadius: "3px" }}
                                                            >View My Feedback </button>
                                                       </div>
                                                  )
                                             } */}
                                             {
                                                  ShowFeedTable && (

                                                       <AddFeedback productId={product.productId} orderDetailId={product.id} productName={product.productName} setShowFeedTable={setShowFeedTable} setLoadApi={setLoadApi} />
                                                  )
                                             }

                                        </div>
                                   ))}
                                   <div className="toPay-totalPay-log">
                                        <div>Thành Tiền:</div>
                                        <div id="toPay-totalPay"><div className="don-vi-pay" >₫</div>{numeral(shop.totalPrice).format('0,0')}</div>
                                   </div>

                              </div>
                         ))}

                    </div>
               )}

          </div>
     )
}
export default Received 