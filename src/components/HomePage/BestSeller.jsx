import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Skeleton } from 'primereact/skeleton'; // Import Skeleton from PrimeReact

const BestSeller = ({ title, bg, slug, products = [], loading }) => {

  const [selectedImages, setSelectedImages] = useState(
    products.reduce((acc, product) => {
      acc[product.pk] = product.image1;
      return acc;
    }, {})
  );

  const handleImageChange = (pk, image) => {
    setSelectedImages((prev) => ({
      ...prev,
      [pk]: image,
    }));
  };

  return (
    <section className={`flat-spacing ${bg}`}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="heading-section wow fadeInUp">
              <h3 className="heading">{title}</h3>
              <p className="subheading text-secondary">{title} Products</p>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end p-2">
            <div className="wow fadeInUp" data-wow-delay="0.3s">
              <Link to={`/category/${slug}`} className="tf-btn btn-fill">
                <span className="text">View All</span>
                <i className="pi pi-arrow-up-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {loading || !products || products.length === 0 ? (
          <div className="swiper-loading">
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
              {Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="card-product">
                    <Skeleton width="100%" height="200px" />
                    <Skeleton width="80%" height="20px" style={{ margin: '10px 0' }} />
                    <Skeleton width="60%" height="20px" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
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
              const discount =
                product.discType === "percent" && product.discountInput
                  ? `-${product.discountInput}%`
                  : "";

              const currentImage = selectedImages[product.pk];

              return (
                <SwiperSlide key={product.pk}>
                  <div className="card-product wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                    <div className="card-product-wrapper">
                      <Link to={`/product/${product.slug}`} className="product-img">
                        <img className="lazyload img-product" src={product.image1} alt={product.name} />
                        <img className="lazyload img-hover" src={product.image2} alt={product.name} />
                      </Link>
                      {discount && (
                        <div className="on-sale-wrap">
                          <span className="on-sale-item">{discount}</span>
                        </div>
                      )}
                      <div className="list-product-btn">
                        <a href="javascript:void(0);" className="box-icon wishlist btn-icon-action">
                          <span className="pi pi-heart"></span>
                          <span className="tooltip">Wishlist</span>
                        </a>
                        <Link to={`/product/${product.slug}`} className="box-icon quickview tf-btn-loading">
                          <span className="pi pi-eye"></span>
                          <span className="tooltip">View</span>
                        </Link>
                      </div>
                      <div className="list-btn-main">
                        <button className="btn-main-product">Add To Cart</button>
                      </div>
                    </div>
                    <div className="card-product-info">
                      <Link to={`/product/${product.slug}`} className="title link">
                        {product.name}
                      </Link>
                      <span className="price">
                        {product.baseRate > product.netPrice && (
                          <span className="old-price">₹{product.baseRate}</span>
                        )}
                        ₹{product.netPrice}
                      </span>

                      {product.colors.length > 0 && (
                        <ul className="list-color-product">
                          {product.colors.map((color, idx) => (
                            <li
                              key={idx}
                              className={`list-color-item color-swatch ${currentImage === product.image1 ? "active" : ""}`}
                              onClick={() => handleImageChange(product.pk, product.image1)}
                            >
                              <span className="swatch-value" style={{ backgroundColor: color.colorCode }}></span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="sw-pagination-latest sw-dots type-circle justify-content-center"></div>
      </div>
    </section>
  );
};

export default BestSeller;
