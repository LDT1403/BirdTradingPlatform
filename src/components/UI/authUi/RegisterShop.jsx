import React, { useState } from 'react';
import '../../../style/registerShop.css';
import "animate.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerShop } from '../../../pages/redux/apiRequest';

const RegisterShop = () => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setaddressDetail] = useState('');
    const [description, setdescription] = useState('');
    const [errors, setErrors] = useState({});
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
        const validationErrors = {};


        if (!shopName) {
            validationErrors.shopName = 'Tên cửa hàng là bắt buộc';
        }


        if (!address) {
            validationErrors.address = 'Địa chỉ là bắt buộc';
        }


        if (!addressDetail) {
            validationErrors.addressDetail = 'Địa chỉ cụ thể là bắt buộc';
        }


        if (!phone) {
            validationErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^\d+$/.test(phone)) {
            validationErrors.phone = 'Số điện thoại không hợp lệ';
        }
        setErrors(validationErrors);


        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        const newShoper = {
            addressDetail: addressDetail,
            shopName: shopName,
            address: address,
            phone: phone,
            description: 'dan choi chim'
        }

        registerShop(newShoper, dispatch, navigate, accessToken);

    }
    return (
        <div className="contains mb-5 mt-5">
            <h3 className="text-center">Đăng Ký Shop</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3 content">
                    <label htmlFor="shopName" className="form-label">Tên Cửa Hàng:</label>
                    <input type="text" className="form-control" id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                    {errors.shopName && <p className="text-danger">{errors.shopName}</p>}
                </div>
                <div className="mb-3 content">
                    <label htmlFor="address" className="form-label">Địa Chỉ:</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {errors.address && <p className="text-danger">{errors.address}</p>}
                </div>
                <div className="mb-3 content">
                    <label htmlFor="addressDetail" className="form-label">Địa Chỉ Cụ Thể:</label>
                    <input type="text" className="form-control" id="addressDetail" value={addressDetail} onChange={(e) => setaddressDetail(e.target.value)} />
                    {errors.addressDetail && <p className="text-danger">{errors.addressDetail}</p>}
                </div>
                <div className="mb-3 content">
                    <label htmlFor="phone" className="form-label">Số Điện Thoại:</label>
                    <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                </div>
                <button type="submit" className="btn-primary">Đăng Ký</button>
            </form>
        </div>
    )

}

export default RegisterShop