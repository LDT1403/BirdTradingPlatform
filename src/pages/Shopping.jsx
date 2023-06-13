import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import '../style/shopping.css';

export default function Shopping() {

    const [productsData, setProductsData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All Product');
    const [sortOption, setSortOption] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {
        axios.get('https://localhost:7241/api/Products/All_Product')
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
            console.log(productsData)
            const updatedFilteredProducts = productsData.filter((product) => {
                if (selectedCategory === 'All Product') {
                    return true;
                } else {
                    return product.cateName === selectedCategory;
                }
            });
            const sortedProducts = sortProducts(updatedFilteredProducts);
            setFilteredProducts(sortedProducts);
        }
    }, [productsData, selectedCategory, sortOption]);

    const sortProducts = (products) => {
        if (sortOption === 'price-low-to-high') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high-to-low') {
            return products.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating-low-to-high') {
            return products.sort((a, b) => a.rating - b.rating);
        } else {
            return products.sort((a, b) => b.rating - a.rating);
        }
    };
    const handleCategoryClick = (category) => {
        // Xử lý sự kiện khi chọn một danh mục
        setSelectedCategory(category);
        setCurrentPage(1); // Reset trang về 1 khi chọn danh mục mới
    };
    const handlePreviousPage = () => {
        // Xử lý sự kiện khi nhấn nút Previous
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        // Xử lý sự kiện khi nhấn nút Next
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const productsPerPage = 12;
    const totalProducts = filteredProducts?.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentPageProducts = filteredProducts?.slice(startIndex, endIndex);
    if (productsData === null) {
        return <div>Loading...</div>;
    }
    return (
        <Container className="mt-5">
            <Row>
                <Col lg='2' md='4'>
                    <div className="shopContainer">
                        <div className="shopCate">
                            <div className="cate">
                                <svg xmlns="http://www.w3.org/800/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="cateicon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                Categoryt
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
                        </div>
                    </div>
                </Col>

                <Col lg='10' md='10' >
                    <div className="Shopping">
                        <div className="product">
                            <div className="productList">
                                <Container>
                                    <Row>
                                        {
                                            currentPageProducts?.map(item => (
                                                <Col lg='3' md='4' key={item.productId}>
                                                    <ProductCard item={item} />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Container>
                            </div>
                            <div className="pagination">
                                {/* Xử lý sự kiện trang trước */}
                                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <span>{currentPage}</span>
                                {/* Xử lý sự kiện trang tiếp theo */}
                                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        </div>

                    </div>


                </Col>
            </Row>

        </Container>



    )
}