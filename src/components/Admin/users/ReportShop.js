import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import '../../../style/report-shop.css';
import { useDispatch } from "react-redux";
import { banShop } from "../../../pages/redux/Actions/userActions";

const ReportShop = ({ shopId, userId, isVisible, onSuccess }) => {

    const [data, setData] = useState({});
    const accessToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios
            .get(`https://localhost:7241/api/Admin/getreport?shopid=${shopId}`, {
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
    console.log(data)
    const handleClose = () => {
        onSuccess();
    };
    const dispatch = useDispatch();
    const deleteHandler = (userId) => {
        dispatch(banShop(userId));
        onSuccess();

    };
    return (
        <div className={`modal ${isVisible ? "visible" : ""}`} onClick={handleClose}>
            <div
                className="modalh-content"
                style={{ width: "600px", backgroundColor: "#fff" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="confirm-address-text d-flex align-items-center" >
                    <div style={{ marginRight: '5px', fontSize: "30px" }} ><i className="ri-error-warning-line" style={{ color: "red" }}></i></div>
                    {data.shopname}</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">No</th>
                            <th scope="col" className="text-center">Report</th>
                            <th scope="col" className="text-center">Detail</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.reports?.map((rep, index) => (
                            <tr key={index}>
                                <td className="text-center">
                                    <b>{index + 1}</b>
                                </td>
                                <td >{rep.detailCate}</td>
                                <td  >{rep.detail}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                        onClick={() => deleteHandler(userId)}
                        className="btn btn-sm btn-outline-danger pb-2 mt-2"

                    >
                        <i class="ri-lock-line"></i>
                    </button>
                </div>



                <span className="close-modal" onClick={handleClose}>
                    &times;
                </span>
            </div>
        </div>
    )
}

export default ReportShop;