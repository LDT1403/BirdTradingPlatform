import axios from "axios";
import { error } from "jquery";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Col, Container, Row } from "reactstrap";
import { Alert, TextField } from "@mui/material";
import AddressShop from "./AddressShop";
import SelectAddress from "../UI/addNewAddress/SelectAddress";

const AccountShop = () => {
  const [rate, setRate] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [City, setCity] = useState(null);
  const [shopId, setshopId] = useState(null);
  const [Ward, setWard] = useState(null);
  const [addressDetails, setAddressDetails] = useState();
  const [Province, setProvince] = useState([]);
  const [DistrictData, setDistrictData] = useState([]);
  const [WardData, setWardData] = useState([]);
  const [IdCity, setidCity] = useState();
  const [IdDistrict, setidDistrict] = useState();
  const [Districtag, setDistrictag] = useState(1);
  const [Wardag, setWardag] = useState(1);
  const [MsAddress, setMsAddress] = useState(false);
  const [MsAddressDetails, setMsAddressDetails] = useState(false);
  const [loadAPI, setloadAPI] = useState(false);
  const accessToken = localStorage.getItem("jwtToken");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [alert, setAlert] = useState({
    message: "Cập nhật thành công.",
    type: "success",
  });
  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const loadApi = () => {
      axios
        .get("https://localhost:7241/api/Shop", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const profileData = res.data;
          setNewAddress(res.data.addressDetail);
          setRate(profileData.rate);
          setShopName(profileData.shopName);
          setAddress(profileData.address);
          setPhone(profileData.phone);
          setDescription(profileData.description);
          setshopId(profileData.shopId);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (loadAPI === false) {
      loadApi();
      setloadAPI(true);
    }
  }, [loadAPI]);

  const updateShop = {
    AddressDetail: newAddress,
    address: address,
    phone: phone,
    shopName: shopName,
    description: description,
  };

  const handleUpdate = () => {
    switch (true) {
      // case !shopName || /\d/.test(shopName):
      //   setShopName(true);
      //   break;
      // case !/^\d+$/.test(phone) || phone.length !== 10:
      //   setPhone(true);
      //   break;
      // case !(City, District, Ward):
      //   setMsAddress(true);
      //   break;
      // case !addressDetails:
      //   setMsAddressDetails(true);
      //   break;
      default:
        axios
          .put(
            `https://localhost:7241/api/Shop/UpdateShop/${shopId}`,
            updateShop,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            setloadAPI(false);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 5000);

            // }
          })
          .catch((error) => {
            console.error(error);
          });
        break;
    }
  };
  const changeDescription = (newDescription) => {
    setDescription(newDescription);
  };
  const changePhone = (newDescription) => {
    if (newDescription.length <= 10) {
      setPhone(newDescription);
    }
  };
  return (
    <Container>
      <Col lg="8">
        <div className="mb-4">
          <div>
            <div className="p-3">
              <div>
                <label>Tên cửa hàng</label>
              </div>
              <TextField type="text" value={shopName} />
            </div>
            <div className="p-3">
              <div>
                <label>Điểm đánh giá</label>
              </div>
              <Rating name="read-only" value={rate} readOnly />
            </div>
            <div className="p-3">
              <div>
                <label>Số điện thoại</label>
              </div>
              <TextField
                type="text"
                value={phone}
                onChange={(e) => changePhone(e.target.value)}
              />
            </div>
            <div className="p-3">
              <div>
                <label>Mô tả</label>
              </div>
              <TextField
                type="text"
                value={description}
                onChange={(e) => changeDescription(e.target.value)}
              />
            </div>

            <div className="p-3">
              <label>Địa chỉ</label>
              <div>
                <TextField type="text" value={address} />
                {console.log(address)}
              </div>
            </div>

            <div className="p-3">
              <label style={{ marginBottom: "10px" }}>Địa chỉ chi tiết</label>
              <br />
              <TextField
                type="text"
                value={newAddress}
                style={{
                  marginBottom: "10px",
                  width: "500px",
                  marginRight: "20px",
                }}
              />

              <Button variant="contained" onClick={handleShowAddressForm}>
                Cập nhật địa chỉ
              </Button>
              {showAddressForm && (
                <AddressShop
                  accessToken={accessToken}
                  setShowAddressForm={setShowAddressForm}
                  setNewAddress={setNewAddress}
                  setAddress={setAddress}
                />
              )}
            </div>
            <Button variant="contained" onClick={handleUpdate}>
              Cập nhật cửa hàng
            </Button>
          </div>
          <div className={`my-alert ${showAlert ? "show" : ""}`}>
            {alert.message && (
              <Alert severity={alert.type}>{alert.message}</Alert>
            )}
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default AccountShop;
