import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../../../style/orderDetail.css'
import numeral from 'numeral';
const OrderDetail = () => {
     const location = useLocation();
     const orderSelect = location.state?.order || {};
     // const status = location.state?.status
     const navigate = useNavigate();
     const handleGoBack = () => {
          navigate(-1); // Điều hướng quay lại trang trước đó
     };
     const handleViewShopClick = (shopID) => {

          navigate(`/viewShop/${shopID}`);
     }
     return (
          <div className="MyPurchase-page" style={{ minHeight: '90vh' }}>
               <div className="MyPurchase-page-body">
                    <div className="Detail-order-log">
                         <button onClick={handleGoBack}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-back-orderDetail">
                                   <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                              </svg>
                              TRỞ LẠI
                         </button>
                         <div className="Detail-order-log" >
                              <div className="Detail-id">MÃ ĐƠN HÀNG. {orderSelect.orderId}</div>
                              <div className="Detail-id">|</div>
                              {
                                   orderSelect.toConfirm === 2 && (
                                        <div className="Detail-text" style={{ color: 'red' }}>ĐƠN HÀNG ĐANG CHỜ XÁC NHẬN</div>
                                   )
                              }
                              {
                                   orderSelect.toConfirm === 3 && !orderSelect.receivedDate && (
                                        <div className="Detail-text" >ĐƠN HÀNG ĐANG GIAO</div>
                                   )
                              }
                              {
                                   orderSelect.receivedDate && orderSelect.toConfirm === 3 && (
                                        <div className="Detail-text" style={{ color: 'green' }}>ĐƠN HÀNG ĐÃ HOÀN THÀNH</div>
                                   )
                              }
                              {
                                   orderSelect.cancelDate && (
                                        <div className="Detail-text" style={{ color: 'gray' }} >ĐƠN HÀNG KHÔNG THÀNH CÔNG</div>
                                   )
                              }
                         </div>
                    </div>
                    <div className="Detail-order-log-3">
                         <div id="mona_title"></div>
                    </div>
                    <div className="Detail-order-log-2">
                         <div>Địa Chỉ Nhận Hàng</div>
                         <div id="log-do1">
                              <div id="log-do-address-1">
                                   <div id="log-do-address-name" >{orderSelect.nameRg}</div>
                                   <div id="log-do-address-full">{orderSelect.phone}</div>
                                   <div id="log-do-address-full">{orderSelect.addressDetail}, {orderSelect.address}</div>
                                   <div id="log-do-address-full"></div>
                              </div>
                              {/* <div id="log-do-address-2">
                                   <button className="orderButtonAgain" >
                                        Buy Again
                                   </button>
                              </div> */}
                         </div>

                    </div>

                    <div className="Detail-order-log-4">
                         <div>
                              <div className="toPay-nameShop">
                                   <div className="toPay-nameShop-log">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop-log-toPay">
                                             <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                             <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                                        </svg>
                                        {orderSelect.shopName}
                                   </div>
                                   <div className="receButton">
                                        <button className="viewShop" onClick={() => handleViewShopClick(orderSelect.shopId)}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="iconShop">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                             </svg>

                                             <div>Xem Shop</div>
                                        </button>
                                   </div>
                              </div>
                         </div>

                         {orderSelect.items.map((product) => (
                              <div className="toPay-product " key={product.productId}>
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
                    <div className="Detail-order-log-5">
                         <div id="log-do-price-text">Thành Tiền </div>
                         <div id="log-do-number-text"><div className="don-vi-pay" >₫</div>{numeral(orderSelect.totalPrice).format('0,0')} </div>
                    </div>
                    <div className="Detail-order-log-5">
                         <div id="log-do-price-text">Phương Thức Thanh Toán</div>
                         <div id="log-do-payment-text">{
                              orderSelect.paymentMethod === "Cash" && (
                                   "Thanh toan khi nhan hang"
                              )
                         }
                              {
                                   orderSelect.paymentMethod === "VnPay" && (
                                        "Thanh toán VnPay"
                                   )
                              }
                         </div>
                    </div>
               </div>



          </div>

     );
}
export default OrderDetail;