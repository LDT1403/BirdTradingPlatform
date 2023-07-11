import React from "react";
import ToRate from "./ToRate";
import { useNavigate } from 'react-router-dom';
import { NavLink, Routes, Route } from 'react-router-dom';
import MyReviews from "./MyReviews";
const FeedBack = () => {
     const navigate = useNavigate();
     const handleGoBack = () => {
          navigate("/MyPurchase/confirmed"); 
     };
     return (
          <header className="MyPurchase-page" style={{ minHeight: '700px' }}>
               <div className="MyPurchase-log-cate" style={{ boxShadow: '0 2px 1px 0 rgba(0, 0, 0, .05)' }}>
                    <button onClick={handleGoBack}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-back-orderDetail">
                              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                         </svg>
                         Go Back
                    </button>
                    <NavLink
                         to="/feedback/to-rate"
                         className="MyPurchase-cate"
                         activeClassName="active"
                    >
                         <span className="NavLink-text">To Rate</span>
                    </NavLink>
                    <NavLink
                         to="/feedback/my-reviews"
                         className="MyPurchase-cate"
                         activeClassName="active"
                    >
                         <span className="NavLink-text">My Reviews</span>
                    </NavLink>

               </div>
               <div className="MyPurchase-log-Item">
                    <Routes>
                         <Route path="/to-rate" element={<ToRate />} />
                         <Route path="/my-reviews" element={< MyReviews />} />
                    </Routes>

               </div>
          </header>

     )
}
export default FeedBack;