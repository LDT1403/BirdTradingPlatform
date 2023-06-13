import React, { useState } from 'react';
import '../../../style/Vnpay.css';

const VnPay = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.target.value);
    };

    const handleCVVChange = (e) => {
        setCVV(e.target.value);
    };

    const handlePayment = () => {
        // Send payment information to VNPay API
        // Implement your logic here
    };

    return (
        <div className="vnpay-form">
            {/* <h2>VNPay Payment Form</h2> */}
            <form>
                <div>
                    <label>Card Number:</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="form-input"
                    />
                </div>
                <div>
                    <label>Expiry Date:</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        className="form-input"
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        value={cvv}
                        onChange={handleCVVChange}
                        className="form-input"
                    />
                </div>
                <button onClick={handlePayment} className="pay-button">Pay</button>
            </form>
        </div>
    );
};

export default VnPay;