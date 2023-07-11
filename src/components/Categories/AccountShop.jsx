import axios from "axios";
import { error } from "jquery";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Col, Container, Row } from "reactstrap";
import { TextField } from "@mui/material";
import AddressShop from "./AddressShop";
import SelectAddress from "../UI/addNewAddress/SelectAddress";

const AccountShop = () => {
  const [rate, setRate] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [City, setCity] = useState(null);
  const [District, setDistrict] = useState(null);
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
  const [MsAllNull, setMsAllNull] = useState(false);
  const accessToken = localStorage.getItem("jwtToken");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };

  useEffect(() => {
    axios
      .get("https://localhost:7241/api/Shop", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const profileData = res.data;
        setRate(profileData.rate);
        setShopName(profileData.shopName);
        setAddress(profileData.address);
        setPhone(profileData.phone);
        console.log(profileData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const apiProvince = () => {
      axios.get("https://vapi.vnappmob.com/api/province").then((response) => {
        const result = response.data.results;
        setProvince(result);
      });
    };
    if (City === null) {
      apiProvince();
    }
  }, [City]);

  useEffect(() => {
    const apiDistrict = () => {
      axios
        .get(`https://vapi.vnappmob.com/api/province/district/${IdCity}`)
        .then((response) => {
          const result = response.data.results;
          setDistrictData(result);
        });
    };
    if (Districtag === 2) {
      apiDistrict();
      setDistrictag(1);
    }
  }, [Districtag]);
  useEffect(() => {
    const apiWard = () => {
      axios
        .get(`https://vapi.vnappmob.com/api/province/ward/${IdDistrict}`)
        .then((response) => {
          const result = response.data.results;
          setWardData(result);
        });
    };
    if (Wardag === 2) {
      apiWard();
      setWardag(1);
    }
  }, [Wardag]);

  return (
    <Container>
      <Col lg="8">
        <div className="mb-4">
          <div>
            <div className="p-3">
              <div>
                <label>Shop Name</label>
              </div>
              <TextField type="text" value={shopName} />
            </div>
            <div className="p-3">
              <div>
                <label>Rate</label>
              </div>
              <Rating name="read-only" value={rate} readOnly />
            </div>
            <div className="p-3">
              <div>
                <label>Phone</label>
              </div>
              <TextField type="text" value={phone} />
            </div>
            <div>
              <div className="p-3">
                <label>Address</label>
                <div className="Address-log-add ">
                  <SelectAddress
                    label="Province"
                    setCity={setCity}
                    setidCity={setidCity}
                    Province={Province}
                    setDistrictag={setDistrictag}
                    setWardag={setWardag}
                    setDistrict={setDistrict}
                    setidDistrict={setidDistrict}
                    setMsAddress={setMsAddress}
                  />
                  <SelectAddress
                    label="District"
                    setDistrict={setDistrict}
                    setidDistrict={setidDistrict}
                    DistrictData={DistrictData}
                    setWardag={setWardag}
                    setWard={setWard}
                    setMsAddress={setMsAddress}
                  />
                  <SelectAddress
                    label="Ward"
                    setWard={setWard}
                    WardData={WardData}
                    setMsAddress={setMsAddress}
                  />
                </div>
                <div>
                  <Button variant="contained" onClick={handleShowAddressForm}>
                    Add new address
                  </Button>
                  {showAddressForm && <AddressShop />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default AccountShop;
