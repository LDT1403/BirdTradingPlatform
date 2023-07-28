import React from "react";

const CancelShop = () => {
    return (
        <div className={`modal ${isVisible ? "visible" : ""}`} onClick={handleClose}>
            <div
                className="modalh-content"
                style={{ width: "600px", backgroundColor: "#fff" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Wrap the table in a div with a fixed height and scroll */}
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <div className="confirm-address-text d-flex align-items-center">
                        <div style={{ marginRight: '5px', fontSize: "30px" }}>
                            <i className="ri-error-warning-line" style={{ color: "red" }}></i>
                        </div>
                        {data.shopname}
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">No</th>
                                <th scope="col" className="text-center">Report</th>
                                <th scope="col" className="text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.reports?.map((rep, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <b>{index + 1}</b>
                                    </td>
                                    <td>{rep.detailCate}</td>
                                    <td>{rep.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                        onClick={() => deleteHandler(shopId2)}
                        className="btn btn-sm btn-outline-danger pb-2 mt-2"
                    >
                        <i className="ri-lock-line"></i>
                    </button>
                </div>

                <span className="close-modal" onClick={handleClose}>
                    &times;
                </span>
            </div>
        </div>
    )
}

export default CancelShop;