import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import { POSTCATACART } from "../../API/cart";
import { useToast } from "../../helper/ToastMessage";

const ProductSection = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantityCount, setQuantityCount] = useState(1);
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;
  const { showSuccess, showError } = useToast();
  const handleDecrease = () => {
    setQuantityCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const handleIncrease = () => {
    console.log('v',selectedVariant)
    if (selectedVariant && quantityCount < selectedVariant.stockCount) {
      setQuantityCount((prevCount) => prevCount + 1);
    } else {
      setQuantityCount((prevCount) => prevCount + 1);

    }
  };

  // Set selected variant on product load
  useEffect(() => {
    if (product?.hasQuantityVariants && product.quantity?.length > 0) {
      setSelectedVariant(product.quantity[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  // Handle variant change
  const handleVariantChange = (size) => {
    const variant = product.quantity.find((q) => q.size === size);
    if (variant) {
      setSelectedVariant(variant);
      setQuantityCount(1);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (product?.hasQuantityVariants && !selectedVariant) return;

    const newItem = {
      productId: product.PK,
      size: product?.hasQuantityVariants ? selectedVariant?.size : product?.size,
      quantity: quantityCount,
    };
    console.log(newItem)

    if (isLoggedIn) {
      try {
        const res = await POSTCATACART([newItem]);
        showSuccess("Product Added In cart!");

        console.log("Item posted to backend cart:", res);
      } catch (err) {
        showError("Faild to add Product!");
      }
    } else {
      // Fallback to localStorage
      let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingIndex = existingCart.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size
      );

      const availablestockCount = selectedVariant?.stockCount || Infinity;

      if (existingIndex !== -1) {
        const newQuantity = existingCart[existingIndex].quantity + newItem.quantity;
        existingCart[existingIndex].quantity = Math.min(newQuantity, availablestockCount);

      } else {
        existingCart.push(newItem);
      }
      showSuccess("Product Added In cart!");


      localStorage.setItem("cart", JSON.stringify(existingCart));
      console.log("Cart saved to localStorage:", existingCart);
    }
  };
  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ProductGallery
                gallery={product.gallery}
                image1={product.image1}
                image2={product.image2}
              />
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">
                        {product?.categoryName || ""}
                      </div>
                      <h3 className="name">{product?.productTitle || ""}</h3>
                    </div>
                   
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          ₹
                          {product?.hasQuantityVariants
                            ? selectedVariant?.netPrice || ""
                            : product?.netPrice || ""}
                        </h5>
                        <div className="compare-at-price font-2">
                          ₹
                          {product?.hasQuantityVariants
                            ? selectedVariant?.baseRate || ""
                            : product?.baseRate || ""}
                        </div>
                        <div className="badges-on-sale text-btn-uppercase">
                          {product?.hasQuantityVariants
                            ? selectedVariant?.discType === "percent"
                              ? `-${selectedVariant?.discountInput}%`
                              : `₹${selectedVariant?.discountInput}`
                            : product?.discType === "percent"
                            ? `-${product?.discountInput}%`
                            : `₹${product?.discountInput}`}
                        </div>
                      </div>
                      {product?.shortDescription && product.shortDescription.trim() !== "" && (
                        <p>{product.shortDescription}</p>
                      )}
                    </div>
                  </div>

                  <div className="tf-product-info-choose-option">
                    {product?.hasColorVariants && product?.colors && (
                      <div className="variant-picker-item">
                        <div className="variant-picker-label mb_12">
                          Colors:
                          <span className="text-title variant-picker-label-value value-currentColor">
                            {product.color?.colorName?.trim()}
                          </span>
                        </div>
                        <div className="variant-picker-values">
                          {product.colors.map((clr, index) => (
                            <Link key={index} to={`/product/${clr.slug}`}>
                              <input
                                id={`values-${clr.colorName.trim().toLowerCase()}`}
                                type="radio"
                                name="color1"
                                defaultChecked={product.color?.slug === clr.slug}
                              />
                              <label
                                className="hover-tooltip tooltip-bot radius-60 color-btn"
                                htmlFor={`values-${clr.colorName.trim().toLowerCase()}`}
                                data-value={clr.colorName.trim()}
                                data-color={clr.colorCode}
                              >
                                <span
                                  className="btn-checkbox"
                                  style={{ backgroundColor: clr.colorCode }}
                                ></span>
                                <span className="tooltip">{clr.colorName.trim()}</span>
                              </label>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {product?.hasQuantityVariants && Array.isArray(product.quantity) && product.quantity.length > 0 ? (
                      <div className="variant-picker-item">
                        <div className="d-flex justify-content-between mb_12">
                          <div className="variant-picker-label">
                            Size:
                            <span className="text-title variant-picker-label-value">
                              {selectedVariant?.size}
                            </span>
                          </div>
                        </div>
                        <div className="variant-picker-values gap12">
                          {product.quantity.map((variant, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                name="size"
                                id={`values-${variant.size}`}
                                checked={selectedVariant?.size === variant.size}
                                onChange={() => handleVariantChange(variant.size)}
                              />
                              <label
                                className="style-text size-btn"
                                htmlFor={`values-${variant.size}`}
                                data-value={variant.size}
                              >
                                <span className="text-title">{variant.size.toLowerCase()}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : product?.size && (
                      <div className="variant-picker-item">
                        <div className="variant-picker-label">
                          Size:
                          <span className="text-title variant-picker-label-value">
                            {product.size}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>
                      <div className="wg-quantity">
                        <span className="btn-quantity btn-decrease" onClick={handleDecrease}>-</span>
                        <input
                          className="quantity-product"
                          type="text"
                          name="number"
                          value={quantityCount}
                          readOnly
                        />
                        <span className="btn-quantity btn-increase" onClick={handleIncrease}>+</span>
                      </div>
                    </div>

                    <div className="tf-product-info-by-btn mb_10">
                      <button
                        onClick={handleAddToCart}
                        className="btn-style-2 text-btn-uppercase fw-6 btn-add-to-cart ps-4 pe-4"
                      >
                        <span>Add to cart</span>
                      </button>

                      <a
                        href="javascript:void(0);"
                        className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                      >
                        <span className="pi pi-heart"></span>
                        <span className="tooltip text-caption-2">Wishlist</span>
                      </a>
                    </div>

                    <ul className="tf-product-info-sku">
                      <li>
                        <p className="text-caption-1">SKU:</p>
                        <h6 className="text-caption-1 text-1 bolder">{product?.SKU || ""}</h6>
                      </li>
                      <li>
                        <p className="text-caption-1">Available:</p>
                        <p className="text-caption-1 text-1 bolder">
                          {product?.hasQuantityVariants
                            ? selectedVariant?.stockCount > 0
                              ? "In stockCount"
                              : "Out of stockCount"
                            : product?.stockCount > 0
                            ? "In stockCount"
                            : "Out of stockCount"}
                        </p>
                      </li>
                      <li>
                        <p className="text-caption-1">Categories:</p>
                        <p className="text-caption-1 bolder">
                          <a className="text-1 link">{product?.categoryName || ""}</a>,{" "}
                          <a className="text-1 link">{product?.SubCategoryName || ""}</a>
                        </p>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
