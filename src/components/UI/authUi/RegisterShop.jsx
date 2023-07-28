import React, { useState, useEffect } from 'react';
import '../../../style/registerShop.css';
import "animate.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerShop } from '../../../pages/redux/apiRequest';
import AddressShop from '../../Categories/AddressShop';
import { TextField } from '@mui/material';

const RegisterShop = () => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setaddressDetail] = useState('');
    const [description, setdescription] = useState('');
    const [errors, setErrors] = useState({});
    const [phone, setPhone] = useState('');
    const [City, setCity] = useState(null);
    const [Districtag, setDistrictag] = useState(1);
    const [Ward, setWard] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("jwtToken");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic khi form được gửi đi (gửi dữ liệu lên máy chủ, lưu vào cơ sở dữ liệu, v.v.)
        // console.log('Shop Name:', shopName);
        // console.log('Address:', address);
        // console.log('Phone Number:', phoneNumber);
        const validationErrors = {};
        const newShoper = {
            addressDetail: newAddress,
            shopName: shopName,
            address: address,
            phone: phone,
            description: '',
        }

        console.log(newShoper);
        if (!shopName) {
            validationErrors.shopName = 'Tên cửa hàng là bắt buộc';
        }


        if (!address) {
            validationErrors.address = 'Địa chỉ là bắt buộc';
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


        
            registerShop(newShoper, dispatch, navigate, accessToken);
     


    }
    const handleShowAddressForm = () => {
        setShowAddressForm(true);
    };
    const [cac, setcasc] = useState(false);
    useEffect(() => {
        if (newAddress !== "") {
            setcasc(true)
        } else {
            setcasc(false)
        }

    }, [newAddress])
    return (
        <div style={{ padding: '70px 0px', backgroundColor: 'rgb(213, 226, 231)' }}>
            <div className="contains">
                <div className="text-center">Đăng Ký Shop</div>
                <form >
                    <div className=" mt-3 content">
                        <label htmlFor="shopName" className="form-label">Tên Cửa Hàng:</label>
                        <input type="text" className="form-control" id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                        {errors.shopName && <p className="text-danger">{errors.shopName}</p>}
                    </div>
                    {
                        cac === true && (
                            <div className=" content">
                                <label htmlFor="address" className="form-label">Địa Chỉ:</label>
                                <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                {errors.address && <p className="text-danger">{errors.address}</p>}
                            </div>
                        )
                    }


                    <label htmlFor="address" className="form-label">Địa Chỉ:</label>
                    <TextField
                        type="text"
                        value={newAddress}
                        style={{

                            width: "360px",
                            marginRight: "20px",
                        }}
                        onClick={handleShowAddressForm}
                    />


                    {showAddressForm && (
                        <AddressShop
                            accessToken={accessToken}
                            setShowAddressForm={setShowAddressForm}
                            setNewAddress={setNewAddress}
                            setAddress={setAddress}
                        />
                    )}
                    <div className="mb-3 mt-3 content">
                        <label htmlFor="phone" className="form-label">Số Điện Thoại:</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {errors.phone && <p className="text-danger">{errors.phone}</p>}
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn-primary">Đăng Ký</button>
                </form>
            </div>

        </div>


    )
}
export default RegisterShop;
