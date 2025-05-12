import React, { useState, useEffect } from "react";
import Swiper from "swiper"; // npm install swiper
import "swiper/swiper-bundle.css";
import { APPLYCOUPON } from "../../API/cart";
import classNames from "classnames";

const MESSAGE_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};

const Discounts = ({ coupons = [], cartid, onCouponApplied, onCouponDeleted, a }) => {
  const [discounts, setDiscounts] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [selectedCouponCode, setSelectedCouponCode] = useState(null);
  const [totalPrice, setTotalPrice] = useState(a);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (coupons.length > 0) {
      setDiscounts(coupons);
      setLoading(false);
    }
  }, [coupons]);

  useEffect(() => {
    const storedDiscountCode = localStorage.getItem('discountCode');
    if (storedDiscountCode) {
      setDiscountCode(storedDiscountCode);
      applyDiscount(storedDiscountCode);
    }
  }, []);

  useEffect(() => {
    if (discounts.length > 0) {
      new Swiper(".tf-sw-categories", {
        slidesPerView: 2.25,
        spaceBetween: 20,
        breakpoints: {
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2.5 },
          480: { slidesPerView: 1.2 },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  }, [discounts]);

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
    setSelectedCouponCode(null);
    setMessage('');
    setMessageType('');
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCouponCode(coupon.CouponCode);
    setDiscountCode(coupon.CouponCode);
    setMessage('');
    setMessageType('');
  };

  const applyDiscount = async (code) => {
    if (!code || applying) return;

    const selectedCoupon = discounts.find(d => d.CouponCode === code);
    if (selectedCoupon && totalPrice < selectedCoupon.MinimumAmount) {
      setMessage(`Minimum order should be ₹${selectedCoupon.MinimumAmount}`);
      setMessageType(MESSAGE_TYPES.ERROR);
      return;
    }

    try {
      setApplying(true);
      const response = await APPLYCOUPON({ couponCode: code, cartId: cartid, companyName: "Astrashwa" });

      if (response.success) {
        const couponData = response.data;
        onCouponApplied(couponData);
        setCouponApplied(true);
        setMessage(response.message || 'Coupon applied successfully!');
        setMessageType(MESSAGE_TYPES.SUCCESS);
        localStorage.setItem('discountCode', code);
      } else {
        setMessage(response.message || 'Invalid coupon code.');
        setMessageType(MESSAGE_TYPES.ERROR);
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
      setMessageType(MESSAGE_TYPES.ERROR);
    } finally {
      setApplying(false);
    }
  };

  const removeCoupon = () => {
    onCouponDeleted();
    setCouponApplied(false);
    setDiscountCode('');
    setSelectedCouponCode(null);
    setMessage('Coupon removed.');
    setMessageType(MESSAGE_TYPES.SUCCESS);
    localStorage.removeItem('discountCode');
  };

  if (loading) return <p>Loading discounts...</p>;

  return (
    <div className="sec-discount">
      <div className="swiper tf-sw-categories">
        <div className="swiper-wrapper">
          {discounts.map((discount, index) => (
            <div key={index} className="swiper-slide">
              <div
                className={classNames('box-discount', {
                  active: selectedCouponCode === discount.CouponCode,
                })}
                onClick={() => handleSelectCoupon(discount)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleSelectCoupon(discount)}
              >
                <div className="discount-top">
                  <div className="discount-off">
                    <span className="text-caption-1 pe-2">Discount</span>
                    <span className="sale-off text-btn-uppercase bold text-danger">
                      {discount.DiscountType === 'Flat'
                        ? `₹${discount.DiscountValue}`
                        : `${discount.DiscountValue}%`} OFF
                    </span>
                  </div>
                </div>
                <div className="discount-bot d-block">
                  <span className="text-btn-uppercase">{discount.CouponCode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ip-discount-code" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          value={discountCode}
          onChange={handleDiscountChange}
          placeholder="Add voucher discount"
          aria-label="Discount code input"
          disabled={couponApplied}
          style={{ flex: 1 }}
        />
        {!couponApplied ? (
          <button className="tf-btn" onClick={() => applyDiscount(discountCode)} disabled={applying}>
            <span className="text">{applying ? "Applying..." : "Apply Code"}</span>
          </button>
        ) : (
          <button className="tf-btn tf-btn-remove" onClick={removeCoupon}>
            <span className="text">Remove</span>
          </button>
        )}
      </div>

      {message && (
        <small style={{ color: messageType === MESSAGE_TYPES.SUCCESS ? 'green' : 'red' }}>
          {message}
        </small>
      )}
    </div>
  );
};

export default Discounts;
