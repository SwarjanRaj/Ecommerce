import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const products = [
  {
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },
  {
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },{
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },{
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },{
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },{
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },{
    id: 1,
    name: "Vitamin B Serum",
    price: "$59.99",
    oldPrice: "$98.00",
    images: {
      main: "assets/images/beauty13.jpg",
      hover: "assets/images/beauty10.jpg",
    },
    sale: "-10%",
    colors: [
      {
        code: "#f8a5c2",
        image: "assets/images/beauty13.jpg",
      },
      {
        code: "lightblue",
        image: "assets/images/beauty10.jpg",
      },
    ],
  },
];

const HairCare = () => {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="heading-section wow fadeInUp">
              <h3 className="heading">Hair Care</h3>
              <p className="subheading text-secondary">Best Seller Products</p>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex justify-content-end">
            <div className="wow fadeInUp" data-wow-delay="0.3s">
              <Link to="/shop-default-grid" className="tf-btn btn-fill">
                <span className="text">View All</span>
                <i className="pi pi-arrow-up-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ clickable: true, el: ".sw-pagination-latest" }}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            400: { slidesPerView: 1 },
          }}
        >
          {products.map((product, index) => {
            const [selectedColor, setSelectedColor] = useState(product.colors[0]);

            const handleColorChange = (color) => {
              setSelectedColor(color);
            };

            return (
              <SwiperSlide key={product.id}>
                <div className="card-product wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                  <div className="card-product-wrapper">
                    <Link to={`/product/${product.id}`} className="product-img">
                      <img
                        className="lazyload img-product"
                        data-src={selectedColor.image}
                        src={selectedColor.image}
                        alt={product.name}
                        onError={(e) => { e.target.src = 'path/to/fallback-image.jpg'; }} // Fallback image
                      />
                      <img
                        className="lazyload img-hover"
                        data-src={product.images.hover}
                        src={product.images.hover}
                        alt={product.name}
                        onError={(e) => { e.target.src = 'path/to/fallback-image.jpg'; }} // Fallback image
                      />
                    </Link>
                    {product.sale && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">{product.sale}</span>
                      </div>
                    )}
                    <div className="list-product-btn">
                      <a href="javascript:void(0);" className="box-icon wishlist btn-icon-action">
                        <span className="pi pi-heart"></span>
                        <span className="tooltip">Wishlist</span>
                      </a>
                      <a href="#quickView" data-bs-toggle="modal" className="box-icon quickview tf-btn-loading">
                        <span className="pi pi-eye"></span>
                        <span className="tooltip">View</span>
                      </a>
                    </div>
                    <div className="list-btn-main">
                      <button className="btn-main-product">Add To Cart</button>
                    </div>
                  </div>
                  <div className="card-product-info">
                    <Link to={`/product/${product.id}`} className="title link">{product.name}</Link>
                    <span className="price">
                      {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                      {product.price}
                    </span>
                    <ul className="list-color-product">
                      {product.colors.map((color, idx) => (
                        <li
                          className={`list-color-item color-swatch ${color.code === selectedColor.code ? 'active' : ''}`}
                          key={idx}
                          onClick={() => handleColorChange(color)}
                        >
                          <span className="swatch-value" style={{ backgroundColor: color.code }}></span>
                          <img className="lazyload" data-src={color.image} src={color.image} alt="color-swatch" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="sw-pagination-latest sw-dots type-circle justify-content-center"></div>
      </div>
    </section>
  );
};

export default HairCare;