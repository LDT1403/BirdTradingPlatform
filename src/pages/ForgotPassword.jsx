import React, { useState } from "react";
import "../style/forgot-password.css";
import axios from "axios";
import { toast } from 'react-toastify';

const ForgotPassword = ({ isVisible, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [isRequesting, setIsRequesting] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsRequesting(true);

        if (!validateEmail(email)) {
            setError("Vui lòng nhập một địa chỉ email hợp lệ.");
            setIsRequesting(false);
            return;
        }

        axios
            .post("https://birdtradingplatformapi.azurewebsites.net/api/User/reset-password", { email })
            .then((response) => {
                toast.success("Yêu cầu đặt lại mật khẩu đã được gửi thành công!");
                onSuccess(); // Gọi hàm onSuccess khi yêu cầu thành công
            })
            .catch((error) => {
                toast.error("Có lỗi xảy ra trong quá trình gửi yêu cầu. Vui lòng thử lại sau.");
            })
            .finally(() => {
                setIsRequesting(false);
            });
    };

    const handleClose = () => {
        onSuccess();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(""); // Xóa thông báo lỗi khi người dùng thay đổi giá trị email
    };

    return (
        <div className={`modal ${isVisible ? "visible" : ""}`} onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Quên mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {error && <p style={{ color: 'red' }} className="error-message">{error}</p>}
                    <button type="submit" disabled={isRequesting}>
                        {isRequesting ? "Đang xử lý..." : "Gửi yêu cầu"}
                    </button>
                </form>
                <span className="close-modal" onClick={handleClose}>
                    &times;
                </span>
            </div>
        </div>
    );
};

export default ForgotPassword;
