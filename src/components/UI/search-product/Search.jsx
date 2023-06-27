import React, { useState } from "react";
import '../../../style/search-product.css';
export const SearchProduct = ({ handleSearchQuery, placeholder }) => {
     const [sear, setSearch] = useState("");
     const handleSearch = (e) => {
          setSearch(e.target.value);
     };
     const handleSearchButton = () => {
          handleSearchQuery(sear);
     }
     const handleKeyPress = (event) => {
          if (event.key === 'Enter') {
               handleSearchButton();
          }
     };
     return (
          <div className="searchBox">
               <div className="search-input">
                    <input
                         type="text"
                         name="searchQuery"
                         placeholder={placeholder}
                         value={sear}
                         onChange={handleSearch}
                         onKeyDown={handleKeyPress}
                    />
                    <div className="search-button">
                         <button onClick={handleSearchButton}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-button-search">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                              </svg>

                         </button>
                    </div>
               </div>



          </div>

     )
}