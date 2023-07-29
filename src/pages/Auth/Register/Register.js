import { useRef, useState, useEffect } from "react";
// import { registerUser } from "../../redux/apiRequest";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Register() {

    // const navigate = useNavigate();

    const inputRef = useRef({});

    const [registerInfo, setRegisterInfo] = useState({
        fullname: "",
        email: "",
        gender: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
    });
    const checkStringContainInPhoneNumber = (phone) => {
        var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        return !Regex.test(phone);
    };

    function validateUsername(username) {
        const pattern = /^[\p{L}\s]+$/u;
        return pattern.test(username);
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    useEffect(() => {
        inputRef.current["email"].focus();
    }, []);

    // Functions
    const handleTextInputChange = (e) => {
        setRegisterInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };
    console.log(registerInfo);

    const handleRegister = async () => {
        localStorage.setItem("previousPage", window.location.pathname);// validate
        const {
            phone,
            email,
            fullname,
            role,
            password,
            confirmPassword,
            gender,
        } = registerInfo;


        if (!email) {
            inputRef.current["email"].className = "input-box error";
            return;
        }

        // validate email
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Email sai định dạng");
            return;
        }

        // username
        if (!fullname) {
            inputRef.current["name"].className = "input-box error";
            return;
        }

        if (!validateUsername(fullname)) {
            inputRef.current["isValidName"].innerText =
                "Tên không được chứa số, kí tự đặc biệt";
            return;
        }

        // birthdate
        if (!role) {
            inputRef.current["role"].className = "input-box error";
            return;
        }

        //validate phone number
        if (!phone) {
            inputRef.current["phone"].className = "input-box error";
            return;
        }

        const isContainsString = checkStringContainInPhoneNumber(phone);
        if (isContainsString) {
            inputRef.current["phone"].className = "input-box error";
            inputRef.current["isValidPhone"].innerText = "SDT không được chứa kí tự";
            return;
        }
        if (+phone.charAt(0) !== 0) {
            inputRef.current["phone"].className = "input-box error";
            toast.error("SDT phải bắt đầu bằng số 0");
            return;
        }
        if (phone.length < 10 || phone.length > 11) {
            inputRef.current["phone"].className = "input-box error";
            toast.error("SDT phải có 10 hoặc 11 số ");
            return;
        }

        // validate password
        if (password.length < 6) {
            inputRef.current["curPass"].className = "input-box error";
            inputRef.current["isValidPassword"].innerText =
                "Mật khẩu tối thiểu phải có 6 kí tự";
            return;
        }
        alert("fsfds")

        if (confirmPassword.length < 6) {
            inputRef.current["confirmPass"].className = "input-box error";
            inputRef.current["isConfirmPassword"].innerText =
                "Mật khẩu tối thiểu phải có 6 kí tự";
            return;
        }

        if (password !== confirmPassword) {
            inputRef.current["confirmPass"].className = "input-box error";
            toast.error("Mật khẩu nhập lại không chính xác");
            return;
        }

        // validate gender
        if (!gender) {
            inputRef.current["isValidGender"].innerText = "Chọn giới tính của bạn";
            return;
        }

    }

    const hanldeEmptyInput = (e) => {
        if (!e.target.value) {
            e.target.className = "input-box error";
        } else {
            e.target.className = "input-box";
        }
        if (e.target.checked) {
            inputRef.current["isValidGender"].innerText = "";
        }
    };

    const hanldeOnBlurInput = (e) => {
        if (e.target.value) {
            e.target.className = "input-box";
            for (const key in inputRef.current) {
                if (inputRef.current.hasOwnProperty(key)) {
                    inputRef.current[key].innerText = "";
                }
            }
        }
    };

    const hanldeCheckEmptyCheckBox = (e) => {
        if (e.target.value) {
            inputRef.current["isValidGender"].innerText = "";
        }
    };

    return (
        <>
            <div className="Register-Wrapper ">
                <div className="Register-body animate__animated animate__fadeInDown">
                    <div className="form-body">
                        <div className="form-content">
                            <h2>Đăng Kí</h2>

                            <div className="form-group mt-3">
                                <span>Email (*)</span>
                                <input
                                    name="email"
                                    placeholder="Nhập email"
                                    className="input-box"
                                    value={registerInfo.email}
                                    ref={(element) => {
                                        inputRef.current["email"] = element;
                                    }}
                                    onChange={handleTextInputChange}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <span>Họ và tên (*)</span>
                                <input
                                    name="fullname"
                                    placeholder="Nhập họ và tên"
                                    type="text"
                                    className="input-box"
                                    value={registerInfo?.fullname}
                                    // required
                                    ref={(element) => {
                                        //define key, value for obj current
                                        inputRef.current["role"] = element;
                                    }}
                                    onChange={handleTextInputChange}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                    onBlur={(e) => {
                                        hanldeEmptyInput(e);
                                    }}
                                />
                                <span
                                    ref={(element) => {
                                        inputRef.current["isValidName"] = element;
                                    }}
                                    className="errorAlert mt-2"
                                ></span>
                            </div>
                            <div className="form-group mt-3">
                                <span>Role (*)</span>
                                {/* <input
                                    name="role"
                                    type="date"
                                    value={registerInfo?.role}
                                    className="input-box"
                                    onChange={handleTextInputChange}
                                    // required
                                    ref={(element) => {
                                        inputRef.current["birth"] = element;
                                    }}
                                    onBlur={(e) => {
                                        hanldeEmptyInput(e);
                                    }}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                /> */}
                                <select name="role"
                                    className="input-box"
                                    onChange={handleTextInputChange}
                                    value={registerInfo?.role}
                                    // required
                                    // ref={(element) => {
                                    //     inputRef.current["role"] = element;
                                    // }}
                                    // onBlur={(e) => {
                                    //     hanldeEmptyInput(e);
                                    // }}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                >
                                    <option value={'customer'}>Customer</option>
                                    <option value={'shop'}>Shop</option>
                                </select>

                            </div>

                            <div className="form-group mt-3">
                                <span>Số Điện Thoại (*)</span>
                                <input
                                    name="phone"
                                    placeholder="Nhập số điện thoại"
                                    className="input-box"
                                    value={registerInfo.phone}
                                    ref={(element) => {
                                        inputRef.current["phone"] = element;
                                    }}
                                    onChange={handleTextInputChange}
                                    onBlur={(e) => {
                                        hanldeEmptyInput(e);
                                    }}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                />
                                <span
                                    ref={(element) => {
                                        inputRef.current["isValidPhone"] = element;
                                    }}
                                    className="errorAlert mt-2"
                                ></span>
                            </div>

                            <div className="form-group mt-3">
                                <span>Mật khẩu (*)</span>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    className="input-box"
                                    value={registerInfo.password}
                                    // required
                                    ref={(element) => {
                                        inputRef.current["curPass"] = element;
                                    }}
                                    onChange={handleTextInputChange}
                                    onBlur={(e) => {
                                        hanldeEmptyInput(e);
                                    }}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                />
                                <span
                                    ref={(element) => {
                                        inputRef.current["isValidPassword"] = element;
                                    }}
                                    className="errorAlert mt-2"
                                ></span>
                            </div>

                            <div className="form-group mt-3">
                                <span>Nhập lại mật khẩu (*)</span>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    className="input-box"
                                    // required
                                    ref={(element) => {
                                        inputRef.current["confirmPass"] = element;
                                    }}
                                    value={registerInfo.confirmPassword}
                                    onChange={handleTextInputChange}
                                    onBlur={(e) => {
                                        hanldeEmptyInput(e);
                                    }}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                />
                                <span
                                    ref={(element) => {
                                        inputRef.current["isConfirmPassword"] = element;
                                    }}
                                    className="errorAlert mt-2"
                                ></span>
                            </div>

                            <div className="form-group mt-3">
                                <span>Giới Tính (*)</span>
                                <div className="sex">
                                    <div className="checkbox-group">
                                        <input
                                            // className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="flexRadioDefault1"
                                            value="male"
                                            // required
                                            ref={(element) => {
                                                inputRef.current["male"] = element;
                                            }}
                                            checked={registerInfo.gender === "male"}
                                            onChange={handleTextInputChange}
                                            onInput={(e) => {
                                                hanldeCheckEmptyCheckBox(e);
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefault1"
                                        >
                                            Nam
                                        </label>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="flexRadioDefault1"
                                            value="female"
                                            ref={(element) => {
                                                inputRef.current["female"] = element;
                                            }}
                                            checked={registerInfo.gender === "female"}
                                            onChange={handleTextInputChange}
                                            onInput={(e) => {
                                                hanldeCheckEmptyCheckBox(e);
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexRadioDefault1"
                                        >
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                                <center>
                                    <span
                                        ref={(element) => {
                                            inputRef.current["isValidGender"] = element;
                                        }}
                                        className="errorAlert mt-2"
                                    ></span>
                                </center>
                            </div>
                            <button className="btn-register" onClick={handleRegister}>
                                Đăng Kí
                            </button>
                            <div className="sign-up mt-3">
                                <span>Bạn Đã Có Tài Khoản ?</span>
                                <Link to="/login">Đăng Nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register