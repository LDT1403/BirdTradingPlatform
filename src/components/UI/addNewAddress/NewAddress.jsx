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

     }

     const handleSubmit = () => {
          axios.post("https://localhost:7241/api/Order/AddressOder", NewAddressAdd, {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          })
               .then(response => {
                    setShowAddNewAddress(false);
                    setShowNotification(true);
               })

     }
     const handleCancelAdd = () => {
          console.log(NewAddressAdd)
          //setShowAddNewAddress(false);
          //setShowNotification(true);
     }
     const NewAddressAdd =
     {
          address: `${City},${District},${Ward}`,
          addressDetail: addressDetails,
          phone: phone,
          nameRg: fullName
     };

     const handleInfo = (e) => {
          if (e.target.id === "myInputFullName") {
               setFullName(e.target.value);
          } else if (e.target.id === "myInputPhone") {
               setPhone(e.target.value);
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
                         </div>
                    </div>
                    <div className="Address-log-add ">
                         <SelectAddress label='Province' setCity={setCity} setidCity={setidCity} Province={Province} setDistrictag={setDistrictag} setWardag={setWardag} />
                         <SelectAddress label='District' setDistrict={setDistrict} setidDistrict={setidDistrict} DistrictData={DistrictData} setWardag={setWardag} />
                         <SelectAddress label='Ward' setWard={setWard} WardData={WardData} />
                    </div>
                    <div className="addDetail-logAdd">
                         <input
                              placeholder="Street Name, Building, House No."
                              type="text"
                              value={addressDetails}
                              onChange={(e) => handleAddDetail(e.target.value)} />

                    </div>
                    <div className="height-log">

                    </div>
                    <div className="cf-ad-bt-bottom">
                         <button onClick={handleCancelAdd}>Cancel</button>
                         <button className="cf-ad-bt-confirm" onClick={handleSubmit}> Submit </button>
                    </div>
               </div>
          </div>
     )
};
export default NewAddress;