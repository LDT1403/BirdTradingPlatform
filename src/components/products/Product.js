import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { deleteProduct } from "../../Redux/Actions/ProductActions";
import { deleteProduct } from "../../pages/redux/Actions/ProductActions";
import numeral from "numeral";

const Product = (props) => {
    const { product } = props;
    const dispatch = useDispatch();

    const deletehandler = (productId) => {
        if (window.confirm("Are you sure??")) {
            dispatch(deleteProduct(productId));
        }
    };

    return (
        <>
            <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
                <div className="card card-product-grid shadow-sm">
                    <Link to="#" className="img-wrap">
                        <img src={product.thumbnail} alt="Product" />
                    </Link>
                    <div className="info-wrap">
                        <Link to="#" className="title text-truncate">
                            {product.productName}
                        </Link>
                        <div className="discount-price mb-2"><div className="don-vi">₫</div>{numeral(product.price).format('0,0')}</div>
                        {/* <nav className="discount-price mb-2">${product.soldPrice}</nav> */}
                        <div className="row">
                            <Link
                                to={`/product/${product.productId}/edit`}
                                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                            >
                                <i className="fas fa-pen"></i>
                            </Link>
                            <Link
                                to="#"
                                onClick={() => deletehandler(product.productId)}
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;