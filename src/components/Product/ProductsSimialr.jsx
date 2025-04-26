import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { CATEGORYIDPRODUCTS } from "../../API/category";

const ProductsSimialr = ({ categoryId, bg = "bg-light", title = "Similar", slug = "" }) => {
  console.log(categoryId)
  const [products, setProducts] = useState([]);

  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    const loadProduct = async () => {
      const res = await CATEGORYIDPRODUCTS(categoryId);
      console.log(res, "nn");
      setProducts(res);

      // Set default selected image for each product
      const defaultImages = res.reduce((acc, product) => {
        acc[product.pk] = product.image1;
        return acc;
      }, {});
      setSelectedImages(defaultImages);
    };

    if (categoryId) loadProduct();
  }, [categoryId]);

  if (!products || products.length === 0) {
    return <div className="text-center p-4"></div>;
  }

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
          <div className="col-lg-6">
            <div className="heading-section wow fadeInUp">
              <h3 className="heading">{title}</h3>
              <p className="subheading text-secondary">{title} Products</p>
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
                      <img className="lazyload img-product" src={currentImage} alt={product.name} />
                      <img className="lazyload img-hover" src={product.image2} alt={product.name} />
                    </Link>
                    {discount && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">{discount}</span>
                      </div>
                    )}
                    <div className="list-product-btn">
                      <a href="#" className="box-icon wishlist btn-icon-action">
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
                            className={`list-color-item color-swatch ${
                              currentImage === product.image1 ? "active" : ""
                            }`}
                            onClick={() => handleImageChange(product.pk, product.image1)}
                          >
                            <span
                              className="swatch-value"
                              style={{ backgroundColor: color.colorCode }}
                            ></span>
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
        <div className="sw-pagination-latest sw-dots type-circle justify-content-center"></div>
      </div>
    </section>
  );
};

export default ProductsSimialr;
