import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Payment and order data passed via location.state
  const paymentData = location.state?.paymentData;
  const orderData = location.state?.orderData;

  if (!paymentData || !orderData) {
    // If no data, redirect to home or cart
    navigate("/cart");
    return null;
  }

  return (
    <section className="payment-success container">
      <h2>Payment Successful</h2>
      <p>Thank you for your order!</p>
      <div className="invoice">
        <h3>Invoice Details</h3>
        <p><strong>Order ID:</strong> {orderData.orderId}</p>
        <p><strong>Payment ID:</strong> {paymentData.razorpay_payment_id}</p>
        <p><strong>Amount Paid:</strong> ₹{(orderData.amount / 100).toFixed(2)}</p>
        <p><strong>Status:</strong> {paymentData.status || "Success"}</p>
        {/* Add more invoice details as needed */}
      </div>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </section>
  );
};

export default PaymentSuccess;
