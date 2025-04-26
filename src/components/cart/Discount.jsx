import React, { useState, useEffect } from 'react';
import Swiper from 'swiper'; // npm install swiper
import 'swiper/swiper-bundle.css';
import { APPLYCOUPON } from '../../API/cart';

const Discounts = ({ coupons, cartid, onCouponApplied, a }) => {
  const [discounts, setDiscounts] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [selectedCouponCode, setSelectedCouponCode] = useState(null);
  const [totalPrice, setTotalPrice] = useState(a);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  useEffect(() => {
    if (coupons && coupons.length > 0) {
      setDiscounts(coupons);
      setLoading(false);
    }
  }, [coupons]);

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
    setSelectedCouponCode(null);
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCouponCode(coupon.CouponCode);
    setDiscountCode(coupon.CouponCode);
  };

  const applyDiscount = async () => {
    if (!discountCode || applying) return;
  
    const selectedCoupon = discounts.find(d => d.CouponCode === discountCode);
    if (selectedCoupon && totalPrice < selectedCoupon.MinimumAmount) {
      setMessage(`Minimum order should be ₹${selectedCoupon.MinimumAmount}`);
      setMessageType('error');
      return;
    }
  
    const payload = { couponCode: discountCode, cartId: cartid };
  
    try {
        setApplying(true);
        const response = await APPLYCOUPON(payload);
        console.log(response);
      
        if (response.success && response.data?.discountedAmount) {
          onCouponApplied(response.data.discountedAmount);
          setCouponApplied(true);
          setMessage(response.message || 'Coupon applied successfully!');
          setMessageType('success');
        } else {
          setMessage(response.message || 'Invalid coupon code.');
          setMessageType('error');
        }
      } catch (error) {
        console.error(error);
        setMessage(error.message || 'Something went wrong.');
        setMessageType('error');
      } finally {
        setApplying(false);
      }
    }      
  

  useEffect(() => {
    if (discounts.length > 0) {
      new Swiper('.tf-sw-categories', {
        slidesPerView: 2.25,
        spaceBetween: 20,
        breakpoints: {
          1024: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          480: { slidesPerView: 1.2, spaceBetween: 15 },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }, [discounts]);

  if (loading) {
    return <p>Loading discounts...</p>;
  }

  return (
    <div className="sec-discount">
      <div className="swiper tf-sw-categories">
        <div className="swiper-wrapper">
          {discounts.map((discount, index) => (
            <div key={index} className="swiper-slide">
              <div
                className={`box-discount ${selectedCouponCode === discount.CouponCode ? 'active' : ''}`}
                onClick={() => handleSelectCoupon(discount)}
              >
                <div className="discount-top">
                  <div className="discount-off">
                    <div className="text-caption-1">Discount</div>
                    <span className="sale-off text-btn-uppercase">
                      {discount.DiscountType === 'Flat'
                        ? `$${discount.DiscountValue}`
                        : `${discount.DiscountValue}%`} OFF
                    </span>
                  </div>
                  <div className="discount-from">
                    <p className="text-caption-1">
                      For orders <br /> from {discount.MinimumAmount}
                    </p>
                  </div>
                </div>
                <div className="discount-bot d-block">
                  <span className="text-btn-uppercase">{discount.CouponCode}</span>
                  <button className="tf-btn" onClick={() => handleSelectCoupon(discount)}>
                    <span className="text">Apply Code</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ip-discount-code">
  <input
    type="text"
    value={discountCode}
    onChange={handleDiscountChange}
    placeholder="Add voucher discount"
  />
  <button
    className="tf-btn"
    onClick={applyDiscount}
    disabled={couponApplied || applying}
  >
    <span className="text">
      {applying ? "Applying..." : (couponApplied ? "Applied" : "Apply Code")}
    </span>
  </button>
  
</div>{message && (
    <small style={{ color: messageType === 'success' ? 'green' : 'red' }}>
      {message}
    </small>
  )}

    </div>
  );
};

export default Discounts;
