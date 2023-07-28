import React, { useEffect, useState, useCallback } from "react";
import { Container, Row } from "reactstrap";
import "../style/account-user.css";
import "../style/change-password.css";
import axios from "axios";
import logo from "../assets/images/account-circle-line.png";
import Alert from "@mui/material/Alert";
import ChangePassword from "./Auth/ChangePassword";
import { updateUser } from "./redux/apiRequest";
import { useDispatch } from "react-redux";

const AccountUser = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    avatar: "",
  });

  const [inputStates, setInputStates] = useState({
    userName: false,
    email: false,
    phone: false,
    dob: false,
    gender: false,
    address: false,
  });

  // preview Avatar
  const defaultAvatarUrl = userData?.avatar;
  const [avatar1, setAvatar] = useState(defaultAvatarUrl);
  const [showDefaultAvatar, setShowDefaultAvatar] = useState(true);
  const handlePreviewAvatar = useCallback((e) => {
    const file = e.target.files[0];
    // file.preview = URL.createObjectURL(file);
    setAvatar(file);
    setShowDefaultAvatar(false);
  });
  useEffect(() => {
    const defaultInputStates = {
      userName: userData.userName !== "",
      email: userData.email !== "",
      phone: userData.phone !== "",
      dob: userData.dob !== "",
      gender: userData.gender !== "",
      address: userData.address !== "",
      password: userData.password !== "",
    };
    setInputStates(defaultInputStates);
  }, [userData]);
  const accessToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get("https://birdtradingplatformapi.azurewebsites.net/api/User/Meee", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const profileData = res.data.result;
        // console.log(profileData);
        setUserData(profileData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const dispatch = useDispatch();

  const handleGenderChange = (e) => {
    setUserData({ ...userData, gender: e.target.value });
  };

  const handleInputBlur = (fieldName, fieldValue) => {
    setInputStates({
      ...inputStates,
      [fieldName]: fieldValue.trim() !== "",
    });
  };
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [showAlert, setShowAlert] = useState(false);
  const handleUpdate = () => {
    const { userName, email, phone, dob, gender, address } = userData;
    const hasEmptyFields =
      !userName || !email || !phone || !dob || !gender || !address;

    if (hasEmptyFields) {
      setAlert({
        type: "error",
        message: "Cập nhật thất bại.",
      });
    } else {
      setAlert({
        type: "success",
        message: "Cập nhật thành công.",
      });
    }
    const newUser = {
      Dob: dob,
      Address: address,
      Phone: phone,
      Gender: gender,
      Name: userName,
      avatar: avatar1,
    };
    console.log("", newUser.avatar1);
    updateUser(newUser, accessToken, dispatch);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlert({ type: "", message: "" });
    }, 5000);
    // console.log("Updated Profile Data:");
    // console.log("userName:", userName);
    // console.log("Email:", email);
    // console.log("Phone:", phone);
    // console.log("DOB:", dob);
    // console.log("Gender:", gender);
    // console.log("Address:", address);
    // console.log("Avt", avatar);
  };
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleShowPasswordForm = () => {
    setShowPasswordForm(true);
  };
  const handleCancelPasswordForm = () => {
    setShowPasswordForm(false);
  };
  const [passwordChanged, setPasswordChanged] = useState(false);
  const handlePasswordChanged = () => {
    setPasswordChanged(true);
    setShowPasswordForm(false);
  };

  return (
    <Container>
      <div>
        <h1 className="text-center align-self-center my-auto pt-5 pb-5">
          Thông tin tài khoản của bạn
        </h1>
      </div>

      <Row>
        <div className="col-xl-3 ">
          <div className="card h-80 ">
            <div className="card-header">Ảnh đại diện</div>
            <div className="card-body text-center">
              <div className="avatar">
                <div className="img-account-profile rounded-circle ">
                  {showDefaultAvatar ? (
                    <img
                      src={userData?.avatar ? userData.avatar : logo}
                      alt="Default Avatar"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(avatar1)}
                      alt="Selected Avatar"
                    />
                  )}
                </div>
                <input type="file" onChange={handlePreviewAvatar} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-95">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label for="userName">Họ tên</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      value={userData.userName}
                      onBlur={(e) =>
                        handleInputBlur("userName", e.target.value)
                      }
                      onChange={(e) =>
                        setUserData({ ...userData, userName: e.target.value })
                      }
                    />
                    {!inputStates.userName && (
                      <small className="form-text text-danger">
                        Cần có Họ tên.
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label for="email">Email</label>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={userData.email}
                      onBlur={(e) => handleInputBlur("email", e.target.value)}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                    {!inputStates.email && (
                      <small className="form-text text-danger">
                        Cần có Email.
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label for="phone">Số điện thoại</label>

                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={userData.phone}
                      onBlur={(e) => handleInputBlur("phone", e.target.value)}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                    {!inputStates.phone && (
                      <small className="form-text text-danger">
                        Cần có số điện thoại.
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label for="Dob">Ngày sinh</label>

                    <input
                      type="datetime-local"
                      className="form-control"
                      id="dob"
                      value={userData.dob}
                      onBlur={(e) => handleInputBlur("dob", e.target.value)}
                      onChange={(e) =>
                        setUserData({ ...userData, dob: e.target.value })
                      }
                    />
                    {!inputStates.dob && (
                      <small className="form-text text-danger">
                        Cần có ngày sinh.
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label for="Gender">Giới tính</label>
                    <div className="gender">
                      <select
                        className="form-control"
                        id="gender"
                        value={userData.gender}
                        onBlur={(e) =>
                          handleInputBlur("gender", e.target.value)
                        }
                        onChange={handleGenderChange}
                      >
                        <option value="">Select gender</option>
                        <option value="Nam">Male</option>
                        <option value="Nu">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {!inputStates.gender && (
                      <small className="form-text text-danger pt-2">
                        Cần có giới tính.
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  {showPasswordForm && (
                    <ChangePassword
                      onCancelPasswordForm={() => setShowPasswordForm(false)}
                      onPasswordChanged={handlePasswordChanged} // Kiểm tra xem hàm onPasswordChanged đã được truyền vào ChangePassword chưa
                    />
                  )}
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <div className="d-flex">
                      <input
                        className="form-control"
                        id="address"
                        rows="3"
                        type="text"
                        readOnly
                        value="********"
                      />

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowPasswordForm(true)}
                      >
                        Thay đổi
                      </button>
                    </div>
                    {passwordChanged && (
                      <div className="text-success">
                        Mật khẩu của bạn đã được thay đổi.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label for="Address">Địa chỉ</label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    value={userData.address}
                    onBlur={(e) => handleInputBlur("address", e.target.value)}
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
                  ></textarea>
                  {!inputStates.address && (
                    <small className="form-text text-danger">
                      Cần có địa chỉ.
                    </small>
                  )}
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      Cập nhật
                    </button>
                    <div className={`my-alert ${showAlert ? "show" : ""}`}>
                      {alert.message && (
                        <Alert severity={alert.type}>{alert.message}</Alert>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default AccountUser;
