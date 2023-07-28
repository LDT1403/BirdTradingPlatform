import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../../../style/orderDetail.css'
import numeral from 'numeral';
import moment from "moment";
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
                    {orderSelect.receivedDate && orderSelect.toConfirm === 3 && (
                         <div className="Detail-order-log-10">

                              <div className="Detail-order-iconview">
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>

                                   </div >
                                   <div className="status_orderdetail">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                        </svg>

                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>

                                   </div>
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                        </svg>
                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>
                                   </div>
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                        </svg>

                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>
                                   </div>
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                        </svg>
                                   </div>
                              </div>
                              <div className="Detail-order-iconview1">
                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đơn Hàng Đã Đặt</div>
                                        <div className=" date_status">  {moment(orderSelect.orderDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>
                                   <div className="txt_status_orde">
                                        <div className="txt_status_w" >Xác Nhận Thông Tin Thanh Toán( ₫ {numeral(orderSelect.totalPrice).format('0,0')})</div>
                                        <div className=" date_status">  {moment(orderSelect.paymentDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Shop Đã Xác Nhận Đơn</div>
                                        <div className=" date_status">  {moment(orderSelect.confirmDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đang Giao</div>
                                        <div className=" date_status">  {moment(orderSelect.confirmDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đơn Hàng hoàn Thành</div>
                                        <div className=" date_status">  {moment(orderSelect.receivedDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                              </div>
                         </div>
                    )}
                    {orderSelect.toConfirm === 3 && !orderSelect.receivedDate && (
                         <div className="Detail-order-log-10">

                              <div className="Detail-order-iconview">
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>

                                   </div >
                                   <div className="status_orderdetail">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                        </svg>

                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>

                                   </div>
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                        </svg>
                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>
                                   </div>
                                   <div className="status_orderdetail1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                        </svg>

                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status1">

                                        </div>
                                   </div>
                                   <div className="status_orderdetail2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                        </svg>
                                   </div>
                              </div>
                              <div className="Detail-order-iconview1">
                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đơn Hàng Đã Đặt</div>
                                        <div className=" date_status">  {moment(orderSelect.orderDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>
                                   <div className="txt_status_orde">
                                        <div className="txt_status_w" >Xác Nhận Thông Tin Thanh Toán( ₫ {numeral(orderSelect.totalPrice).format('0,0')})</div>
                                        <div className=" date_status">  {moment(orderSelect.paymentDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Shop Đã Xác Nhận Đơn</div>
                                        <div className=" date_status"> {moment(orderSelect.confirmDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đang Giao</div>
                                        <div className=" date_status"> {moment(orderSelect.confirmDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đơn Hàng Chưa Hoàn Thành</div>
                                   </div>

                              </div>
                         </div>
                    )}
                    {orderSelect.toConfirm === 2 && (
                         <div className="Detail-order-log-10">

                              <div className="Detail-order-iconview">
                                   <div className="status_orderdetail">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>

                                   </div >
                                   <div className="status_orderdetail">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                        </svg>

                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status">

                                        </div>

                                   </div>
                                   <div className="status_orderdetail1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                        </svg>
                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status1">
                                        </div>
                                   </div>
                                   <div className="status_orderdetail2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                        </svg>

                                   </div>
                                   <div className="line_status_">
                                        <div className="line_icon_status1">

                                        </div>
                                   </div>
                                   <div className="status_orderdetail2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_order_detail">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                        </svg>
                                   </div>
                              </div>
                              <div className="Detail-order-iconview1">
                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đơn Hàng Đã Đặt</div>
                                        <div className=" date_status"> {moment(orderSelect.orderDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>
                                   <div className="txt_status_orde">
                                        <div className="txt_status_w" >Xác Nhận Thông Tin Thanh Toán( ₫ {numeral(orderSelect.totalPrice).format('0,0')})</div>
                                        <div className=" date_status"> {moment(orderSelect.paymentDate).format('DD-MM-YYYY HH:mm')}</div>
                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Chờ Shop Xác Nhận Đơn</div>

                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đang Giao</div>

                                   </div>

                                   <div className="txt_status_orde">
                                        <div className="txt_status_w">Đơn Hàng Chưa Hoàn Thành</div>

                                   </div>

                              </div>
                         </div>
                    )}
                    {orderSelect.cancelDate !== null && (
                         <div className="status_fail" >
                              <div className="txt_status_fail">
                                   Đơn Hàng Không Thành Công!
                              </div>
                              <div className="date_status_fail">
                                   <div className=""> {moment(orderSelect.cancelDate).format('DD-MM-YYYY HH:mm')}</div>
                              </div>
                              <div className="date_status_fail1">
                                  {orderSelect.reasonCancle}
                              </div>
                         </div>
                    )}
                    <div className="Detail-order-log-3">
                         <div id="mona_title">
                         </div>
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



          </div >

     );
}
export default OrderDetail;