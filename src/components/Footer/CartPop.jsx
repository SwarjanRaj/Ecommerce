import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

const CartPop = () => {
  useEffect(() => {
    const shoppingCartModal = document.getElementById("shoppingCart");

    if (shoppingCartModal) {
      shoppingCartModal.addEventListener("hidden.bs.modal", () => {
        // Remove modal backdrop if it remains
        document.body.removeAttribute("style");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
        
          backdrop.classList.remove("show");
          setTimeout(() => backdrop.remove(), 300); // Remove after transition
        }
      });
    }
  }, []);

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex flex-column flex-grow-1 h-100">
            <div className="header">
              <h5 className="title">Shopping Cart</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal" 
                aria-label="Close"
              ><i className="pi pi-times-circle"></i></span>
            </div>
            <div className="wrap">
             
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-scroll">
                    <div className="tf-mini-cart-items">
                      {[
                        {
                          imgSrc: "/assets/images/beauty8.jpg",
                          name: "Contrasting sheepskin",
                          price: "$60.00",
                        },
                        {
                          imgSrc: "/assets/images/beauty8.jpg",
                          name: "Suede leggings",
                          price: "$60.00",
                        },
                       
                      ].map((item, index) => (
                        <div key={index} className="tf-mini-cart-item file-delete">
                          <div className="tf-mini-cart-image">
                            <img className="lazyload" src={item.imgSrc} alt={item.name} />
                          </div>
                          <div className="tf-mini-cart-info flex-grow-1">
                            <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                              <div className="text-title">
                                <Link to="/product-detail" className="link text-line-clamp-1">
                                  {item.name}
                                </Link>
                              </div>
                              <div className="text-button tf-btn-remove remove">Remove</div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                              <div className="text-secondary-2">XL/Blue</div>
                              <div className="text-button">1 X {item.price}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="tf-mini-cart-bottom-wrap">
                        <div className="tf-cart-totals-discounts">
                          <h5>Subtotal</h5>
                          <h5 className="tf-totals-total-value">$186.99</h5>
                        </div>
                        <div className="tf-cart-checkbox">
                          <div className="tf-checkbox-wrapp">
                            <input type="checkbox" id="CartDrawer-Form_agree" name="agree_checkbox" />
                            <div>
                              <i className="icon-check"></i>
                            </div>
                          </div>
                          <label htmlFor="CartDrawer-Form_agree">
                            I agree with
                            <Link to="/term-of-use" title="Terms of Service">
                              Terms & Conditions
                            </Link>
                          </label>
                        </div>
                        <div className="tf-mini-cart-view-checkout">
                          <Link to="/shopping-cart" className="tf-btn w-100 btn-white radius-4 has-border">
                            <span className="text">View cart</span>
                          </Link>
                          <Link to="/checkout" className="tf-btn w-100 btn-fill radius-4">
                            <span className="text">Check Out</span>
                          </Link>
                        </div>
                        <div className="text-center">
                          <Link className="link text-btn-uppercase" to="/shop-default-grid">
                            Or continue shopping
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPop;
