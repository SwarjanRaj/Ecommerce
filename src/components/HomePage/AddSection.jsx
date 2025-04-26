import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you want to use React Router for navigation

const AddSection = () => {
  return (
    <section 
      className="flat-banner-parallax-v2" 
      style={{ backgroundImage: "url('assets/images/banner-cosmetic.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="fl-content">
              <div className="title-top">
                <span className="subtitle text-btn-uppercase text-secondary-2 wow fadeInUp" data-wow-delay="0s">
                  Skin care
                </span>
                <h3 className="title wow fadeInUp" data-wow-delay="0.1s">
                  Must-Have Beauty Products for Glowing Skin
                </h3>
                <p className="body-text-1 wow fadeInUp" data-wow-delay="0.2s">
                  How to Choose the Perfect Skincare Routine for Your Skin Type
                </p>
              </div>
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <Link to="/shop-default-grid" className="tf-btn btn-fill">
                  <span className="text">Buy at a discount - $69.99</span>
                  <i className="icon icon-arrowUpRight"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddSection;