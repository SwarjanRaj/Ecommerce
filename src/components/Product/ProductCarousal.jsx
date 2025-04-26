import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const ProductCarousel = ({ title, subtitle, products }) => {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="heading-section wow fadeInUp">
              <h3 className="heading">{title}</h3>
              <p className="subheading text-secondary">{subtitle}</p>
            </div>
          </div>
          <div className="col-lg-6 d-lg-flex justify-content-end p-2">
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

            return (
              <SwiperSlide key={product.id}>
                <div className="card-product wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                  <div className="card-product-wrapper">
                    <Link to={`/product/${product.id}`} className="product-img">
                      <img
                        className="lazyload img-product"
                        src={selectedColor.image}
                        alt={product.name}
                      />
                      <img
                        className="lazyload img-hover"
                        src={product.images.hover}
                        alt={product.name}
                      />
                    </Link>
                    {product.sale && <div className="on-sale-wrap"><span className="on-sale-item">{product.sale}</span></div>}
                    <div className="list-product-btn">
                      <a href="#" className="box-icon wishlist btn-icon-action">
                        <span className="pi pi-heart"></span>
                      </a>
                      <a href="#quickView" data-bs-toggle="modal" className="box-icon quickview">
                        <span className="pi pi-eye"></span>
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

export default ProductCarousel;
