import React from "react";
import { Container, Col, Row } from "reactstrap";
import categoryImg1 from '../../../assets/images/Food.png';
import categoryImg2 from '../../../assets/images/Chim.png';
import categoryImg3 from '../../../assets/images/longchim.png';
import categoryImg4 from '../../../assets/images/PhuKien.jpg';
import '../../../style/category.css';

const categoryData = [
    {
        display: 'Chim',
        imgUrl: categoryImg2
    },
    {
        display: 'Đồ Ăn',
        imgUrl: categoryImg1
    },
    {
        display: 'Lồng Chim',
        imgUrl: categoryImg3
    },
    {
        display: 'Phụ Kiện Chim',
        imgUrl: categoryImg4
    },


]

const Category = () => {
    return (
        <Container>
            <Row>
                {
                    categoryData.map((item, index) => (
                        <Col lg='4' md='4'>
                            <div className="category__item">
                                <div className="category__img d-flex align-item-center justify-content-center gap-1">
                                    <img src={item.imgUrl} alt="category__item" />
                                    <div className="tit">{item.display}</div>

                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Category;