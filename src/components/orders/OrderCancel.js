import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../pages/redux/Actions/OrderActions";
import { useEffect } from "react";

const OrderCancel = ({ orderId, isVisible, onSuccess }) => {
    const data = [
        { resonId: 1, detail: "Sản phẩm hết hàng" },
        { resonId: 2, detail: "Hết hạn đơn hàng" },
        { resonId: 3, detail: "Lỗi kỹ thuật" },
        { resonId: 4, detail: "Lý do khác" },
    ];

    const [selectedReasonId, setSelectedReasonId] = useState(0);
    const [customReason, setCustomReason] = useState("");
    const [showCustomReasonError, setShowCustomReasonError] = useState(false);

    const handleChange = (reasonId) => {
        setSelectedReasonId(reasonId);
        setShowCustomReasonError(false);
        setCustomReason(""); // Clear custom reason when selecting a predefined reason
    };

    const handleCustomReasonChange = (event) => {
        const customReasonText = event.target.value;
        setCustomReason(customReasonText);

        if (selectedReasonId === 4) {
            // Validate custom reason when "Lý do khác" is selected
            if (customReasonText.trim().length > 0 && customReasonText.length <= 80) {
                setShowCustomReasonError(false);
            } else {
                setShowCustomReasonError(true);
            }
        }
    };

    const dispatch = useDispatch();

    const handleReport = () => {
        let selectedReasonDetail = "";

        if (selectedReasonId === 4) {
            // If "Lý do khác" is selected, use custom reason text
            selectedReasonDetail = customReason;
            if (customReason.trim().length === 0 || customReason.length > 80) {
                setShowCustomReasonError(true);
                return; // Prevent dispatching the cancelOrder action if custom reason is invalid
            }
        } else {
            // Find the selected predefined reason's detail
            const selectedItem = data.find((item) => item.resonId === selectedReasonId);
            if (selectedItem) {
                selectedReasonDetail = selectedItem.detail;
            }
        }


        const reason = {
            reasonCancle: selectedReasonDetail,
        };
        console.log(reason)
        dispatch(cancelOrder(orderId, reason));
        onSuccess();
    };

    return (
        <div className={`modal ${isVisible ? "visible" : ""}`} onClick={onSuccess}>
            <div
                className="modalh-content"
                style={{ width: "600px", backgroundColor: "#fff" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center mb-3" style={{ fontSize: "33px", fontWeight: "bold" }}>Chọn Lý Do Hủy Đơn Hàng</div>

                <div style={{ padding: "10px" }}>
                    {data.map((item) => (
                        <div
                            key={item.resonId}
                            style={{ padding: "5px 0px", display: "flex", alignItems: "center", fontSize: "18px" }}
                        >
                            <input
                                className="red-input"
                                type="radio"
                                value={item.resonId}
                                checked={selectedReasonId === item.resonId}
                                onChange={() => handleChange(item.resonId)}
                                style={{ marginRight: "30px" }}
                            />
                            {item.detail}
                        </div>
                    ))}
                </div>
                {selectedReasonId === 4 && (
                    <div className="detail-feedback">
                        <textarea
                            maxLength="80"
                            name="text"
                            placeholder="dưới 80 ký tự"
                            style={{ minHeight: "80px" }}
                            value={customReason}
                            onChange={handleCustomReasonChange}
                        ></textarea>
                        {showCustomReasonError && (
                            <label style={{ paddingLeft: "5px", color: "red" }}>
                                Vui lòng nhập dưới 80 ký tự
                            </label>
                        )}
                    </div>
                )}

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button onClick={handleReport} className="btn btn-sm btn-outline-danger pb-2 mt-2">

                        <h6 style={{ paddingTop: '5px' }}>Xác Nhận</h6>
                    </button>
                </div>

                <span className="close-modal" onClick={onSuccess}>
                    &times;
                </span>
            </div>
        </div>
    );
};

export default OrderCancel;
