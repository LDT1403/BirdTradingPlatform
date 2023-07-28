import ViewProduct from "../components/UI/view-product/ViewProduct";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import '../style/view-shop.css';
import { SearchProduct } from "../components/UI/search-product/Search";
export default function ViewShopId() {
     const idshop = useParams();
     const [infoShop, setInfoShop] = useState([]);
     const [search, setSearch] = useState("");
     const ApiLink = `https://birdtradingplatformapi.azurewebsites.net/api/Products/Product_ShopId?shopId=${idshop.id}`
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          axios.get(`https://birdtradingplatformapi.azurewebsites.net/api/Products/Shop_Detail_Product?id=${idshop.id}`)
               .then(responseShop => {
                    setInfoShop(responseShop.data)
               })
               .catch(err => {
                    console.log(err)
               })
     }, [idshop.id]);
     const handleSearchQuery = (sear) => {
          setSearch(sear);
     }
     const placeholder = `Tìm sản phẩm trong ${infoShop.shopName}`;
     return (

          <div style={{backgroundColor: 'rgb(213, 226, 231)' , paddingTop:'15px'}}>
               <div className="Shop-view" >
                    <Link to={`/viewShop/${infoShop.shopId}`} className="shopvImg">
                         <img src={infoShop.avatar} alt="" />
                    </Link>

                    <div className="shop-2">
                         <div className="shop-Name">
                              {infoShop.shopName}
                         </div>

                    </div>
                    <div className="shop-2-1">
                         <div className="shopInfo-details-1">
                              <div className="shopInfo-detail-info-1">
                                   <div className="detail-name-1">Đánh Giá </div>
                                   <div className="detail-value-1">{infoShop.rate||0} </div>
                              </div>
                              <div className="shopInfo-detail-info-1">
                                   <div className="detail-name-1">Sản Phẩm </div>
                                   <div className="detail-value-1">{infoShop.totalProduct||0} </div>
                              </div>
                         </div>
                         <div className="shopInfo-details">
                              <div className="shopInfo-detail-info">
                                   <div className="detail-nameShop">Tham Gia</div>
                                   <div className="detail-value">{moment(infoShop.createDate).format('DD-MM-YYYY')} </div>
                              </div>
                              <div className="shopInfo-detail-info">
                                   <div className="detail-nameShop">Địa Chỉ</div>
                                   <div className="detail-value">{infoShop.address} </div>
                              </div>
                         </div>
                         <div className="search-inShopp">
                              <SearchProduct
                                   handleSearchQuery={handleSearchQuery}
                                   placeholder={placeholder}
                              />
                         </div>
                    </div>

               </div>

               <ViewProduct
                    search={search}
                    api={ApiLink} />
          </div>
     )
}