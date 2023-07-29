import React, { useEffect, useState } from "react";
import '../../../style/addFeedback.css'
import { BsStar, BsStarFill } from "react-icons/bs";
import axios from "axios";

const AddFeedback = ({ productId, orderDetailId, productName, setShowFeedTable, setLoadApi }) => {
     const accessToken = localStorage.getItem('jwtToken');
     const [starRating, setStarRating] = useState(5)
     const [ImageFile, setImageFile] = useState([]);
     const [DetailFB, setDetailFB] = useState();
     const handleFeedback = () => {
          const formData = new FormData();
          formData.append("ProductId", productId);
          formData.append("Rate", starRating);
          formData.append("OrderDetailId", orderDetailId);
          formData.append("Detail", DetailFB);

          for (let i = 0; i < ImageFile.length; i++) {
               formData.append("ImageFile", ImageFile[i])
          }
          axios.post(`https://birdtradingplatformapi.azurewebsites.net/api/FeedBack/Feedback`, formData, {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then((response) => {
                    if (response.data === 'success') {
                         setShowFeedTable(false)
                         setLoadApi(false);
                    }
               })
               .catch((error) => {
                    console.log(error)
               })
     }
     const handleFileChange = (event) => {
          console.log(event);
          const newImages = [...ImageFile];
          for (let i = 0; i < event.target.files.length; i++) {
               newImages.push(event.target.files[i]);
          }
          setImageFile(newImages);
     };
     const handleStarHover = (rating) => {
          setStarRating(rating);
     };

     const handleDeleteImage = (index) => {
          const updatedImages = [...ImageFile];
          updatedImages.splice(index, 1);
          setImageFile(updatedImages);
     };
     return (
          <div className="confirmation-modal">
               <div className="log-add-feedback" style={{ width: "650px", padding: "10px", borderRadius: "2px", background: "#fff" }}>
                    <div id="add-feedback-head" > Đánh giá cho sản phẩm - {productName} -</div>
                    <div id="title-feedback" > Đánh Giá Sao </div>
                    <div className="star-rating">
                         {[1, 2, 3, 4, 5].map((rating) => (
                              <span
                                   key={rating}
                                   className={`star ${rating <= (starRating) ? "active" : ""}`}
                                   onMouseEnter={() => handleStarHover(rating)}
                              > {rating <= starRating ? <BsStarFill /> : <BsStar />}</span>
                         ))}
                         {
                              starRating == 1 && (
                                   <div id="text-of-star" style={{ color: "#5f5d5c" }}> Sản phẩm không tốt </div>
                              )

                         }
                         {
                              starRating == 2 && (
                                   <div id="text-of-star" style={{ color: "#d11f12" }}> Sản phẩm tạm ổn</div>
                              )

                         }
                         {
                              starRating == 3 && (
                                   <div id="text-of-star" style={{ color: "#ee6e06" }}> Sản phẩm ổn</div>
                              )

                         }
                         {
                              starRating == 4 && (
                                   <div id="text-of-star" style={{ color: "#0cdd86" }}> Sản phẩm tốt</div>
                              )

                         }
                         {
                              starRating == 5 && (
                                   <div id="text-of-star" style={{ color: "rgb(8, 158, 228)" }}> Sản phẩm rất tốt </div>
                              )

                         }
                    </div>
                    <div id="title-feedback">
                         Đánh giá chi tiết
                    </div>
                    <div className="detail-feedback">
                         <textarea name="text"
                              onChange={(e) => setDetailFB(e.target.value)}
                         ></textarea>
                    </div>
                    <div id="title-feedback">
                         Ảnh đánh giá
                    </div>
                    <div style={{ padding: "5px 10px" }}>

                         <div className="addImage-feedback">

                              {ImageFile.map((img, index) =>
                                   <div key={index} className="image-container-feedback">

                                        <img src={URL.createObjectURL(img)} alt="" style={{ width: "80px", height: "80px", margin: "5px" }} />
                                        <button className="delete-button-imgFeedback" onClick={() => handleDeleteImage(index)}>X</button>
                                   </div>
                              )}
                              {
                                   ImageFile.length < 6 && (
                                        <label class="custom-file-upload" style={{ width: "80px", height: "80px", margin: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                             <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-addImage-feedback">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                             </svg>

                                        </label>
                                   )
                              }
                         </div>
                    </div>
                    <div className="button-add-feedback">
                         <button onClick={() => setShowFeedTable(false)} style={{ backgroundColor: "#fff", border: '1px solid #c2c7c7', color: '#8d9292', marginRight: '10px' }}> Hủy</button>
                         <button onClick={handleFeedback}> Đánh Giá</button>
                    </div>

               </div>
          </div>
     )
}
export default AddFeedback;