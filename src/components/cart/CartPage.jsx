import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../helper/ToastMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { APPLYCOUPON, GetCoupons } from "../../API/cart";
import Preloader from "../../helper/pre";
const formatPrice = (price) => (price ?? 0).toFixed(2);
const noop = () => {};

const CartPage = ({
  cart,
  cartId,
  amount,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  isLoggedIn,
  onCouponApplied = noop,
}) => {
  const navigate = useNavigate();
  const cartItems = cart || [];
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const { showSuccess, showError } = useToast();
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isApplicable, setIsApplicable] = useState(true);

  // Helper function to update cart totals dynamically for cases 1-4
  const updateCartTotals = () => {
    let tempSubtotal = 0;
    let tempDiscount = 0;
    let tempTotal = 0;
    let localsubtotal = 0;
    let localdes = 0;

    if (!isLoggedIn) {
      tempSubtotal = cartItems.reduce(
        (acc, item) => acc + item.pricing.baseRate * item.quantity,
        0
      );
      localsubtotal = tempSubtotal;
      tempDiscount = cartItems.reduce(
        (acc, item) =>
          acc +
          (item.pricing.baseRate - item.pricing.finalPrice) * item.quantity,
        0
      );
      localdes = tempDiscount;
      tempTotal = cartItems.reduce(
        (acc, item) => acc + item.pricing.finalPrice * item.quantity,
        0
      );
    } else if (amount) {
      tempSubtotal = (amount?.cartTotal ?? 0) + (amount?.discountTotal ?? 0);
      tempDiscount = amount?.discountTotal ?? 0;
      tempTotal = amount?.cartTotal ?? 0;
    }

    if (couponApplied && couponData) {
      if (!isLoggedIn) {
        tempSubtotal = localsubtotal;
        tempDiscount = localdes;
        tempTotal = couponData.totalPriceWithDiscount ?? tempTotal;
        setIsApplicable(
          couponData.isApplicable !== undefined ? couponData.isApplicable : true
        );
      } else {
        tempTotal = couponData.totalPriceWithDiscount ?? tempTotal;
        tempDiscount = couponData.totalDiscountAmount ?? tempDiscount;
        setIsApplicable(
          couponData.isApplicable !== undefined ? couponData.isApplicable : true
        );
        tempSubtotal = couponData.totalPriceWithOutDiscount ?? tempSubtotal;
      }
    } else {
      setIsApplicable(true);
    }

    // Delivery Fee Logic
    const tempDeliveryFee =
      isApplicable === false ? 0 : tempTotal >= 799 ? 0 : 40;

    setSubtotal(tempSubtotal);
    setDiscount(tempDiscount);
    setTotal(tempTotal);
    setDeliveryFee(tempDeliveryFee);
  };

  useEffect(() => {
    updateCartTotals();
  }, [cartItems, amount, couponApplied, couponData, isLoggedIn, isApplicable]);

  const handleCheckoutClick = async (e) => {
    e.preventDefault();
    if (cartItems.length < 1) {
      showError("Cart is empty");
      return;
    }
    if (!isLoggedIn) {
      try {
        localStorage.setItem("postLoginRedirect", "/cart");
        showError("Please Login");
        navigate("/login");
      } catch (err) {
        showError("Failed to redirect. Please try again.");
      }
    } else {
      try {
        navigate("/checkout");
      } catch (err) {
        showError("Failed to proceed to checkout.");
      }
    }
  };

  const handleIncrease = async (productId, size, stockCount) => {
    if (stockCount <= 0) {
      showError("No more stock available");
      return;
    }

    onIncreaseQuantity(productId, size, stockCount);

    // After quantity changes, recalculate totals dynamically
    updateCartTotals();

    // Also try re-applying coupon if any
    const discountCode = localStorage.getItem("discountCode");
    if (discountCode) {
      try {
        const payload = isLoggedIn
          ? { couponCode: discountCode, cartId, companyName: "Astrashwa" }
          : { couponCode: discountCode, amount, companyName: "Astrashwa" };

        const response = await APPLYCOUPON(payload);
        if (response?.success && response.data) {
          const couponResponseData = {
            couponDiscount: response.data.couponDiscount,
            deliveryFee: response.data.deliveryFee,
            isApplicable: response.data.isApplicable,
            totalDiscountAmount: response.data.totalDiscountAmount,
            totalPriceWithDiscount: response.data.totalPriceWithDiscount,
            totalPriceWithOutDiscount: response.data.totalPriceWithOutDiscount,
            couponCode: discountCode,
          };
          setCouponApplied(true);
          setCouponData(couponResponseData);
          onCouponApplied?.(couponResponseData);
          setIsApplicable(
            couponResponseData.isApplicable !== undefined
              ? couponResponseData.isApplicable
              : true
          );
        } else {
          setCouponApplied(false);
          setCouponData(null);
          onCouponApplied?.({
            couponDiscount: 0,
            deliveryFee: 0,
            isApplicable: true,
            totalDiscountAmount: 0,
            totalPriceWithDiscount: amount,
            totalPriceWithOutDiscount: amount,
          });
          setIsApplicable(true);
        }
      } catch (error) {
        setCouponApplied(false);
        setCouponData(null);
        onCouponApplied?.({
          couponDiscount: 0,
          deliveryFee: 0,
          isApplicable: true,
          totalDiscountAmount: 0,
          totalPriceWithDiscount: amount,
          totalPriceWithOutDiscount: amount,
        });
        setIsApplicable(true);
      }
    }
  };

  const handleDecrease = (productId, size) => {
    onDecreaseQuantity(productId, size);

    // Update totals and coupon state after decreasing quantity
    updateCartTotals();

    // Re-apply coupon logic if needed
    if (couponApplied && couponData) {
      const discountCode = localStorage.getItem("discountCode");
      if (discountCode) {
        try {
          // We do not await here to prevent UI blocking, consider improving with debouncing
          const payload = isLoggedIn
            ? { couponCode: discountCode, cartId, companyName: "Astrashwa" }
            : { couponCode: discountCode, amount, companyName: "Astrashwa" };
          APPLYCOUPON(payload).then((response) => {
            if (response?.success && response.data) {
              const couponResponseData = {
                couponDiscount: response.data.couponDiscount,
                deliveryFee: response.data.deliveryFee,
                isApplicable: response.data.isApplicable,
                totalDiscountAmount: response.data.totalDiscountAmount,
                totalPriceWithDiscount: response.data.totalPriceWithDiscount,
                totalPriceWithOutDiscount:
                  response.data.totalPriceWithOutDiscount,
                couponCode: discountCode,
              };
              setCouponApplied(true);
              setCouponData(couponResponseData);
              onCouponApplied?.(couponResponseData);
              setIsApplicable(
                couponResponseData.isApplicable !== undefined
                  ? couponResponseData.isApplicable
                  : true
              );
            } else {
              setCouponApplied(false);
              setCouponData(null);
              onCouponApplied?.({
                couponDiscount: 0,
                deliveryFee: 0,
                isApplicable: true,
                totalDiscountAmount: 0,
                totalPriceWithDiscount: amount,
                totalPriceWithOutDiscount: amount,
              });
              setIsApplicable(true);
            }
          });
        } catch (error) {
          setCouponApplied(false);
          setCouponData(null);
          onCouponApplied?.({
            couponDiscount: 0,
            deliveryFee: 0,
            isApplicable: true,
            totalDiscountAmount: 0,
            totalPriceWithDiscount: amount,
            totalPriceWithOutDiscount: amount,
          });
          setIsApplicable(true);
        }
      }
    }
  };

  const handleCouponApplied = (coupon) => {
    setCouponApplied(coupon?.couponDiscount > 0);
    setCouponData(coupon);
    onCouponApplied?.(coupon);
  };

  return (
    <>
  {cartItems.length === 0 ? (
  <section className="flat-spacing text-center d-flex justify-content-center">
    <div>
      
    <h4> <b>Your cart is empty. </b></h4>
     <a href="/" className="tf-btn btn-fill mt-3">
      Browse Products
    </a>
      <Preloader />
   
    </div>
  </section>
) : (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <form>
              <table className="tf-table-page-cart">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.PK} className="tf-cart-item file-delete">
                      <td className="tf-cart-item_product">
                        <a href="#" className="img-box" onClick={(e)=>e.preventDefault()}>
                          <img
                            src={item.image}
                            alt="product"
                            style={{ width: 80 }}
                          />
                        </a>
                        <div className="cart-info">
                          <p className="cart-title link">{item.productName}</p>
                          <div className="variant-box">
                            <span>Size: {item.size}</span>
                            <br />
                            <span>Color: {item.color?.colorName}</span>
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
                      </td>
                      <td className="text-center">
                        {item.pricing.baseRate !== item.pricing.finalPrice && (
                          <span
                            className="me-2 text-muted text-decoration-line-through"
                            style={{ fontSize: "14px", color: "#eee" }}
                          >
                            ₹{formatPrice(item.pricing.baseRate)}
                          </span>
                        )}
                        ₹{formatPrice(item.pricing.finalPrice)} <br />
                        {item.pricing.baseRate !== item.pricing.finalPrice && (
                          <span style={{ fontSize: "14px", color: "red" }}>
                            Save ₹
                            {formatPrice(
                              item.pricing.baseRate - item.pricing.finalPrice
                            )}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="wg-quantity mx-md-auto">
                          <span
                            className="btn-quantity btn-decrease"
                            onClick={() =>
                              handleDecrease(item.productId, item.size)
                            }
                          >
                            -
                          </span>
                          <input
                            type="text"
                            className="quantity-product"
                            name="number"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn-quantity btn-increase"
                            onClick={() =>
                              handleIncrease(
                                item.productId,
                                item.size,
                                item.stockCount
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        {item.pricing.baseRate !== item.pricing.finalPrice && (
                          <span
                            className="me-2 text-muted text-decoration-line-through"
                            style={{ fontSize: "14px", color: "#eee" }}
                          >
                            ₹{formatPrice(item.pricing.baseRate * item.quantity)}
                          </span>
                        )}
                        ₹{formatPrice(item.pricing.finalPrice * item.quantity)}{" "}
                        <br />
                        {item.pricing.baseRate * item.quantity >
                          item.pricing.finalPrice * item.quantity && (
                          <span style={{ fontSize: "14px", color: "red" }}>
                            Save ₹
                            {formatPrice(
                              item.pricing.baseRate * item.quantity -
                                item.pricing.finalPrice * item.quantity
                            )}
                          </span>
                        )}
                      </td>
                      <td className="remove-cart">
                        <span
                          className="remove pi pi-trash"
                          style={{ color: "red" }}
                          onClick={() =>
                            onRemoveItem(item.productId, item.size)
                          }
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
            <Coupons
              amount={total}
              onCouponApplied={handleCouponApplied}
              cartId={cartId}
              isLoggedIn={isLoggedIn}
            />
          </div>

          <div className="col-xl-4">
            <div className="fl-sidebar-cart">
              <div className="box-order bg-surface">
                <h5 className="title">Order Summary</h5>

                <div className="subtotal d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{formatPrice(subtotal)}</span>
                </div>

                <div className="discount d-flex justify-content-between">
                  <span>Discount</span>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    <span style={{ fontSize: "12px" }}>Saving :</span> ₹
                    {formatPrice(discount)}
                  </span>
                </div>

                {/* Delivery Fee Section */}
                <div className="discount d-flex justify-content-between">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <>
                        <span className="text-muted text-decoration-line-through">
                          ₹40
                        </span>{" "}
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Free
                        </span>
                      </>
                    ) : (
                      `₹${formatPrice(deliveryFee)}`
                    )}
                  </span>
                </div>

                {/* Coupon Discount Section */}
                {couponApplied && couponData && (
                  <div className="discount d-flex justify-content-between">
                    <span>Coupon Discount</span>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      <span style={{ fontSize: "12px" }}>Saving :</span> ₹
                      {formatPrice(couponData.couponDiscount)}
                    </span>
                  </div>
                )}

                {/* Grand Total */}
                <h5 className="total-order d-flex justify-content-between">
                  <span>Total</span>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {couponApplied && couponData
                      ? `₹${formatPrice(total)}`
                      : `₹${formatPrice(total)}`}
                  </span>
                </h5>

                {/* Buttons */}
                <div className="d-flex justify-center flex-column">
                  <Link
                    className="tf-btn btn-reset text-center mb-4"
                    onClick={handleCheckoutClick}
                  >
                    Proceed To Checkout
                  </Link>
                  <Link to="/" className="text-button text-center">
                    <h6>Or continue shopping</h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
                    )}

                    </>
  );
};

