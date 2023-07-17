import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//     editProduct,
//     updateProduct,
// } from "./../../Redux/Actions/ProductActions";
// import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { PRODUCT_UPDATE_RESET } from "../../pages/redux/Constants/ProductConstants";
import { editProduct, updateProduct } from "../../pages/redux/Actions/ProductActions";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditProductMain = (props) => {
    const { productId } = props;


    const [ProductName, setProductName] = useState("");
    const [Price, setPrice] = useState("");

    const [DiscountPercent, setDiscountPercent] = useState("");
    const [Decription, setDescription] = useState("");
    const [CateId, setCateId] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [ImageFile, setImageFile] = useState([]);
    const handleFileChange = (event) => {
        // const file = event.target.files[0];
        setImageFile(event.target.files[0]);
        const newImages = [...ImageFile]; // Create a copy of the current images array
        for (let i = 0; i < event.target.files.length; i++) {
            newImages.push(event.target.files[i]);
        }

        setImageFile(newImages);
    };

    const dispatch = useDispatch();

    const productEdit = useSelector((state) => state.productEdit);
    const { loading, error, product } = productEdit;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            toast.success("Product Updated", ToastObjects);
        } else {
            if (!product || !product.productName || product.productId !== Number(productId)) {
                dispatch(editProduct(productId));
            } else {
                setProductName(product.productName);
                setPrice(product.price);
                setDiscountPercent(product.discountPercent);
                setDescription(product.decription);
                setQuantity(product.quantity);
                setCateId(product.cateId);
                // if (product.images) {
                //     const mappedImages = product.images.map((image) => ({
                //         url: image.url, // Assuming each image object has a "url" property
                //         file: null, // Set initial file value to null
                //     }));
                //     setImageFile(mappedImages);
                // }
            }
        }
    }, [dispatch, productId, product, successUpdate]);


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            updateProduct(
                productId,
                ProductName,
                Price,
                DiscountPercent,
                CateId,
                Quantity,
                Decription,
                ImageFile
            )
        );
    };


    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to products
                        </Link>
                        <h2 className="content-title">Update Product</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Publish now
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {errorUpdate && (
                                        <Message variant="alert-danger">{errorUpdate}</Message>
                                    )}
                                    {loadingUpdate && <Loading />}
                                    {loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <Message variant="alert-danger">{error}</Message>
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="product_title" className="form-label">
                                                    Product title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_title"
                                                    required
                                                    value={ProductName}
                                                    onChange={(e) => setProductName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="product_price" className="form-label">
                                                    Price
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_price"
                                                    required
                                                    value={Price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="product_price" className="form-label">
                                                    Discount
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_price"
                                                    required
                                                    value={DiscountPercent}
                                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="product_price" className="form-label">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="product_price"
                                                    required
                                                    value={Quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="product_title" className="form-label">
                                                    Category
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="product_title"
                                                    required
                                                    value={CateId}
                                                    onChange={(e) => setCateId(e.target.value)}
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="chim">Bird</option>
                                                    <option value="do-an">Food</option>
                                                    <option value="long-chim">Bird Cage</option>
                                                    <option value="phu-kien">Bird Accessories</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    rows="7"
                                                    required
                                                    value={Decription}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="mb-4">
                                                {/* <label className="form-label">Images</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Image URL"
                                            value={image}
                                            required
                                            onChange={(e) => setImage(e.target.value)}
                                        /> */}
                                                <input className="form-control mt-3" type="file" name="file" onChange={handleFileChange} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditProductMain;