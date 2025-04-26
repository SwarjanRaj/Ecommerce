import React, { useState } from "react";
import { Link } from "react-router-dom";


const SingleProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
console.log(product)
  return (
    <div className="card-product wow fadeInUp">
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
        {product.sale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.sale}</span>
          </div>
        )}
        <div className="list-product-btn">
          <button className="box-icon wishlist btn-icon-action">
            <span className="pi pi-heart"></span>
            <span className="tooltip">Wishlist</span>
          </button>
          <button className="box-icon quickview tf-btn-loading">
            <span className="pi pi-eye"></span>
            <span className="tooltip">View</span>
          </button>
        </div>
        <div className="list-btn-main">
          <button className="btn-main-product">Add To Cart</button>
        </div>
      </div>
      <div className="card-product-info">
        <Link to={`/product/${product.id}`} className="title link">
          {product.name}
        </Link>
        <span className="price">
          {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
          {product.price}
        </span>
        <ul className="list-color-product">
          {product.colors.map((color, idx) => (
            <li
              className={`list-color-item color-swatch ${
                color.code === selectedColor.code ? "active" : ""
              }`}
              key={idx}
              onClick={() => setSelectedColor(color)}
            >
              <span className="swatch-value" style={{ backgroundColor: color.code }}></span>
              <img className="lazyload" src={color.image} alt="color-swatch" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleProductCard;
