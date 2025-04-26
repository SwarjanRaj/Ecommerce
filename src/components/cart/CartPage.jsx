import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../../helper/ToastMessage";
import { POSTCATACART } from "../../API/cart";


const formatPrice = (price) => (price ?? 0).toFixed(2);

const CartPage = ({ cart, amount, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem, isLoggedIn }) => {
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const cartItems = cart || [];
  const [agreeTerms, setAgreeTerms] = useState(false);

  console.log(cartItems);

  let subtotal = 0;
  let discount = 0;
  let total = 0;

  if (!isLoggedIn) {
    subtotal = cartItems.reduce((acc, item) => acc + item.pricing.finalPrice * item.quantity, 0);
    discount = cartItems.reduce(
      (acc, item) => acc + (item.pricing.baseRate - item.pricing.netPrice) * item.quantity,
      0
    );
    total = subtotal + discount;
  } else if (amount) {
    subtotal = (amount.cartTotal ?? 0) + (amount.discountTotal ?? 0);
    discount = amount.discountTotal ?? 0;
    total = amount.cartTotal ?? 0;
  }

  const handleCheckboxChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleCheckoutClick = async (e) => {
    e.preventDefault();

    if (cartItems.length < 1) {
      toastRef.current?.showError("Cart is empty");
      return;
    }

    if (!agreeTerms) {
      toastRef.current?.showError("Please agree to the terms and conditions before proceeding.");
      return;
    }

    if (!isLoggedIn) {
      try {
        localStorage.setItem("postLoginRedirect", "/checkout");
        navigate("/login");
      } catch (err) {
        toastRef.current?.showError("Failed to redirect. Please try again.");
      }
    } else {
      try {
        navigate("/checkout");
      } catch (err) {
        toastRef.current?.showError("Failed to proceed to checkout.");
      }
    }
  };

  return (
    <section className="flat-spacing">
      <ToastMessage ref={toastRef} />

      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <form>
              <table className="tf-table-page-cart">
                <thead >
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
                        <a href="#" className="img-box">
                          <img src={item.image} alt="product" style={{ width: 80 }} />
                        </a>
                        <div className="cart-info">
                          <p className="cart-title link">{item.productName}</p>
                          <div className="variant-box">
                            <span>Size: {item.size}</span><br />
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
                        <span className="me-2 text-muted text-decoration-line-through" style={{ fontSize: "14px", color: "#eee" }}>
                          ₹{formatPrice(item.pricing.baseRate)}
                        </span>
                        ₹{formatPrice(item.pricing.finalPrice)} <br />
                        <span style={{ fontSize: "14px", color: "red" }}>
                          Save ₹{formatPrice(item.pricing.baseRate - item.pricing.finalPrice)}
                        </span>
                      </td>
                      <td>
                        <div className="wg-quantity mx-md-auto">
                          <span className="btn-quantity btn-decrease" onClick={() => onDecreaseQuantity(item.productId, item.size)}>
                            -
                          </span>
                          <input type="text" className="quantity-product" name="number" value={item.quantity} readOnly />
                          <span className="btn-quantity btn-increase" onClick={() => onIncreaseQuantity(item.productId, item.size, item.stockCount)}>
                            +
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        ₹{formatPrice(item.pricing.finalPrice * item.quantity)} <br />
                        <span style={{ fontSize: "14px", color: "red" }}>
                          Save ₹{formatPrice((item.pricing.baseRate * item.quantity) - (item.pricing.finalPrice * item.quantity))}
                        </span>
                      </td>
                      <td className="remove-cart">
                        <span
                          className="remove pi pi-trash"
                          style={{ color: 'red' }}
                          onClick={() => onRemoveItem(item.productId, item.size)}
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
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
                  <span style={{ color: 'red', fontWeight: 'bold' }}> <span style={{fontSize:'12px'}}>Saving :</span>   ₹{formatPrice(discount)}</span>
                </div>
                <h5 className="total-order d-flex justify-content-between">
                  <span>Total</span>
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>₹{formatPrice(total)}</span>
                </h5>
                <div className="d-flex justify-center flex-column">
                <fieldset className="check-agree pt-4 pb-3">
                  <input
                    type="checkbox"
                    id="check-agree"
                    className="tf-check-rounded"
                    checked={agreeTerms}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="check-agree">
                    I agree with the <a href="/term-of-use">terms and conditions</a>
                  </label>
                </fieldset>

                {/* Checkout Button */}
                <Link className="tf-btn btn-reset text-center mb-4" onClick={handleCheckoutClick}>
                  Proceed To Checkout
                </Link>

                <Link to="/" className="text-button text-center">
                 <h6> Or continue shopping</h6>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
