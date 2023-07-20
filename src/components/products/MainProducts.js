import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../../Redux/Actions/ProductActions";
import { listProducts } from "../../pages/redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const Data = useSelector((state) => state.productList.products);
    const totalPages = Math.ceil(Data.length / recordsPerPage);
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = currentPage * recordsPerPage;
    const slicedProducts = Data.slice(firstIndex, lastIndex);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { error: errorDelete, success: successDelete } = productDelete;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch, successDelete]);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Sản Phẩm</h2>
                <div>
                    <Link to="/addproduct" className="btn btn-primary">
                        Tạo Mới
                    </Link>
                </div>
            </div>

            <div className="card mb-4 shadow-sm">
                {/* <header className="card-header bg-white ">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto ">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="form-control p-2"
                            />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>All category</option>
                                <option>Electronics</option>
                                <option>Clothings</option>
                                <option>Something else</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>Latest added</option>
                                <option>Cheap first</option>
                                <option>Most viewed</option>
                            </select>
                        </div>
                    </div>
                </header> */}

                <div className="card-body">
                    {errorDelete && (
                        <Message variant="alert-danger">{errorDelete}</Message>
                    )}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row">
                            {/* Products */}
                            {slicedProducts.map((product) => (
                                <Product product={product} key={product.productId} />
                            ))}
                        </div>
                    )}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

                    {/* <nav className="float-end mt-4" aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <Link className="page-link" to="#">
                                    Previous
                                </Link>
                            </li>
                            <li className="page-item active">
                                <Link className="page-link" to="#">
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">
                                    2
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">
                                    3
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </section>
    );
};
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <Link className="page-link" to="#" onClick={() => onPageChange(currentPage - 1)}>
                        Sau
                    </Link>
                </li>
                {pageNumbers.map(pageNumber => (
                    <li className={`page-item ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber}>
                        <Link className="page-link" to="#" onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </Link>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <Link className="page-link" to="#" onClick={() => onPageChange(currentPage + 1)}>
                        Trước
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
export default MainProducts;