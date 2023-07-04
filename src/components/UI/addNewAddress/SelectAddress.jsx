import React from "react";
import '../../../style/selectAddress.css';
const SelectAddress = ({ label, Province, setCity, setidCity, DistrictData, setDistrictag, setDistrict, setidDistrict, setWardag, WardData, setWard ,setMsAddress }) => {
  const handleCity = (event) => {
    const ProvinceId = event.target.options[event.target.selectedIndex].getAttribute('data-province-id');
    const ProvinceName = event.target.value;
    setCity(ProvinceName);
    setidCity(ProvinceId);
    setDistrict(null);
    setDistrictag(2);
    setWardag(2);
    setidDistrict(1000);
    setMsAddress(false);

  }
  const handleDistrict = (event) => {
    const DistrictId = event.target.options[event.target.selectedIndex].getAttribute('data-district-id');
    const DistrictName = event.target.value;
    setDistrict(DistrictName);
    setidDistrict(DistrictId);
    setWard(null)
    setWardag(2);
    setMsAddress(false);

  }
  const handleWard = (event) => {
    const WardName = event.target.value;
    setWard(WardName);
    setMsAddress(false);



  }

  return (
    <div className="select-address-log1">
      {
        label === 'Province' && (
          <select className="select-address"
            onChange={handleCity}
          >
            <option value="" className="select-options sources">{`--Select ${label}--`}</option>
            {Province.map((result) => (
              <option key={result.province_id} value={result.province_name} data-province-id={result.province_id}  >
                {result.province_name}
              </option>
            ))}
          </select>)
      }
      {
        label === 'District' && (
          <select className="select-address"
            onChange={handleDistrict}>
            <option value="" className="select-options sources">{`--Select ${label}--`}</option>
            {DistrictData.map((result) => (
              <option key={result.district_id} value={result.district_name} data-district-id={result.district_id}>
                {result.district_name}
              </option>
            ))}
          </select>)
      }

      {
        label === 'Ward' && (
          <select className="select-address"
            onChange={handleWard}>
            <option value="" className="select-options sources">{`--Select ${label}--`}</option>
            {WardData.map((result) => (
              <option key={result.ward_id} value={result.ward_name} data-ward-id={result.ward_id}>
                {result.ward_name}
              </option>
            ))}
          </select>)
      }
    </div>
  );
};

export default SelectAddress;
