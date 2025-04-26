import {React ,useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
const TopHeader = () => {
  useEffect(() => {
    // document.querySelector(".nav-cart a").addEventListener("click", (e) => {
    //   e.preventDefault();
    //   const modal = new Modal(document.getElementById("shoppingCart"));
    //   modal.show();
    // });
  }, []);
return (
<div className="main-header">
  <div className="container">
    <div className="row wrapper-header align-items-center">
      <div className="col-lg-4 d-none d-xl-block">
        <ul className="header-list-categories d-none">

        </ul>
      </div>
      <div className="col-md-4 col-3 d-xl-none">
        <a href="#mobileMenu" className="mobile-menu" data-bs-toggle="offcanvas" aria-controls="mobileMenu">
          <i className="pi pi-align-left" ></i>
        </a>
      </div>
      <div className="col-lg-4 col-md-4 col-6 text-center">
        <Link to="/" className="logo-header">
          <img src="../../assets/images/logo.png" alt="logo" className="logo" />
        </Link>
      </div>
      <div className="col-lg-4 col-md-4 col-3">
        <div className="wrapper-header-right">

          <ul className="nav-icon d-flex justify-content-end align-items-center">

            <li className="nav-account">
              <a className="nav-icon-item">
                    <i className="pi pi-user" ></i>
              </a>
              <div className="dropdown-account dropdown-login">
                <div className="sub-top">
                  <Link to="/login" className="tf-btn btn-reset">Login</Link>
                  <p className="text-center text-secondary-2">Don’t have an account? <Link
                      to="/register">Register</Link></p>
                </div>
                
              </div>
            </li>
            <li className="nav-wishlist">
              <Link to="/whishlist" className="nav-icon-item">
              <i className="pi pi-heart" ></i>
              </Link>
            </li>
           <li className="nav-cart">
  <Link to="/cart" className="nav-icon-item">
    <i className="pi pi-cart-plus"></i>
    <span className="count-box">1</span>
  </Link>
</li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
);
};

export default TopHeader;