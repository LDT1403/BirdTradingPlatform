import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../src/style/newAddress.css";
import SelectAddress from "../UI/addNewAddress/SelectAddress";
import { Button } from "reactstrap";

const AddressShop = ({
  setShowAddressForm,
  accessToken,
  setNewAddress,
  setAddress,
}) => {
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
  const handleAddDetail = (value) => {
    setAddressDetails(value);
    setMsAddressDetails(false);
  };

  const handleSubmit = () => {
    switch (true) {
      case !(City, District, Ward):
        setMsAddress(true);
        break;
      default:
        setNewAddress(`${City},${District},${Ward}`);
        setShowAddressForm(false);

        setAddress(City);
        setNewAddress(`${City},${District},${Ward}`);
        setShowAddressForm(false);
      // axios
      //   .post("https://localhost:7241/api/Shop", NewAddressAdd, {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   })
      //   .then((response) => {});
      // break;
    }
  };

  const handleCancelAdd = () => {
    setShowAddressForm(false);
  };

  console.log(City, District, Ward);

  return (
    <div className="confirmation-modal">
      <div className="log-add-newAddress">
        <div className="log-add-newAddress-tiltel">Địa chỉ chi tiết</div>
        <div className="Address-log-add ">
          <SelectAddress
            label="Tỉnh/Thành Ph.."
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
            label="Quận/Huyện"
            setDistrict={setDistrict}
            setidDistrict={setidDistrict}
            DistrictData={DistrictData}
            setWardag={setWardag}
            setWard={setWard}
            setMsAddress={setMsAddress}
          />
          <SelectAddress
            label="Phường/Xã"
            setWard={setWard}
            WardData={WardData}
            setMsAddress={setMsAddress}
          />
        </div>
        {/* {MsAddress && <p id="massage-er-input">Please select your Address</p>}
        <div className="addDetail-logAdd">
          <input
            placeholder="Street Name, Building, House No."
            type="text"
            value={addressDetails}
            onChange={(e) => handleAddDetail(e.target.value)}
          />
        </div>*/}
        {MsAddressDetails && (
          <p id="massage-er-input">Hãy nhập địa chỉ chi tiết</p>
        )}
        <div className="height-log"></div>
        {MsAllNull && <h5>Hãy kiểm tra lại thông tin</h5>}
        <div className="cf-ad-bt-bottom">
          <Button onClick={handleCancelAdd}>Hủy</Button>
          <Button className="cf-ad-bt-confirm" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressShop;
