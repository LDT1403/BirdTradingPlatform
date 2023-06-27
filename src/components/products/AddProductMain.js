import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
// import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createProduct } from "../../pages/redux/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../pages/redux/Constants/ProductConstants";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const AddProductMain = () => {
    const [ProductName, setProductName] = useState("");
    const [Price, setPrice] = useState("");
    // const [image, setImage] = useState("");
    const [DiscountPercent, setDiscountPercent] = useState("");
    const [Decription, setDescription] = useState("");
    const [CateId, setCateId] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [ImageFile, setImageFile] = useState([]);
    const handleFileChange = (event) => {
        // const file = event.target.files[0];
        // setImageFile(event.target.files[0]);
        // const files = event.target.files;
        // const selectedImagesArray = Array.from(files);
        // setImageFile(selectedImagesArray);
        // console.log(ImageFile)
        const newImages = [...ImageFile]; // Create a copy of the current images array
        for (let i = 0; i < event.target.files.length; i++) {
            newImages.push(event.target.files[i]);
        }

        setImageFile(newImages);
    };
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, product } = productCreate;

    useEffect(() => {
        if (product) {
            toast.success("Product Added", ToastObjects);
            dispatch({ type: PRODUCT_CREATE_RESET });
            // setproductName("");
            // setDescription("");
            // setCountInStock(0);
            // setImage("");
            // setPrice(0);
        }
    }, [product, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();


        dispatch(createProduct(ProductName, Price, DiscountPercent, CateId, Quantity, Decription, ImageFile));

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
                        <h2 className="content-title">Add product</h2>
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
                                    {error && <Message variant="alert-danger">{error}</Message>}
                                    {loading && <Loading />}
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
                                            // required
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
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_title"
                                            required
                                            value={CateId}
                                            onChange={(e) => setCateId(e.target.value)}
                                        />
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
                                        <input className="form-control mt-3" type="file" multiple name="file" onChange={handleFileChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProductMain;