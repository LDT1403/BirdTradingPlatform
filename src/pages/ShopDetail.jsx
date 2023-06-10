import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
const ShopDetail = () => {
    const id = 3;
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7067/api/Products/Detail_Product?id=${id}`)
            .then(res => {
                setProductsData(res.data);
                
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    console.log(productsData)
    return (
        <div>
            
        </div>
    )
}

export default ShopDetail;