import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";
import { useParams } from "react-router-dom";

const ProductEditScreen = () => {
    // const productId = match.params.productId;
    // console.log(productId)
    const productId = useParams();
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditProductMain productId={productId.id} />
            </main>
        </>
    );
};
export default ProductEditScreen;