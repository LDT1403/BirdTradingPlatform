import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ViewProduct from "../components/UI/view-product/ViewProduct";
import { SearchProduct } from "../components/UI/search-product/Search";
import '../style/shopping-page.css';
export default function Shopping() {
  const ApiLink = "https://birdtradingplatformapi.azurewebsites.net/api/Products/All_Product"
  const [search, setSearch] = useState("");
  const handleSearchQuery = (sear) => {
    setSearch(sear);
  }
 
  const placeholder = "Tìm sản phẩm trong Bird Trading";
  return (
    <div  className=" pb-4" style={{backgroundColor: 'rgb(213, 226, 231)',paddingTop: '15px'}}>
      <Container className="m-auto search-shopping">
        <Col lg='12' md='10' >
          <Row>
            <Col lg='12' >
              <div className="search-inShop">
                <div className="search-1">
                    <SearchProduct
                      handleSearchQuery={handleSearchQuery}
                      placeholder={placeholder}
                    />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Container>


      <ViewProduct
        search={search}
        api={ApiLink} />
    </div>

  )
}