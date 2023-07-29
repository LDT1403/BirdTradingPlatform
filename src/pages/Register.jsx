import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { toast } from "react-toastify";
import '../style/Register.scss';
import { registerUser } from "./redux/apiRequest";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";



const Register = () => {

    const inputRef = useRef({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');



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
    // const handleTextInputChange = (e) => {
    //     setRegisterInfo((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }));

    // };


    const handleRegister = async () => {
        // validate
        // const {
        //     email,
        //     fullname,
        //     role,
        //     password,
        //     confirmPassword,
        // } = registerInfo;




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
        if (!fullName) {
            inputRef.current["name"].className = "input-box error";
            return;
        }

        if (!validateUsername(fullName)) {
            inputRef.current["isValidName"].innerText =
                "Tên không được chứa số, kí tự đặc biệt";
            return;
        }

        // Role
        // if (!role) {
        //     inputRef.current["role"].className = "input-box error";
        //     return;
        // }


        // validate password
        if (password.length < 6) {
            inputRef.current["curPass"].className = "input-box error";
            inputRef.current["isValidPassword"].innerText =
                "Mật khẩu tối thiểu phải có 6 kí tự";
            return;
        }

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
        if (!gender) {
            inputRef.current["isValidGender"].innerText = "Chọn giới tính của bạn";
            return;
        }
        const newUser = {
            email: email,
            name: fullName,
            password: password,
            gender: gender,
        }
        console.log(newUser);

        registerUser(newUser, dispatch, navigate);

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
    const handleGenderChange = (e) => {
        setGender(e.target.checked ? e.target.value : '');
    };
    return (
        <Helmet title="Signup">
            {/* <CommonSection title="Signup" /> */}
            <div className="Register-Wrapper ">
                <div className="Register-body animate__animated animate__fadeInDown">
                    <div className="form-body">
                        <div className="form-content">
                            <h2 className="text-center">Đăng Ký</h2>

                            <div className="form-group mt-3">
                                <span>Email (*)</span>
                                <input
                                    name="email"
                                    placeholder="Nhập email"
                                    className="input-box"
                                    value={email}
                                    ref={(element) => {
                                        inputRef.current["email"] = element;
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onInput={(e) => {
                                        hanldeOnBlurInput(e);
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <span>Họ Và Tên (*)</span>
                                <input
                                    name="fullname"
                                    placeholder="Nhập Họ và Tên"
                                    type="text"
                                    className="input-box"
                                    value={fullName}
                                    // required
                                    ref={(element) => {
                                        //define key, value for obj current
                                        inputRef.current["role"] = element;
                                    }}
                                    onChange={(e) => setFullName(e.target.value)}
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
                            {/* <div className="form-group mt-3">
                                <span>Role (*)</span>
                                <select name="role"
                                    className="input-box"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}

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
                                    <option value={'CUS'}>Customer</option>
                                    <option value={'SP'}>Shop</option>
                                </select>

                            </div> */}
                            <div className="form-group mt-3">
                                <span>Mật Khẩu (*)</span>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Nhập Mật Khẩu"
                                    className="input-box"
                                    value={password}
                                    // required
                                    ref={(element) => {
                                        inputRef.current["curPass"] = element;
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                <span>Nhập Lại Mật Khẩu (*)</span>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Nhập Mật Khẩu"
                                    className="input-box"
                                    // required
                                    ref={(element) => {
                                        inputRef.current["confirmPass"] = element;
                                    }}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                            value="Nam"
                                            // required
                                            ref={(element) => {
                                                inputRef.current["Nam"] = element;
                                            }}
                                            checked={gender === "Nam"}
                                            onChange={handleGenderChange}
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
                                            value="Nữ"
                                            ref={(element) => {
                                                inputRef.current["Nữ"] = element;
                                            }}
                                            checked={gender === "Nữ"}
                                            onChange={handleGenderChange}
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
                            <button className="btn-register mt-3" style={{ color: "#fff" }} onClick={handleRegister}>
                                Đăng Ký
                            </button>
                            <div className="sign-up mt-3">
                                <span>Bạn Đã Tài Khoản ?</span>
                                <Link to="/login">Đăng Nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Helmet >
    )
}

export default Register;