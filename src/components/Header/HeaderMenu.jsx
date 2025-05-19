// components/Menus.js
import React from "react";
import { Link } from "react-router-dom";

const HeaderMenu = ({ categories }) => {
  console.log(categories)
  return (
      <div className="header-bottom header-dark d-none d-lg-block">
          <div className="container-fluid">
              <div className="wrapper-header d-flex justify-content-center align-items-center position-relative">
                  <nav className="box-navigation text-center w-100 d-flex justify-content-center">
                      <ul className="box-nav-ul d-flex align-items-center justify-content-center"
                          style={{ backgroundColor: "#fff2ea", zIndex: "1", padding: "0 14px" }}
                      >
                          <li className="menu-item active">
                              <Link to="/" className="item-link">Home</Link>
                          </li>

                          {categories.map((category) =>  (
                            
                              <li key={category.id} className="menu-item position-relative">
                                  <Link to={`/category/${category.slug}`} className="item-link">
                                      {category.name}
                                  </Link>
                                  {category.subCategories?.length > 0 && (
                                      <div className="sub-menu submenu-default">
                                          <ul className="menu-list">
                                              {category.subCategories.map((sub, idx) => (
                                                  <li key={sub.sub_id}>
                                                      <Link to={`/subcategory/${sub.sub_slug}`} className="menu-link-text">
                                                          {sub.sub_name}
                                                      </Link>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  )}
                              </li>
                          ))}
 <li className="menu-item">
 <Link to="/new-launch" className="item-link">New Launch</Link>
 </li>

 <li className="menu-item">

                              <Link to="/cart" className="item-link">Cart</Link>
                          </li>
                          <li className="menu-item">
                              <Link to="/login" className="item-link">My Account</Link>
                          </li>
                      </ul>
                  </nav>
              </div>
          </div>
      </div>
  );
};

const MobileMenu = ({ categories }) => {
  const closeMenu = () => {
      document.getElementById("mobileMenu")?.classList.remove("show");
  };

  return (
      <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu" aria-modal="true" role="dialog">
          <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close">
              <i className="pi pi-times"></i>
          </span>

          <div className="mb-canvas-content">
              <div className="mb-body">
                  <div className="mb-content-top">
                      <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                          <li className="nav-mb-item active">
                              <Link to="/" className="mb-menu-link" onClick={closeMenu}>
                                  <span>Home</span>
                              </Link>
                          </li>

                          {categories.map((category) => (
                              <li key={category.id} className="nav-mb-item">
                                  <Link to={`/category/${category.slug}`} className="mb-menu-link" onClick={closeMenu}>
                                      <span>{category.name}</span>
                                  </Link>
                              </li>
                          ))}
                           <li className="menu-item">
 <Link to="/new-launch" className="item-link">New Launch</Link>
 </li>
 <li className="nav-mb-item">
                              <Link to="/cart" className="mb-menu-link" onClick={closeMenu}>
                                  <span>Cart</span>
                              </Link>
                          </li>
                          <li className="nav-mb-item">
                              <Link to="/login" className="mb-menu-link" onClick={closeMenu}>
                                  <span>My Account</span>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  );
};



export { MobileMenu, HeaderMenu };
