import React from "react";
import { useParams } from "react-router-dom";

const ShopDetail = () => {
    const productId = useParams();
    console.log(productId);
    return (
        <div>
            ShopDetail
        </div>
    )
}

export default ShopDetail;