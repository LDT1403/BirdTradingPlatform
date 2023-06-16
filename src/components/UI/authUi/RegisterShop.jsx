import React, { useState } from 'react';
import '../../../style/registerShop.css';
import "animate.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerShop } from '../../../pages/redux/apiRequest';

const RegisterShop = () => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('jwtToken');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic khi form được gửi đi (gửi dữ liệu lên máy chủ, lưu vào cơ sở dữ liệu, v.v.)
        // console.log('Shop Name:', shopName);
        // console.log('Address:', address);
        // console.log('Phone Number:', phoneNumber);

        const newShoper = {
            shopName: shopName,
            address: address,
            phone: phone,
        }

        registerShop(newShoper, dispatch, navigate, accessToken);

    }
    return (
        <div className="contains mb-5 mt-5">
            <h3 className="text-center">Register Shop</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3 content">
                    <label htmlFor="shopName" className="form-label">Shop Name:</label>
                    <input type="text" className="form-control" id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                </div>
                <div className="mb-3 content">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3 content">
                    <label htmlFor="phoneNumber" className="form-label">Phone:</label>
                    <input type="text" className="form-control" id="phoneNumber" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary">Register</button>
            </form>
        </div>
    )

}

export default RegisterShop