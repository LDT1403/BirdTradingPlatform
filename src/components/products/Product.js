import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { deleteProduct } from "../../Redux/Actions/ProductActions";
import { deleteProduct } from "../../pages/redux/Actions/ProductActions";
import numeral from "numeral";
import { useState } from "react";


const Product = (props) => {
    const { product } = props;
    const dispatch = useDispatch();
    const [showConfirmation, setShowConfirmation] = useState(false);


    const deletehandler = (productId) => {

        dispatch(deleteProduct(productId));
        setShowConfirmation(false);

    };
    const tooglehandler = () => {
        setShowConfirmation(true);
    }

    return (
        <>
            <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
                <div className="card card-product-grid shadow-sm">
                    <Link to="#" className="img-wrap">
                        <img src={product.thumbnail} alt="Product" style={{ width: '100%' }} />
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
                                onClick={() => tooglehandler()}
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            {
                showConfirmation && (
                    <div className="delete-modal">
                        <div className="delete-modal-content">
                            <div className="text-delete">Bạn có chắc chắn xóa không?</div>
                            <div className="productName-delete"> {product.productName}</div>
                            <div className="button-delete" >
                                <button className="button-yes-delete" onClick={() => deletehandler(product.productId)}>Có</button>
                                <button onClick={() => setShowConfirmation(false)}>Không</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Product;