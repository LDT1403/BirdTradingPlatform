import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import numeral from "numeral";
import axios from "axios";

const LatestOrder = () => {
    const [data, setData] = useState([]);
    const accessToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios
            .get('https://birdtradingplatformapi.azurewebsites.net/api/Shop/Get_Top5_HotProduct', {
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
            <div className="card-title pt-2 " style={{ fontSize: "20px", paddingLeft: "5px" }}>Top 5 Sản Phẩm Bán Chạy Nhất</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Hình Ảnh</th>
                        <th scope="col">Tên Sản Phẩm</th>
                        <th scope="col">Giá Bán</th>
                        <th scope="col">Lượt Bán</th>
                        <th scope="col">Đánh giá </th>
                        <th scope="col" >Phân Loại</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.slice().reverse().map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={item.thumbnail} alt="Product" style={{ width: "60px", height: "60px" }} />
                            </td>
                            <td>{item.productName}</td>
                            <td>₫ {numeral(item.soldPrice).format('0,0')}</td>
                            <td>
                                {item.quantitySold || 0}
                            </td>
                            <td>{renderRating(item.rate)}</td>
                            <td >
                                {
                                    item.cateName
                                }
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};


export default LatestOrder;