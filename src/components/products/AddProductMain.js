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
    const [DiscountPercent, setDiscountPercent] = useState("");
    const [Decription, setDescription] = useState("");
    const [CateId, setCateId] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [ImageFile, setImageFile] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    console.log(formErrors.Price)

    const handleFileChange = (event) => {
        const newImages = [...ImageFile];
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
            resetForm();
        }
    }, [product, dispatch]);

    const validateForm = () => {
        const errors = {};

        if (!ProductName) {
            errors.ProductName = "Tên Sản Phẩm không được bỏ trống.";
        }

        if (!Price) {
            errors.Price = "Giá Tiền không được bỏ trống.";
        }

        if (!DiscountPercent) {
            errors.DiscountPercent = "Giảm Giá không được bỏ trống.";
        }

        if (!CateId) {
            errors.CateId = "Phân Loại không được bỏ trống.";
        }

        if (!Quantity) {
            errors.Quantity = "Số Lượng không được bỏ trống.";
        }

        if (isNaN(parseFloat(Price)) || parseFloat(Price) <= 0) {
            errors.Price = "Giá Tiền phải là một số dương.";
        }

        if (isNaN(parseFloat(DiscountPercent)) || parseFloat(DiscountPercent) < 0 || parseFloat(DiscountPercent) > 100) {
            errors.DiscountPercent = "Giảm Giá phải là một số từ 0 đến 100.";
        }

        if (isNaN(parseInt(Quantity)) || parseInt(Quantity) <= 0) {
            errors.Quantity = "Số Lượng phải là một số nguyên dương.";
        }

        // const nameRegex = /^[a-zA-Z\s]+$/;
        // if (!nameRegex.test(ProductName)) {
        //     errors.ProductName = "Tên Sản Phẩm chỉ được chứa chữ cái và khoảng trắng.";
        // }

        // const descriptionRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
        // if (!descriptionRegex.test(Decription)) {
        //     errors.Decription = "Chi Tiết chứa ký tự không hợp lệ.";
        // }

        return errors;

    };


    const resetForm = () => {
        setProductName("");
        setPrice("");
        setDiscountPercent("");
        setDescription("");
        setCateId("");
        setQuantity("");
        setImageFile([]);
        setFormErrors({});
    };

    const submitHandler = (e) => {

        e.preventDefault();

        const errors = validateForm();
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            dispatch(createProduct(ProductName, Price, DiscountPercent, CateId, Quantity, Decription, ImageFile));
        } else {
            setFormErrors(errors);
        }
    };
    const handleDeleteImage = (index) => {
        const updatedImages = [...ImageFile];
        updatedImages.splice(index, 1);
        setImageFile(updatedImages);
    };

    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Quay Về
                        </Link>
                        <h2 className="content-title">Thêm Sản Phẩm</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Thêm Sản Phẩm
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
                                            Tên Sản Phẩm
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập ở đây ..."
                                            className="form-control"
                                            id="product_title"
                                            required
                                            value={ProductName}
                                            onChange={(e) => setProductName(e.target.value)}
                                        />
                                        {formErrors.ProductName && <div className="text-danger">{formErrors.ProductName}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Giá Tiền
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập ở đây ..."
                                            className="form-control"
                                            id="product_price"
                                            required
                                            value={Price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        {formErrors.Price && <div className="text-danger" >{formErrors.Price}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Giảm Giá
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập ở đây ..."
                                            className="form-control"
                                            id="product_price"
                                            // required
                                            value={DiscountPercent}
                                            onChange={(e) => setDiscountPercent(e.target.value)}
                                        />
                                        {formErrors.DiscountPercent && <div className="text-danger">{formErrors.DiscountPercent}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Số Lượng
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập ở đây ..."
                                            className="form-control"
                                            id="product_price"
                                            required
                                            value={Quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        {formErrors.Quantity && <div className="text-danger">{formErrors.Quantity}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_title" className="form-label">
                                            Phân Loại
                                        </label>
                                        <select
                                            className="form-control"
                                            id="product_title"
                                            required
                                            value={CateId}
                                            onChange={(e) => setCateId(e.target.value)}
                                        >
                                            <option value="">Chọn Loại</option>
                                            <option value="chim">Chim</option>
                                            <option value="do-an">Đồ Ăn</option>
                                            <option value="long-chim">Lồng Chim</option>
                                            <option value="phu-kien">Phụ Kiện Chim</option>
                                        </select>
                                        {formErrors.CateId && <div className="text-danger">{formErrors.CateId}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Chi Tiết</label>
                                        <textarea
                                            placeholder="Nhập ở đây ..."
                                            className="form-control"
                                            rows="7"
                                            required
                                            value={Decription}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                        {formErrors.Decription && <div className="text-danger">{formErrors.Decription}</div>}
                                    </div>
                                    <div className="mb-4" >
                                        <label className="form-label">Thêm Ảnh</label>
                                        {/* <label className="form-label">Images</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Image URL"
                                            value={image}
                                            required
                                            onChange={(e) => setImage(e.target.value)}
                                        /> */}
                                        {/* <input className="form-control mt-3" type="file" multiple name="file" onChange={handleFileChange} /> */}




                                        <div className="addImage-feedback" style={{ borderRadius: "5px" }}>

                                            {ImageFile.map((img, index) =>
                                                <div key={index} className="image-container-feedback">
                                                    <img src={URL.createObjectURL(img)} alt="" style={{ width: "80px", height: "80px", margin: "5px" }} />
                                                    <button className="delete-button-imgFeedback" onClick={() => handleDeleteImage(index)}>X</button>
                                                </div>
                                            )}
                                            {
                                                ImageFile.length < 6 && (
                                                    <label class="custom-file-upload" style={{ width: "80px", height: "80px", margin: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <input type="file" multiple onChange={handleFileChange} style={{ display: "none" }} />
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-addImage-feedback">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                    </label>
                                                )
                                            }

                                        </div>
                                        {formErrors.ImageFile && <div className="text-danger">{formErrors.ImageFile}</div>}
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