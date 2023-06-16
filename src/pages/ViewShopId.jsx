import ViewProduct from "../components/UI/view-product/ViewProduct";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
export default function ViewShopId() {
     const idshop = useParams();
     const [infoShop, setInfoShop] = useState([]);
     const ApiLink = `https://localhost:7241/api/Products/Product_ShopId?shopId=${idshop.id}`
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          axios.get(`https://localhost:7241/api/Products/Shop_Detail_Product?id=${idshop.id}`)
               .then(responseShop => {
                    setInfoShop(responseShop.data)
               })


               .catch(err => {
                    console.log(err)
               })
     }, []);
     return (

          <div>
               <div className="Shop-info">
                    <Link to={`/viewShop/${infoShop.shopId}`} className="shopImg">
                         <img src={infoShop.avatar} alt="" />
                    </Link>

                    <div className="shop-1">
                         <div className="shop-Name">
                              {infoShop.shopName}
                         </div>

                    </div>
                    <div className="shopInfo-details">
                         <div className="shopInfo-detail-info">
                              <div className="detail-name">Evaluate </div>
                              <div className="detail-value">{infoShop.rate} </div>
                         </div>
                         <div className="shopInfo-detail-info">
                              <div className="detail-name">Total Products </div>
                              <div className="detail-value">{infoShop.totalProduct} </div>
                         </div>
                    </div>
                    <div className="shopInfo-details">
                         <div className="shopInfo-detail-info">
                              <div className="detail-name">Participation date</div>
                              <div className="detail-value">"" </div>
                         </div>
                         <div className="shopInfo-detail-info">
                              <div className="detail-name">Address</div>
                              <div className="detail-value">{infoShop.address} </div>
                         </div>
                    </div>
               </div>

               <ViewProduct api={ApiLink} />
          </div>
     )
}