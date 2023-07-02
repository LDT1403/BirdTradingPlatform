import React, { useEffect, useState } from "react";
import '../../../style/newAddress.css'
import SelectAddress from "./SelectAddress";
import axios from "axios";
const NewAddress = ({ setShowAddNewAddress, setShowNotification }) => {
     const [addressDetails, setAddressDetails] = useState()
     const [Province, setProvince] = useState([])
     const handleAddDetail = (value) => {
          setAddressDetails(value)

     }
     console.log(addressDetails);
     const handleSubmit = () => {
          setShowAddNewAddress(false)
          setShowNotification(true)
     }
     const handleCancelAdd = () => {
          setShowAddNewAddress(false)
          setShowNotification(true)
     }
     useEffect(() => {
          axios.get('https://vapi.vnappmob.com/api/province')
               .then((response) => {
                    setProvince(response.data)
                    console.log(response.data)
               })
          // const address = () => {

          // }

     })
     return (
          <div className="confirmation-modal">
               <div className="log-add-newAddress">
                    <div className="log-add-newAddress-tiltel"> New Address</div>
                    <div className="add-FullName-PhoneNumber">
                         <div className="FullName-logAdd">
                              <input type="text" id="myInput" required />
                              <label for="myInput">Full Name</label>
                         </div>
                         <div className="FullName-logAdd">
                              <input type="text" id="myInput" required />
                              <label for="myInput">Phone Number</label>
                         </div>
                    </div>
                    <div className="Address-log-add ">
                         <SelectAddress label='Province' Province={Province.map(province => province)} />
                         <SelectAddress label='District' />
                         <SelectAddress label='Ward' />
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