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
          return product.soldPrice > minPrice && product.soldPrice <= maxPrice;
        } else if (minPrice !== "") {
          return product.soldPrice >= minPrice;
        } else if (maxPrice !== "") {
          return product.soldPrice <= maxPrice;
        } else {
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
    setSelectedRating(rating);
    setCurrentPage(1);
  };


  const handleRatingFilterChange = (rating) => {
    setSelectedRating(rating);
    handleRatingFilter(rating);
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
      if (e.target.value !== null) {
        setMinPricee(e.target.value);
      }

    } else if (e.target.name === "maxPrice") {
      setMaxPricee(e.target.value);
    }
  };
  const applyPriceRange = () => {

    setMinPrice(minPricee);
    setMaxPrice(maxPricee);
    setCurrentPage(1);


  };

  const productsPerPage = 8;
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
                      Category
                    </div>
                    <div
                      className={`allProduct ${selectedCategory === 'All Product' ? 'active' : ''}`}
                      onClick={() => handleCategoryClick('All Product')}
                    >
                      All Product
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
                      <div className="price-name">Price Range</div>
                      <div className="input-price-minmax">
                        <input type="text" name="minPrice" placeholder="$ Min " value={minPricee} onChange={handleInputChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-pri-range">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                        <input type="text" name="maxPrice" placeholder="$ Max " value={maxPricee} onChange={handleInputChange} />
                      </div>

                      <button onClick={applyPriceRange}>Apply</button>
                    </div>
                    <div className="ratingFilterBox">
                      <div className="price-name">Evaluate</div>
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
                          above
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
                          above
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
                          above
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
                          above
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
                    <Container style={{paddingRight:'7px'}}>
                      <Row style={{padding:'0px 0px'}}>
                        {currentPageProducts?.map(item => (
                          <Col lg='3' md='7' sm='7' style={{padding:'0', marginLeft:'11px', maxWidth:'205px'}}  key={item.productId}>
                            <ProductCard item={item} />
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