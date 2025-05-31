import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <section className="payment-failure container">
      <h2>Payment Failed</h2>
      <p>Unfortunately, your payment could not be processed.</p>
      <p>Please try again or go back to your cart to review your order.</p>
      <button onClick={() => navigate("/cart")}>Go to Cart</button>
      <button onClick={() => navigate("/checkout")}>Try Again</button>
    </section>
  );
};

export default PaymentFailure;
