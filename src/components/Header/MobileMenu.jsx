import React from "react";

const MobileMenu = () => {
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu" aria-modal="true" role="dialog">
      <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close"></span>
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <li className="nav-mb-item active">
                <a href="#" className="mb-menu-link">
                  <span>Home</span>
                </a>
              </li>
              <li className="nav-mb-item">
                <a href="#" className="mb-menu-link">
                  <span>Shop</span>
                </a>
              </li>
              <li className="nav-mb-item">
                <a href="#" className="mb-menu-link" data-bs-toggle="collapse" data-bs-target="#products-menu">
                  <span>Products</span>
                  <span className="btn-open-sub"></span>
                </a>
                <ul id="products-menu" className="collapse sub-menu">
                  <li>
                    <a href=" " className="menu-link-text">Product Default</a>
                  </li>
                  <li>
                    <a href=" " className="menu-link-text">Product Grid1</a>
                  </li>
                </ul>
              </li>
              <li className="nav-mb-item">
                <a href="#" className="mb-menu-link" data-bs-toggle="collapse" data-bs-target="#blog-menu">
                  <span>Blog</span>
                  <span className="btn-open-sub"></span>
                </a>
                <ul id="blog-menu" className="collapse sub-menu">
                  <li>
                    <a href=" " className="menu-link-text">Blog Default</a>
                  </li>
                </ul>
              </li>
              <li className="nav-mb-item">
                <a href="#" className="mb-menu-link">
                  <span>Pages</span>
                </a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
