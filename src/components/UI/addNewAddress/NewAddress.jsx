import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../../style/newAddress.css'
import SelectAddress from "./SelectAddress";
import { event } from "jquery";

const NewAddress = ({ setShowAddNewAddress, setShowNotification, accessToken }) => {
     const [City, setCity] = useState(null);
     const [District, setDistrict] = useState(null);
     const [Ward, setWard] = useState(null);
     const [addressDetails, setAddressDetails] = useState();
     const [phone, setPhone] = useState();
     const [fullName, setFullName] = useState();
     const [Province, setProvince] = useState([]);
     const [DistrictData, setDistrictData] = useState([]);
     const [WardData, setWardData] = useState([]);
     const [IdCity, setidCity] = useState();
     const [IdDistrict, setidDistrict] = useState();
     const [Districtag, setDistrictag] = useState(1);
     const [Wardag, setWardag] = useState(1);
     const [MsFullName, setMsFullName] = useState(false);
     const [MsPhone, setMsPhone] = useState(false);
     const [MsAddress, setMsAddress] = useState(false);
     const [MsAddressDetails, setMsAddressDetails] = useState(false);
     const [MsAllNull, setMsAllNull] = useState(false);

     useEffect(() => {
          const apiProvince = () => {
               axios.get('https://vapi.vnappmob.com/api/province')
                    .then((response) => {
                         const result = response.data.results;
                         setProvince(result);
                    })
          }
          if (City === null) {
               apiProvince();
          }
     }, [City]);

     useEffect(() => {
          const apiDistrict = () => {
               axios.get(`https://vapi.vnappmob.com/api/province/district/${IdCity}`)
                    .then((response) => {
                         const result = response.data.results;
                         setDistrictData(result);
                    })

          }
          if (Districtag === 2) {
               apiDistrict();
               setDistrictag(1);
          }
     }, [Districtag]);
     useEffect(() => {
          const apiWard = () => {
               axios.get(`https://vapi.vnappmob.com/api/province/ward/${IdDistrict}`)
                    .then((response) => {
                         const result = response.data.results;
                         setWardData(result);
                    })

          }
          if (Wardag === 2) {
               apiWard();
               setWardag(1)
          }
     }, [Wardag]);
     const handleAddDetail = (value) => {
          setAddressDetails(value);
          setMsAddressDetails(false)
     }

     const handleSubmit = () => {
          switch (true) {

               case (!fullName || /\d/.test(fullName)):
                    setMsFullName(true);
                    break;
               case (!/^\d+$/.test(phone) || phone.length !== 10):
                    setMsPhone(true);
                    break;
               case (!(City, District, Ward)):
                    setMsAddress(true);
                    break;
               case (!addressDetails):
                    setMsAddressDetails(true);
                    break;
               default:
                    axios.post("https://localhost:7241/api/Order/AddressOder", NewAddressAdd, {
                         headers: {
                              Authorization: `Bearer ${accessToken}`
                         }
                    })
                         .then(response => {
                              setShowAddNewAddress(false);
                              setShowNotification(true);
                         })
                    break;
          }


     }
     const handleCancelAdd = () => {
          setShowAddNewAddress(false);
          setShowNotification(true);
     }
     const NewAddressAdd =
     {
          address: `${City},${District},${Ward}`,
          addressDetail: addressDetails,
          phone: phone,
          nameRg: fullName
     };
     console.log(City, District, Ward);
     const handleInfo = (e) => {
          if (e.target.id === "myInputFullName") {
               setMsFullName(false);
               setFullName(e.target.value);
          } else if (e.target.id === "myInputPhone") {
               setPhone(e.target.value);
               setMsPhone(false);
          }
     };
     return (
          <div className="confirmation-modal">
               <div className="log-add-newAddress">
                    <div className="log-add-newAddress-tiltel"> New Address</div>
                    <div className="add-FullName-PhoneNumber">
                         <div className="FullName-logAdd">
                              <input
                                   type="text"
                                   id="myInputFullName"
                                   value={fullName}
                                   onChange={handleInfo}
                                   required
                              />
                              <label htmlFor="myInputFullName">Full Name</label>
                              {
                                   MsFullName && (
                                        <p id="massage-er-input">input FullName</p>
                                   )
                              }

                         </div>
                         <div className="FullName-logAdd">
                              <input
                                   type="text"
                                   id="myInputPhone"
                                   value={phone}
                                   onChange={handleInfo}
                                   required
                              />
                              <label htmlFor="myInputPhone">Phone Number</label>
                              {
                                   MsPhone && (
                                        <p id="massage-er-input">input PhoneNumber</p>
                                   )
                              }

                         </div>
                    </div>
                    <div>

                    </div>
                    <div className="Address-log-add ">
                         <SelectAddress label='Province' setCity={setCity} setidCity={setidCity} Province={Province} setDistrictag={setDistrictag} setWardag={setWardag} setDistrict={setDistrict} setidDistrict={setidDistrict} setMsAddress={setMsAddress} />
                         <SelectAddress label='District' setDistrict={setDistrict} setidDistrict={setidDistrict} DistrictData={DistrictData} setWardag={setWardag} setWard={setWard} setMsAddress={setMsAddress} />
                         <SelectAddress label='Ward' setWard={setWard} WardData={WardData} setMsAddress={setMsAddress} />
                    </div>
                    {
                         MsAddress && (
                              <p id="massage-er-input">Please select your Address</p>
                         )
                    }
                    <div className="addDetail-logAdd">
                         <input
                              placeholder="Street Name, Building, House No."
                              type="text"
                              value={addressDetails}
                              onChange={(e) => handleAddDetail(e.target.value)} />

                    </div>
                    {
                         MsAddressDetails && (
                              <p id="massage-er-input">please input your address details</p>
                         )
                    }
                    <div className="height-log">

                    </div>
                    {
                         MsAllNull && (
                              <h5>Please provide complete information</h5>
                         )
                    }
                    <div className="cf-ad-bt-bottom">
                         <button onClick={handleCancelAdd}>Cancel</button>
                         <button className="cf-ad-bt-confirm" onClick={handleSubmit}> Submit </button>
                    </div>
               </div>
          </div>
     )
};
export default NewAddress;