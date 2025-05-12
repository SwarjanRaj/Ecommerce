import React, { useState, useEffect  } from "react";
import Discounts from "./Discount";
import { getRazorpaySettings, createOrder, verifyPayment, decryptKey } from "../../API/payment";

const formatPrice = (price) => (price ?? 0).toFixed(2);

const Checkout = ({ cart, customer, coupons }) => {
  const address = customer.addresses?.[0] || {};
  const cartItems = cart.items || [];
  const totalPriceWithOutDiscount = cart.totalPriceWithOutDiscount || 0;
  const totalDiscountAmount = cart.totalDiscountAmount || 0;
  const totalPriceWithDeliveryFee = cart.totalPriceWithDeliveryFee || 0;
  const totalPriceWithDiscount = cart.totalPriceWithDiscount || 0;

  const isApplicable = cart.isApplicable || false;
  const deliveryFee = !cart.isApplicable ? 0 : cart.deliveryFee;
  const [finalAmount, setFinalAmount] = useState(totalPriceWithDeliveryFee);
  const [couponcode , setCouponcode] = useState("");
  const [couponData, setCouponData] = useState({
    couponDiscount: 0,
    deliveryFee: !isApplicable ? 0 : deliveryFee,
    totalDiscountAmount: totalDiscountAmount,
    totalPriceWithDiscount: totalPriceWithDiscount,
    totalPriceWithOutDiscount: totalPriceWithOutDiscount,
    isApplicable: isApplicable,
  });

  const handleCouponApplied = (data, code) => {
    if (data) {
      setFinalAmount(data.totalPriceWithDiscount);
      setCouponcode(code)
      setCouponData(data);
    } else {
      resetCouponData();
    }
  };

  const handleCouponDeleted = () => {
    resetCouponData();
  };

  const resetCouponData = () => {
    setFinalAmount(totalPriceWithDeliveryFee);
    setCouponData({
      couponDiscount: 0,
      deliveryFee: cart.deliveryFee,
      totalDiscountAmount: cart.totalDiscountAmount,
      totalPriceWithOutDiscount: cart.totalPriceWithOutDiscount,
      isApplicable: cart.isApplicable,
    });
  };
  console.log("cart", cart);
  console.log('cou', couponData)
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
    e.preventDefault();
    try {
      console.log('🚀 Starting Payment Process...');

      const token = sessionStorage.getItem("token");

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

      const razorpayKey = decryptKey(
        razorpaySetting.encrypted_key,
        razorpaySetting.iv,
        '5d1a4553ce16144c0a62e1b1bb68b04285d5fd954f55a6a31ff5ab7ccacce7bea55273d92893b143fbaf900b3bc16a82b409264608ad19d25c76a92dd00e3595a1490e18cf50172b716cb868b22709d374046c3045cc4af4aae1eacf58e27d4ad8fd93185c773ca1bd1ba9285cfe1573d158312e635b5d3c6d1a1f164a7654c7'
      );

      console.log('🛒 Creating Razorpay Order...');
      const orderResponse = await createOrder(cart.SK, {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        line1: formData.line1,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
      }, formData.note || "Please deliver between 10 AM and 5 PM" , couponcode );

      if (!orderResponse.success) {
        throw new Error(orderResponse.message);
      }

      const { razorpayOrderId, amount, orderId } = orderResponse.data;
      if (!razorpayOrderId || !amount || !orderId) {
        throw new Error("Order creation failed or incomplete response");
      }

      console.log('✅ Razorpay Order Created:', razorpayOrderId, amount, orderId);

      const finalPaymentAmount = amount * razorpaySetting.options.amount;

      const optionsRazorpay = {
        key: razorpayKey,
        amount: finalPaymentAmount,
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
      console.error('❌ Payment process failed:', error);
      alert('Failed to start payment: ' + error.message);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          {/* Checkout Form */}
          <div className="col-xl-6">
            <div className="flat-spacing tf-page-checkout f-product-media-wrap sticky-top">
              <div className="wrap">
                <h5 className="title">Shipping Address</h5>
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

                  <div className="text-center">
                    <button type="submit" className="tf-btn btn-reset"> ₹ {finalAmount} Order</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="col-xl-1">
            <div className="line-separation"></div>
          </div>

          {/* Cart Sidebar */}
          <div className="col-xl-5">
            <div className="flat-spacing flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="title">Shopping Cart</h5>
                <div className="list-product">
                {cartItems.length === 0 ? (
  <p>Your cart is empty.</p>
) : (
  cartItems.map((item) => (
    <div className="item-product" key={item.PK}>
      <a href="#" className="img-product">
        <img src={item.image} alt="img-product" style={{ width: 80 }} />
      </a>
      <div className="content-box">
        <div className="info">
          <a href="#" className="name-product link text-title">{item.productName}</a>
          <div className="variant text-caption-1 text-secondary">
            <span className="size">{item.size || ''}</span>{item.size ? '/' : ''}
            <span className="color">{item.color?.colorName || ''}</span>
            <br></br>
            <span
              style={{
                backgroundColor: item.color?.colorCode,
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            ></span>
          </div>
        </div>
        <div className="total-price text-button">
          <span className="count">{item.quantity}</span> X
          <span className="price">
            ₹{formatPrice(item.pricing.finalPrice)}
          </span>
        </div>
        {item.pricing.baseRate !== item.pricing.finalPrice && (
          <div className="save-amount">
            <span style={{ fontSize: "14px", color: "red" }}>
              Save ₹{formatPrice((item.pricing.baseRate - item.pricing.finalPrice)* item.quantity)}
            </span>
          </div>
        )}
        <div className="remove-cart d-none">
          <span
            className="remove pi pi-trash"
            style={{ color: 'red' }}
            onClick={() => onRemoveItem(item.productId, item.size)}
          ></span>
        </div>
      </div>
    </div>
  ))
)}

                </div>

                {/* Discount Section */}
                <Discounts
        coupons={coupons}
        cartid={cart.SK}
        onCouponApplied={handleCouponApplied}
        onCouponDeleted={handleCouponDeleted}
        a={totalPriceWithOutDiscount}
      />
                {/* Price Summary */}
                <div className="sec-total-price">
                  <div className="bottom">
                    <h6 className="d-flex justify-content-between pb-4">
                      <span>Sub Total</span>
                      <span className="total-price-checkout">
  ₹{formatPrice(totalPriceWithOutDiscount)}
</span>
                    </h6>
                    <p className="d-flex justify-content-between pb-4 bolder">
                      <span>Discount</span>
                      <span className="total-price-checkout text-danger">save: ₹{cart.totalDiscountAmount}</span>
                    </p>
                    <p className="d-flex justify-content-between pb-4 bolder">
                      <span>Coupon Discount</span>
                      <span className="total-price-checkout text-danger">save:₹{couponData?.couponDiscount ?? 0} </span>
                    </p>
                    <p className="d-flex justify-content-between pb-4 bolder">
  <span>Delivery Fee  <small style={{fontSize:"10px"}}>(Order Above 799 for free Delivery)</small></span> 
  <span className="total-price-checkout">
    {deliveryFee === 0 ? (
      <>
        <span className="text-muted text-decoration-line-through">₹40</span>{" "}
        <span className="text-success fw-bold">Free</span>
      </>
    ) : (
      `₹${formatPrice(deliveryFee)}`
    )}
  </span>
</p>
                    <h5 className="d-flex justify-content-between" style={{
    background: '#d7d7d7',
    padding: '10px 20px',
    borderRadius: '10px',
    color: 'black',
    fontWeight: 'bold'
  }}>
                      <span>Total</span>
                      <span className="total-price-checkout">₹{formatPrice(finalAmount)}</span>
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

export default Checkout;
