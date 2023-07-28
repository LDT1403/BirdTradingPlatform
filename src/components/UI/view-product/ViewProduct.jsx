import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../product-card/ProductCard"

import '../../../style/view-product.css';

const ViewProduct = (api) => {
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All Product');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxPricee, setMaxPricee] = useState("");
  const [minPricee, setMinPricee] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const reloadData = () => { }

  useEffect(() => {
    axios.get(api.api)
      .then(res => {
        setProductsData(res.data);
        const uniqueCategories = Array.from(
          new Set(res.data.map((product) => product.cateName))
        );
        setCategories(uniqueCategories);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  useEffect(() => {
    if (productsData) {
      const updatedFilteredProducts = productsData.filter((product) => {
        if (selectedCategory === 'All Product') {
          return true;
        } else {
          return product.cateName === selectedCategory;
        }
      });
      const filteredByPrice = updatedFilteredProducts.filter((product) => {
        if (minPrice !== "" && maxPrice !== "") {
          return product.soldPrice >= minPrice && product.soldPrice <= maxPrice;
        } else if (minPrice !== "") {
          return product.soldPrice >= minPrice;
        } else if (maxPrice !== "") {
          return product.soldPrice <= maxPrice;
        } else
        if(maxPrice === "" && minPrice === ""){
          return product.soldPrice;
        }else {
          return true;
        }
      });
      const filteredByRating = filteredByPrice.filter((product) => {
        if (selectedRating > 0) {
          return product.rate >= selectedRating;
        } else {
          return true;
        }
      });
      const filteredBySearch = filteredByRating.filter((product) => {
        if (api.search) {
          return product.productName.toLowerCase().includes(api.search.toLowerCase());
        } else {
          return true;
        }
      });
      setFilteredProducts(filteredBySearch);
    }
  }, [productsData, selectedCategory, minPrice, maxPrice, selectedRating, api.search]);




  // const handleSearchQueryChange = (search) => {
  //   setSearchQuery(search);
  // };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min, max) => {
    setMaxPrice(max);
    setMinPrice(min);
    setCurrentPage(1);
  };

  const handleRatingFilter = (rating) => {
    // if(rating === selectedRating){
    //   setSelectedRating(0);
    // }
    setCurrentPage(1);
  };


  const handleRatingFilterChange = (rating) => {
    if(rating === selectedRating){
      setSelectedRating(0);
    }
    if(rating !== selectedRating ){
      setSelectedRating(rating);
      handleRatingFilter(rating);
    }
    
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "minPrice") {
      const minValue = parseFloat(e.target.value);
      if (!isNaN(minValue)) {
        setMinPricee(minValue);
      } else if (e.target.value === "") {
        setMinPricee("");
      }
    } else if (e.target.name === "maxPrice") {
      const maxValue = parseFloat(e.target.value);
      if (!isNaN(maxValue)) {
        setMaxPricee(maxValue);
      } else if (e.target.value === "") {
        setMaxPricee("");
      }
    }
  };
  const applyPriceRange = () => {

    setMinPrice(minPricee);
    setMaxPrice(maxPricee);
    setCurrentPage(1);


  };

  const productsPerPage = 24;
  const totalProducts = filteredProducts?.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentPageProducts = filteredProducts?.slice(startIndex, endIndex);

  if (productsData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Container className="m-auto pt-4 shopping-view">
        <Row className="m-0">


          <Col lg='2' md='3' className="p-0">
            <div className="shopContainer mb-4 ">
              <div className="shopCate p-0" style={{ backgroundColor: '#fff' }} >
                <div className="p-2">
                  <div className="cate">
                    <svg xmlns="http://www.w3.org/800/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="cateicon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Tất Cả Danh Mục
                  </div>
                  <div
                    className={`allProduct ${selectedCategory === 'All Product' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('All Product')}
                  >
                    Sản Phẩm
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`allProduct ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
                  ))}

                  <div className="priceRange">
                    <div className="cate">

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="cateicon">
                        <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
                      </svg>

                      Bộ Lọc Tìm Kiếm
                    </div>
                    <div className="price-name">Khoảng Giá</div>
                    <div className="input-price-minmax">
                      <input type="text" name="minPrice" placeholder="₫ TỪ " value={minPricee} onChange={handleInputChange} />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-pri-range">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                      <input type="text" name="maxPrice" placeholder=" ₫ ĐẾN " value={maxPricee} onChange={handleInputChange} />
                    </div>

                    <button onClick={applyPriceRange}>Áp Dụng</button>
                  </div>
                  <div className="ratingFilterBox">
                    <div className="price-name">Đánh Giá</div>
                    <div className={`ratingFilter ${selectedRating === 5 ? 'active' : ''}`} onClick={() => handleRatingFilterChange(5)}>
                      <div className="ratingstart">
                        <div className="ratingText">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="rateNull"> </div>

                      </div>
                    </div>
                    <div className={`ratingFilter ${selectedRating === 4 ? 'active' : ''}`} onClick={() => handleRatingFilterChange(4)}>
                      <div className="ratingstart">
                        <div className="ratingText">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="rateNull"> <FontAwesomeIcon icon={faStar} />
                        </div>
                        trở lên
                      </div>



                    </div>
                    <div className={`ratingFilter ${selectedRating === 3 ? 'active' : ''}`} onClick={() => handleRatingFilterChange(3)}>
                      <div className="ratingstart">
                        <div className="ratingText">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />

                        </div>
                        <div className="rateNull">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />

                        </div>
                        trở lên
                      </div>
                    </div>
                    <div className={`ratingFilter ${selectedRating === 2 ? 'active' : ''}`} onClick={() => handleRatingFilterChange(2)}>

                      <div className="ratingstart">
                        <div className="ratingText">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="rateNull">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        trở lên
                      </div>
                    </div>
                    <div className={`ratingFilter ${selectedRating === 1 ? 'active' : ''}`} onClick={() => handleRatingFilterChange(1)}>
                      <div className="ratingstart">
                        <div className="ratingText">
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="rateNull">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />

                        </div>
                        trở lên
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Col>

          <Col lg='10' md='9' className="p-0" >
            <div className="Shopping">
              <div className="product">
                <div className="productList">
                  <Container style={{ paddingRight: '7px' }}>
                    <Row style={{ padding: '0px 0px' }}>
                      {currentPageProducts?.map(item => (
                        <Col lg='3' md='7' sm='7' style={{ padding: '0', marginLeft: '11px', maxWidth: '205px' }} key={item.productId}>
                          <ProductCard item={item} onReloadData={reloadData} />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
                <div className="pagination">
                  <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <span>{currentPage}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            </div>
          </Col>



        </Row>
      </Container >
    </div>

  );
}
export default ViewProduct;