import axios from "axios";
import numeral from "numeral";
import React, { useEffect, useState } from "react";

const TopFeedBack = () => {
    const [data, setData] = useState([]);
    const accessToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios
            .get('https://birdtradingplatformapi.azurewebsites.net/api/Admin/GettopFeedback', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [accessToken]);

    const renderRating = (rate) => {
        const filledStars = Math.floor(rate);
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
    return (
        <>
            <div className="card-title pt-2 " style={{ fontSize: "20px", paddingLeft: "5px" }}>Sản Phẩm của các cửa hàng có đánh giá tốt</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Hình Ảnh</th>
                        <th scope="col">Tên Sản Phẩm</th>
                        <th scope="col">Tổng Tiền</th>
                        <th scope="col">Cửa Hàng</th>
                        <th scope="col">Đánh giá </th>
                        <th scope="col" style={{ textAlign: 'center' }} >Số lượng Đánh Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.slice().reverse().map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={item.imageProduct} alt="Product" style={{ width: "60px", height: "60px" }} />
                            </td>
                            <td>{item.productName}</td>
                            <td>₫ {numeral(item.price).format('0,0')}</td>
                            <td>
                                {item.shopName}
                            </td>
                            <td>{renderRating(item.rate)}</td>
                            <td style={{ textAlign: 'center' }}>
                                {
                                    item.feedbackCount
                                }
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default TopFeedBack;