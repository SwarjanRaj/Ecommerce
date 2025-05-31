import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from 'primereact/skeleton';

const BestSeller = ({ title, bg, slug, products, loading }) => {
  const [selectedImages, setSelectedImages] = useState(
    (products || []).reduce((acc, product) => {
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
          {title !== "BESTSELLER" && (
            <div className="col-lg-6">
              <div className="heading-section wow fadeInUp">
                <h3 className="heading">{title}</h3>
                <p className="subheading text-secondary">{title} Products</p>
              </div>
            </div>
          )}
        </div>

        <div className="row">
          {loading ? (
            // Render 8 skeletons while loading
            [...Array(8)].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
                <div className="card-product">
                  <div className="card-product-wrapper">
                    <Skeleton width="100%" height="200px" className="mb-2" />
                    <Skeleton width="100%" height="20px" className="mb-2" />
                    <Skeleton width="80%" height="20px" />
                  </div>
                  <div className="card-product-info mt-2">
                    <Skeleton width="60%" height="20px" className="mb-2" />
                    <Skeleton width="40%" height="20px" />
                  </div>
                </div>
              </div>
            ))
          ) : products && products.length > 0 ? (
            products.map((product, index) => {
              const discount =
                product.discType === "percent" && product.discountInput
                  ? `-${product.discountInput}%`
                  : "";
              const currentImage = selectedImages[product.pk];

              return (
                <div className="col-lg-3 col-md-6 col-12 mb-4" key={product.pk}>
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
                      <Link to={`/product/${slug}`} className="title link">
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
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center p-4">No products found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
