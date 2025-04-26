import React from "react";
import { Link } from "react-router-dom";
import SingleProductCard from "../SingleProductCard";
const categories = [
    { name: "Bags", count: 112 },
    { name: "Booking", count: 32 },
    { name: "Clothing", count: 42 },
    { name: "Women", count: 65, active: true },
    { name: "Men", count: 13 },
    { name: "Shoes", count: 52 },
    { name: "Uncategorized", count: 14 },
];

const products = [
    {
      id: 1,
      name: "Vitamin B Serum",
      price: "$59.99",
      oldPrice: "$98.00",
      images: {
        main: "../assets/images/beauty13.jpg",
        hover: "../assets/images/beauty10.jpg",
      },
      sale: "-10%",
      colors: [
        {
          code: "#f8a5c2",
          image: "../assets/images/beauty13.jpg",
        },
        {
          code: "lightblue",
          image: "../assets/images/beauty10.jpg",
        },
      ],
    }
   
    
  
  ];

const CategoryPage = () => {
    return (
        <section className="flat-spacing">
            <div className="container">

                <div className="tf-shop-control">
                    <div class="tf-shop-control">

                        <ul class="tf-control-layout">
                            <li class="tf-view-layout-switch sw-layout-list list-layout" data-value-layout="list">
                                <div class="item">
                                    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3" cy="6" r="2.5" stroke="#181818"></circle>
                                        <rect x="7.5" y="3.5" width="12" height="5" rx="2.5" stroke="#181818"></rect>
                                        <circle cx="3" cy="14" r="2.5" stroke="#181818"></circle>
                                        <rect x="7.5" y="11.5" width="12" height="5" rx="2.5" stroke="#181818"></rect>
                                    </svg>
                                </div>
                            </li>
                            <li class="tf-view-layout-switch sw-layout-2" data-value-layout="tf-col-2">
                                <div class="item">
                                    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="14" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="6" cy="14" r="2.5" stroke="#181818"></circle>
                                        <circle cx="14" cy="14" r="2.5" stroke="#181818"></circle>
                                    </svg>
                                </div>
                            </li>
                            <li class="tf-view-layout-switch sw-layout-3 active" data-value-layout="tf-col-3">
                                <div class="item">
                                    <svg class="icon" width="22" height="20" viewBox="0 0 22 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="11" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="19" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="3" cy="14" r="2.5" stroke="#181818"></circle>
                                        <circle cx="11" cy="14" r="2.5" stroke="#181818"></circle>
                                        <circle cx="19" cy="14" r="2.5" stroke="#181818"></circle>
                                    </svg>
                                </div>
                            </li>
                            <li class="tf-view-layout-switch sw-layout-4" data-value-layout="tf-col-4">
                                <div class="item">
                                    <svg class="icon" width="30" height="20" viewBox="0 0 30 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="11" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="19" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="27" cy="6" r="2.5" stroke="#181818"></circle>
                                        <circle cx="3" cy="14" r="2.5" stroke="#181818"></circle>
                                        <circle cx="11" cy="14" r="2.5" stroke="#181818"></circle>
                                        <circle cx="19" cy="14" r="2.5" stroke="#181818"></circle>
                                        <circle cx="27" cy="14" r="2.5" stroke="#181818"></circle>
                                    </svg>
                                </div>
                            </li>
                        </ul>

                    </div>
                    <ul className="tf-control-layout">
                        {/* Layout Switcher */}
                        {["list", "tf-col-2", "tf-col-3", "tf-col-4"].map((layout, index) => (
                            <li key={index} className={`tf-view-layout-switch sw-layout-${index + 1}`} data-value-layout={layout}>
                                <div className="item">
                                    {/* SVG Icons can be added here based on layout */}
                                    <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Add appropriate SVG for each layout */}
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="row">
                    <div className="col-xl-3">
                        <div className="sidebar-filter canvas-filter left">
                            <div className="canvas-wrapper">
                                <div className="canvas-header d-flex d-xl-none">
                                    <h5>Filters</h5>
                                    <span className="icon-close close-filter" aria-label="Close filter"></span>
                                </div>
                                <div className="canvas-body">
                                    <div className="widget-facet facet-categories">
                                        <h6 className="facet-title">Product Categories</h6>
                                        <ul className="facet-content">
                                            {categories.map((category, index) => (
                                                <li key={index}>
                                                    <Link to="#" className={`categories-item ${category.active ? 'active' : ''}`}>
                                                        {category.name} <span className="count-cate">({category.count})</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="canvas-bottom d-block d-xl-none">
                                    <button id="reset-filter" className="tf-btn btn-reset">Reset Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9">
                        <div className="tf-list-layout wrapper-shop" id="listLayout" style={{ display: 'none' }}>
                            {products.map((product) => (
                                <div key={product.id} className="card-product style-list" data-availability={product.availability} data-brand={product.brand}>
                                    <SingleProductCard product={product }  />
                                </div>
                            ))}
                            <ul className="wg-pagination">
                                <li><Link to="#" className="pagination-item text-button">1</Link></li>
                                <li className="active">
                                    <div className="pagination-item text-button">2</div>
                                </li>
                                <li><Link to="#" className="pagination-item text-button">3</Link></li>
                                <li><Link to="#" className="pagination-item text-button"><i className="icon-arrRight"></i></Link></li>
                            </ul>
                        </div>
                        <div className="wrapper-shop tf-grid-layout tf-col-3" id="gridLayout">
                            {products.map((product) => (
                                <div key={product.id} className="card-product grid" data-availability={product.availability} data-brand={product.brand}>
                                    <div className="card-product-wrapper">
                                        <Link to="" className="product-img">
                                            <img className="img-product ls-is-cached lazyloaded" data-src={product.imgSrc} src={product.imgSrc} alt="image-product" />
                                            <img className="img-hover ls-is-cached lazyloaded" data-src={product.imgHoverSrc} src={product.imgHoverSrc} alt="image-product" />
                                        </Link>
                                        <div className="list-product-btn">
                                            <Link to="javascript:void(0);" className="box-icon wishlist btn-icon-action" aria-label="Add to Wishlist">
                                                <span className="icon icon-heart"></span>
                                                <span className="tooltip">Wishlist</span>
                                            </Link>
                                            <Link to="#compare" data-bs-toggle="offcanvas" aria-controls="compare" className="box-icon compare btn-icon-action" aria-label="Compare">
                                                <span className="icon icon-gitDiff"></span>
                                                <span className="tooltip">Compare</span>
                                            </Link>
                                            <Link to="# quickView" data-bs-toggle="modal" className="box-icon quickview tf-btn-loading" aria-label="Quick View">
                                                <span className="icon icon-eye"></span>
                                                <span className="tooltip">Quick View</span>
                                            </Link>
                                        </div>
                                        <div className="list-btn-main">
                                            <Link to="#shoppingCart" data-bs-toggle="modal" className="btn-main-product">Add To cart</Link>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <Link to="" className="title link">{product.name}</Link>
                                        <span className="price current-price">{product.currentPrice}</span>
                                    </div>
                                </div>
                            ))}
                            <ul className="wg-pagination justify-content-center">
                                <li><Link to="#" className="pagination-item text-button">1</Link></li>
                                <li className="active">
                                    <div className="pagination-item text-button">2</div>
                                </li>
                                <li><Link to="#" className="pagination-item text-button">3</Link></li>
                                <li><Link to="#" className="pagination-item text-button"><i className="icon-arrRight"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;