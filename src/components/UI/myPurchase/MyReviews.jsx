import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
const MyReviews = () => {
    const accessToken = localStorage.getItem('jwtToken');
    const [ShowLogItemsNull, setShowLogItemsNull] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        axios.get("https://birdtradingplatformapi.azurewebsites.net/api/FeedBack/getFeedbackuser", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                setFeedback(response.data);
                setShowLogItemsNull(false);
            })
            .catch(error => {
                console.log(error);
            });



    }, []);
    function userRating(rating) {
        const filledStars = Math.floor(rating);
        const emptyStars = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={filledStars + i} className="far fa-star"></i>);
        }

        return stars;
    };
    let currentImageSrc = null;
    const handleImageClick = (event, index) => {
        const clickedImageSrc = event.target.src;
        const imageViewElement = document.querySelector(`.user-imageView-${index}`);
        const images = document.querySelectorAll(`.user-listImage-${index} img`);
        if (currentImageSrc === clickedImageSrc) {
            imageViewElement.classList.add("hidden");
            currentImageSrc = null;
            images.forEach((image) => {
                image.classList.remove("clicked");
            });
        } else {
            imageViewElement.innerHTML = `<img src="${clickedImageSrc}" alt="Clicked Image" style="max-width: 300px; max-height: 300px;" />`;
            imageViewElement.classList.remove("hidden");
            currentImageSrc = clickedImageSrc;
            images.forEach((image) => {
                if (image.src === clickedImageSrc) {
                    image.classList.add("clicked");
                } else {
                    image.classList.remove("clicked");
                }
            });
        }
    };
    const clickedImage = (productId) => {
        navigate(`/shop/${productId}`);
    }
    return (
        <div className="option-page-MyPurChase" >
            {ShowLogItemsNull && (
                <div style={{ minHeight: '85vh', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <img style={{ height: '100px' }} src="https://th.bing.com/th/id/R.243d0e0ebe06da1c163b355961f024a7?rik=%2f6oK8VKD8oY%2fmg&riu=http%3a%2f%2fwww.bulongviet.com%2fUploads%2fimages%2ficon_03.png&ehk=1%2fn9ChdNLIGH5HrtYoChSZvw5ST66JFRc7bI7B9OfhA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Bạn Chưa Thực Hiện Đánh Giá NÀo</div>
                    </div>
                </div>
            )}
            <div className="feedback-body" style={{ backgroundColor: '#fff' }}>
                {feedback.slice().reverse().map((user, index) => (
                    <div className="feedback-info" key={index}>
                        <div className="feedback-user">
                            <div className="userImage">
                                <img src={user.imgAvatar} alt="" />
                            </div>
                            <div className="user-name-rate">
                                <div className="user-name">{user.username}</div>
                                <div className="user-rate">{userRating(user.rate)}</div>
                                <div className="user-date">
                                    {moment(user.createDate).format('DD-MM-YYYY HH:mm')}
                                </div>
                                <div className="user-text">{user.detail}</div>
                                <div className="user-image">
                                    <div className="user-listImage" style={{ cursor: "pointer", }}>
                                        {user.imgFeedback.map((item, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={item}
                                                alt=""
                                                onClick={(event) => handleImageClick(event, index)}

                                            />
                                        ))}
                                    </div>
                                    <div className={`user-imageView-${index}`} ></div>
                                </div>
                                {
                                    user.quantity > 0 && (
                                        <div className="info-pr" style={{
                                            backgroundColor: 'rgb(239, 245, 245)',
                                            padding: '7px ',
                                            display: 'flex',
                                            marginLeft: '10px',
                                            minWidth: '600px',
                                            cursor: "pointer",

                                        }} onClick={() => (clickedImage(user.productId))}>
                                            <img src={user.imgProduct} alt="" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
                                            <div style={{ fontSize: '18px', width: '300px', }}>{user.productName}</div>

                                        </div>
                                    )
                                }
                                   {
                                    user.quantity < 1 && (
                                        <div className="info-pro" style={{
                                            backgroundColor: 'rgb(239, 245, 245)',
                                            padding: '7px ',
                                            display: 'flex',
                                            marginLeft: '10px',
                                            cursor: "pointer",

                                        }} >
                                            <img src={user.imgProduct} alt="" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
                                            
                                            <div style={{ fontSize: '18px', color:'red', fontWeight: '500',display:'flex' }}><div style={{ fontSize: '18px', color:'#000', margin:'0px 5px'}}>{ user.productName } </div> đã hết hàng!</div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyReviews;