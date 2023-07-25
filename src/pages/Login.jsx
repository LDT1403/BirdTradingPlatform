import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./redux/apiRequest";
import Helmet from "../components/Helmet/Helmet";
import "../style/Login.css";
import "animate.css";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const errorAlert = useRef();
    const errorPassword = useRef();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const toggleForgotPassword = () => {
        setIsForgotPasswordVisible(!isForgotPasswordVisible);
    };

    const handleForgotPasswordSuccess = () => {
        setIsForgotPasswordVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            errorAlert.current.className = "login__errorAlert";
            errorAlert.current.innerText = "Vui lòng nhập email";
            inputRef.current.focus();
            return;
        }

        if (!validateEmail(email)) {
            errorAlert.current.innerText = "Email sai định dạng";
            return;
        }

        if (!password) {
            errorPassword.current.className = "login__errorAlert";
            errorPassword.current.innerText = "Vui lòng nhập mật khẩu";
            return;
        }

        const newUser = {
            email: email,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };

    const hanldeOnInput = (e) => {
        if (e.target.value) {
            errorAlert.current.innerText = "";
        }
        if (password) {
            errorPassword.current.innerText = "";
        }
    };

    return (
        <>
            <Helmet title="Login">
                <div className="Login-Wrapper">
                    <div className="Login animate__animated animate__fadeInDown">
                        <div className="login-body">
                            <div className="login__form-body">
                                <form className="login__form-content" onSubmit={handleSubmit}>
                                    <header className="Login__header">
                                        <h2>Đăng Nhập</h2>
                                    </header>
                                    <div className="login_form-group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="login__input-box mt-4"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onInput={(e) => {
                                                hanldeOnInput(e);
                                            }}
                                            ref={inputRef}
                                        />
                                        <span ref={errorAlert}></span>
                                    </div>
                                    <div className="login__form-group">
                                        <input
                                            type="password"
                                            placeholder="Mật Khẩu"
                                            className="login__input-box mt-4"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onInput={(e) => {
                                                hanldeOnInput(e);
                                            }}
                                        />
                                        <span ref={errorPassword}></span>
                                    </div>
                                    <div
                                        className="forgot-password mb-2 d-block"
                                        onClick={toggleForgotPassword}
                                    >
                                        Quên mật khẩu
                                    </div>
                                    <button className="btn-sign-in">Đăng Nhập</button>
                                    <div className="separate mt-4 mb-4">
                                        <div className="line"></div>
                                        <span>Hoặc</span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="login__google mt-3">
                                        <i className="ri-google-fill"></i>
                                    </div>
                                    <div className="sign-up mt-3">
                                        <span>Bạn Chưa Có Tài Khoản ?</span>
                                        <Link to="/register">Đăng Ký</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Helmet>
            {isForgotPasswordVisible && (
                <ForgotPassword
                    isVisible={isForgotPasswordVisible}
                    onSuccess={handleForgotPasswordSuccess}
                />
            )}
        </>
    );
};

export default Login;
