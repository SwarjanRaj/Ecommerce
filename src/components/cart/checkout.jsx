import React, { useState } from "react";
import { useEffect } from "react";
import { getRazorpaySettings, createOrder, verifyPayment, decryptKey } from "../../API/payment";
import Discounts from "./Discount";
import { APPLYCOUPON } from "../../API/cart";
const Checkout = ({ cart, customer ,coupons }) => {
  const address = customer.addresses?.[0] || {};
  const cartItems = cart.items || [];
  const totalPrice = cart.totalPrice || 0;
  const [finalAmount, setFinalAmount] = useState(totalPrice);

const handleCouponApplied = (newAmount) => {
  setFinalAmount(newAmount); // Update the discounted price
};

  const [formData, setFormData] = useState({
    firstName: customer.first_name || "",
    lastName: customer.last_name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    country: address.country || "India",
    city: address.city || "",
    line1: address.line1 || "",
    state: address.state || "",
    pincode: address.pincode || "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log('🚀 Starting Payment Process...');

      const token = sessionStorage.getItem("token"); // Fetch token securely

      console.log('📥 Fetching Razorpay Settings...');
      const razorpaySettingRes = await getRazorpaySettings();

      if (!razorpaySettingRes.success) {
        throw new Error(razorpaySettingRes.message);
      }

      const razorpaySetting = razorpaySettingRes.data;
      if (!razorpaySetting.encrypted_key || !razorpaySetting.iv || !razorpaySetting.options) {
        throw new Error("Invalid Razorpay settings");
      }

      console.log('✅ Razorpay Settings Fetched:', razorpaySetting);

      const razorpayKey = decryptKey(razorpaySetting.encrypted_key, razorpaySetting.iv, '5d1a4553ce16144c0a62e1b1bb68b04285d5fd954f55a6a31ff5ab7ccacce7bea55273d92893b143fbaf900b3bc16a82b409264608ad19d25c76a92dd00e3595a1490e18cf50172b716cb868b22709d374046c3045cc4af4aae1eacf58e27d4ad8fd93185c773ca1bd1ba9285cfe1573d158312e635b5d3c6d1a1f164a7654c7');

      console.log('🛒 Creating Razorpay Order...');
      console.log(cart)
      const orderResponse = await createOrder(cart.SK, {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        line1: formData.line1,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
      }, formData.note || "Please deliver between 10 AM and 5 PM");

      if (!orderResponse.success) {
        throw new Error(orderResponse.message);
      }

      const { razorpayOrderId, amount, orderId } = orderResponse.data;
      if (!razorpayOrderId || !amount || !orderId) {
        throw new Error("Order creation failed or incomplete response");
      }

      console.log('✅ Razorpay Order Created:', razorpayOrderId, amount, orderId);

      const finalAmount = amount * razorpaySetting.options.amount;

      const optionsRazorpay = {
        key: razorpayKey,
        amount: finalAmount,
        currency: razorpaySetting.options.currency,
        name: razorpaySetting.options.name,
        description: razorpaySetting.options.description,
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log('💳 Payment Completed, Verifying Payment...', response);

          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderId,
          };

          try {
            const verifyRes = await verifyPayment(paymentData);

            if (verifyRes.success) {
              console.log('✅ Payment Verified Successfully:', verifyRes.data);
              alert("✅ Payment verified successfully!\nPayment ID: " + paymentData.razorpay_payment_id);
            } else {
              console.error('❌ Payment Verification Failed:', verifyRes.data);
              alert("❌ Payment verification failed.\nPlease try again.");
            }
          } catch (error) {
            console.error('🚫 Error during verification:', error);
            alert("🚫 Server error during payment verification.");
          }
        },
        prefill: {
          name: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#0D9488',
        }
      };

      const rzp = new window.Razorpay(optionsRazorpay);
      rzp.open();

    } catch (error) {
      console .error('❌ Payment process failed:', error);
      alert('Failed to start payment: ' + error.message);
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="flat-spacing tf-page-checkout">
             

              <div className="wrap">
                <h5 className="title">Shiping Address</h5>
                <form className="info-box" onSubmit={handlePayment}>
                  <div className="grid-2">
                    
                    <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleChange} required />
                  </div>
                  <div className="grid-2">
                    <input type="email" name="email" placeholder="Email Address*" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Phone Number*" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="grid-2">
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                    <input type="text" name="city" placeholder="Town/City*" value={formData.city} onChange={handleChange} required />
                  </div>
                  <textarea name="line1" placeholder="Address*" value={formData.line1} onChange={handleChange} required></textarea>
                  <div className="grid-2">
                    <input type="text" name="state" placeholder="State*" value={formData.state} onChange={handleChange} required />
                    <input type="text" name="pincode" placeholder="Postal Code*" value={formData.pincode} onChange={handleChange} required />
                  </div>
                  <textarea name="note" placeholder="Write note..." value={formData.note} onChange={handleChange}></textarea>

                  {/* <PaymentBox /> */}

                  <div className="text-center">
                    <button type="submit" className="tf-btn btn-reset"> ₹ {totalPrice} Pay</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xl-1">
            <div className="line-separation"></div>
          </div>

          <div className="col-xl-5">
            <div className="flat-spacing flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="title">Shopping Cart</h5>
                <div className="list-product">
                  {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    cartItems.map((item, index) => (
                      <div className="item-product" key={item.id || index}>
                        <a href="#" className="img-product">
                          <img src={item.image} alt="img-product" />
                        </a>
                        <div className="content-box">
                          <div className="info">
                            <a href="#" className="name-product link text-title">{item.productName}</a>
                            <div className="variant text-caption-1 text-secondary">
                              <span className="size">{item.size || ''}</span>{item.size ? '/' : ''}
                              <span className="color">{item.color?.colorName || ''}</span>
                            </div>
                          </div>
                          <div className="total-price text-button">
                            <span className="count">{item.quantity}</span>X
                            <span className="price"> ₹{item.pricing.finalPrice}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Discounts coupons={coupons} cartid={cart.SK} a={totalPrice} onCouponApplied={handleCouponApplied} />
                <div className="sec-total-price">
                  <div className="bottom">
                  <h6 className="d-flex justify-content-between pb-4">
                      <span>Sub Total</span>
                      <span className="total-price-checkout">₹{cart.totalPriceWithOutDiscount}</span>
                    </h6>
                    <p className="d-flex justify-content-between pb-4 bolder ">
                      <span>Discount</span>
                      <span className="total-price-checkout text-danger"> save  : ₹{cart.totalDiscountAmount}</span>
                    </p>

                    <p className="d-flex justify-content-between pb-4 bolder ">
                      <span>Coupon Discount</span>
                      <span className="total-price-checkout text-danger"> save  : ₹{cart.totalDiscountAmount}</span>
                    </p>
                    <h5 className="d-flex justify-content-between bg-grey p-3 ">
                      <span>Total</span>
                      <span className="total-price-checkout">₹{totalPrice}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PaymentBox = () => {
  const [selectedMethod, setSelectedMethod] = useState("delivery-method ");

  const handlePaymentChange = (e) => {
    setSelectedMethod(e.target.id);
  };

  return (
    <div className="payment-box" id="payment-box">
      <h6 className="bolder mb-2 mt-2">Select Payment Mode : </h6>
      {/* Cash on Delivery */}
      <div className="payment-item">
        <label
          htmlFor="delivery-method"
          className={`payment-header ${selectedMethod === "delivery-method" ? "" : "collapsed"}`}
          data-bs-toggle="collapse"
          data-bs-target="#delivery-payment"
        >
          <input
            type="radio"
            name="payment-method"
            className="tf-check-rounded"
            id="delivery-method"
            checked={selectedMethod === "delivery-method"}
            onChange={handlePaymentChange}
          />
          <span className="text-title">Cash on delivery</span>
        </label>
        <div
          id="delivery-payment"
          className={`collapse ${selectedMethod === "delivery-method" ? "show" : ""}`}
        >
          {/* Optional content */}
        </div>
      </div>

      {/* Apple Pay */}
      <div className="payment-item">
        <label
          htmlFor="apple-method"
          className={`payment-header ${selectedMethod === "apple-method" ? "" : "collapsed"}`}
          data-bs-toggle="collapse"
          data-bs-target="#apple-payment"
        >
          <input
            type="radio"
            name="payment-method"
            className="tf-check-rounded"
            id="apple-method"
            checked={selectedMethod === "apple-method"}
            onChange={handlePaymentChange}
          />
          <span className="text-title apple-pay-title">
            <img width="50" height="50" src="https://img.icons8.com/color/200/online-payment.png" alt="online-payment"/>
            Apple Pay
          </span>
        </label>
        <div
          id="apple-payment"
          className={`collapse ${selectedMethod === "apple-method" ? "show" : ""}`}
        >
          {/* Optional content */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
