import React from "react";
import '../../../style/selectAddress.css';
//import { FloatingLabel } from "react-bootstrap";

const SelectAddress = ({ label,Province },) => {
 // const address = Object.entries(Province).map(Province => Province)
  const listOption = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
 
  return (
    <div className="select-address-log1">
      {
        label === 'Province' && (
        <select className="select-address">
          <option value="" className="select-options sources">{`--Select ${label}--`}</option>
          {listOption.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>)
      }
 {
        label === 'District' && (
        <select className="select-address">
          <option value="" className="select-options sources">{`--Select ${label}--`}</option>
          {listOption.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>)
      }
    </div>
  );
};

export default SelectAddress;
