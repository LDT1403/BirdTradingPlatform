import React, { useState } from 'react';
import '../../../style/registerShop.css';
import "animate.css";

const RegisterShop = () => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic khi form được gửi đi (gửi dữ liệu lên máy chủ, lưu vào cơ sở dữ liệu, v.v.)
        console.log('Shop Name:', shopName);
        console.log('Address:', address);
        console.log('Phone Number:', phoneNumber);
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
                    <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary">Register</button>
            </form>
        </div>
    )

}

export default RegisterShop