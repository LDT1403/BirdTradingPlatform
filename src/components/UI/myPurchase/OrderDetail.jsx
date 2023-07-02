import React from "react";
import { useNavigate } from 'react-router-dom';
const OrderDetail = () => {
     const navigate = useNavigate();
     const handleGoBack = () => {
          navigate(-1); // Điều hướng quay lại trang trước đó
     };

     return (
          <div className="MyPurchase-page" style={{ minHeight: '700px' }}>
               <div className="toPay-list-log" >
                    <button onClick={handleGoBack}>Go Back</button>
               </div>

          </div>

     );
}
export default OrderDetail;