const Coupons = ({ amount, onCouponApplied = noop, cartId, isLoggedIn }) => {
  const [coupons, setCoupons] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedCouponCode, setSelectedCouponCode] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await GetCoupons();
        if (response && Array.isArray(response)) {
          setCoupons(response);
          setMessage("");
          setMessageType("");
        } else {
          setMessage(response?.message || "No coupons available.");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setMessage("Failed to load coupons.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value.toUpperCase());
    setSelectedCouponCode(null);
    setCouponApplied(false);
    setMessage("");
    setMessageType("");
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCouponCode(coupon.CouponCode);
    setDiscountCode(coupon.CouponCode);
    setMessage("");
    setMessageType("");
  };

  const applyDiscount = async () => {
    if (!discountCode) {
      setMessage("Please enter or select a coupon code.");
      setMessageType("error");
      return;
    }
    const payload = isLoggedIn
      ? { couponCode: discountCode, cartId, companyName: "Astrashwa" }
      : { couponCode: discountCode, amount, companyName: "Astrashwa" };
    try {
      setApplying(true);
      const response = await APPLYCOUPON(payload);
      if (response?.success && response.data) {
        const couponResponseData = {
          couponDiscount: response.data.couponDiscount,
          deliveryFee: response.data.deliveryFee,
          isApplicable: response.data.isApplicable,
          totalDiscountAmount: response.data.totalDiscountAmount,
          totalPriceWithDiscount: response.data.totalPriceWithDiscount,
          totalPriceWithOutDiscount: response.data.totalPriceWithOutDiscount,
          couponCode: discountCode,
        };
        onCouponApplied?.(couponResponseData);
        setCouponApplied(true);
        setMessage(response?.message);
        setMessageType("success");
        localStorage.setItem("discountCode", discountCode);
      } else {
        setMessage(response?.message);
        setMessageType("error");
        setCouponApplied(false);
        onCouponApplied?.({
          couponDiscount: 0,
          deliveryFee: 0,
          isApplicable: true,
          totalDiscountAmount: 0,
          totalPriceWithDiscount: amount,
          totalPriceWithOutDiscount: amount,
        });
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Something went wrong.");
      setMessageType("error");
      setCouponApplied(false);
      onCouponApplied?.({
        couponDiscount: 0,
        deliveryFee: 0,
        isApplicable: true,
        totalDiscountAmount: 0,
        totalPriceWithDiscount: amount,
        totalPriceWithOutDiscount: amount,
      });
    } finally {
      setApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setDiscountCode("");
    setSelectedCouponCode(null);
    setMessage("Coupon removed.");
    setMessageType("success");
    onCouponApplied?.({
      couponDiscount: 0,
      deliveryFee: 0,
      isApplicable: true,
      totalDiscountAmount: 0,
      totalPriceWithDiscount: amount,
      totalPriceWithOutDiscount: amount,
    });
    localStorage.removeItem("discountCode");
  };

  if (loading) return <p>Loading discounts...</p>;

  return (
    <div className="sec-discount">
      {coupons.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            1200: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1.2 },
          }}
        >
          {coupons.map((discount, index) => (
            <SwiperSlide key={index}>
              <div
                className={`box-discount ${
                  selectedCouponCode === discount.CouponCode ? "active" : ""
                }`}
                onClick={() => handleSelectCoupon(discount)}
              >
                <div className="discount-top">
                  <div className="discount-off">
                    <div className="text-caption-1">Discount</div>
                    <span className="sale-off text-btn-uppercase">
                      {discount.DiscountType === "Flat"
                        ? `₹${discount.DiscountValue}`
                        : `${discount.DiscountValue}%`}{" "}
                      OFF
                    </span>
                  </div>
                  <div className="discount-from">
                    <p className="text-caption-1">
                      {discount.Description ||
                        `Cart Value Above ₹${discount.MinimumAmount || 0}`}
                    </p>
                  </div>
                </div>
                <div className="discount-bot">
                  <span className="text-btn-uppercase">
                    {discount.CouponCode}
                  </span>
                  <button
                    className="tf-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCoupon(discount);
                      applyDiscount();
                    }}
                    disabled={applying}
                  >
                    <span className="text">Apply</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No coupons available.</p>
      )}

      <div className="ip-discount-code mt-3">
        <input
          type="text"
          value={discountCode}
          onChange={handleDiscountChange}
          placeholder="Add voucher discount"
          disabled={applying}
        />
        <button
          className="tf-btn"
          onClick={couponApplied ? handleRemoveCoupon : applyDiscount}
          disabled={applying}
        >
          <span className="text">
            {applying
              ? "Applying..."
              : couponApplied
              ? "Remove Coupon"
              : "Apply Code"}
          </span>
        </button>
      </div>

      {message && (
        <small style={{ color: messageType === "success" ? "green" : "red" }}>
          {message}
        </small>
      )}
    </div>
  );
};

export default CartPage;

