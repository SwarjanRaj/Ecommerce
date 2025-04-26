import { useState } from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';

import { FaStar, FaHeart, FaShoppingCart, FaShareAlt, FaClock, FaShippingFast } from "react-icons/fa";
const colors = [
    { id: "values-beige", value: "Beige", className: "bg-color-beige1", price: 79.99 },
    { id: "values-gray", value: "Gray", className: "bg-color-gray", price: 79.99 },
    { id: "values-grey", value: "Grey", className: "bg-color-grey", price: 89.99 },
  ];
  const sizes = [
    { id: "50ml", value: "50ml", price: 79.99, disabled: false },
    { id: "100ml", value: "100ml", price: 79.99, disabled: false },
    { id: "150ml", value: "150ml", price: 89.99, disabled: false },
    { id: "200ml", value: "200ml", price: 89.99, disabled: false },
    { id: "250ml", value: "250ml", price: 89.99, disabled: false }, 
  ];
  const ProductQuantity = ({ basePrice = 79.99 }) => {
    const [quantity, setQuantity] = useState(1);
    const totalPrice = (quantity * basePrice).toFixed(2); 
  
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  
    return (
      <div>
        {/* Quantity Picker */}
        <div className="tf-product-info-quantity">
          <div className="title mb_12">Quantity:</div>
          <div className="wg-quantity">
            <span className="btn-quantity btn-decrease" onClick={handleDecrease}>
              -
            </span>
            <input
              className="quantity-product"
              type="text"
              name="number"
              value={quantity}
              readOnly
            />
            <span className="btn-quantity btn-increase" onClick={handleIncrease}>
              +
            </span>
          </div>
        </div>
  
        {/* Cart and Actions */}
        <div>
          <div className="tf-product-info-by-btn mb_10 mt-4">
            <a
              href="#shoppingCart"
              data-bs-toggle="modal"
              className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
            >
              <span>Add to cart </span>
              
            </a>
           
            <a
              href="javascript:void(0);"
              className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
            >
              <span className="icon icon-heart"></span>
              <span className="pi pi-heart"></span>
            </a>
          </div>
          <a href="#" className="btn-style-3 text-btn-uppercase">
            Buy it now
          </a>
        </div>
      </div>
    );
  };
  
  const SizePicker = () => {
    const [selectedSize, setSelectedSize] = useState("L");
  
    const handleSizeChange = (event) => {
      setSelectedSize(event.target.getAttribute("data-value"));
    };
  
    return (
      <div className="variant-picker-item">
        <div className="d-flex justify-content-between mb_12">
          <div className="variant-picker-label">
            Size: <span className="text-title variant-picker-label-value">{selectedSize}</span>
          </div>
          
        </div>
        <div className="variant-picker-values gap12">
          {sizes.map((size) => (
            <div key={size.id}>
              <input
                type="radio"
                name="size"
                id={size.id}
                data-value={size.value}
                data-price={size.price}
                onChange={handleSizeChange}
                defaultChecked={size.value === "L"} // Default selected size
                disabled={size.disabled} // Disable XXL
              />
              <label className={`style-text size-btn ${size.disabled ? "type-disable" : ""}`} htmlFor={size.id}>
                <span className="text-title">{size.value}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
const ProductVariantPicker = () => {
    const [selectedColor, setSelectedColor] = useState("Gray");
  
    const handleColorChange = (event) => {
      setSelectedColor(event.target.getAttribute("data-value"));
    };
  
    return (
      <div className="variant-picker-item">
        <div className="variant-picker-label mb_12">
          Colors: <span className="text-title variant-picker-label-value value-currentColor">{selectedColor}</span>
        </div>
        <div className="variant-picker-values">
          {colors.map((color, index) => (
            <div key={color.id}>
              <input
                id={color.id}
                type="radio"
                name="color1"
                data-value={color.value}
                onChange={handleColorChange}
                defaultChecked={color.value === "Gray"} // Default selection
              />
              <label className="hover-tooltip tooltip-bot radius-60 color-btn" htmlFor={color.id} data-value={color.value}>
                <span className={`btn-checkbox ${color.className}`}></span>
                <span className="tooltip">{color.value}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  
export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("Gray");
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(79.99);

  return (
    <div className="tf-product-info-wrap position-relative">
      <div class="tf-zoom-main"></div>
      <div class="tf-product-info-list other-image-zoom">
      <div className="tf-product-info-heading">
          <div className="tf-product-info-name">
            <div className="text text-btn-uppercase">Clothing</div>
            <h3 className="name">Stretch Strap Top</h3>

          </div>
          <div className="tf-product-info-desc">
            <div className="tf-product-info-price">
              <h5 className="price-on-sale font-2">₹79.99</h5>
              <div className="compare-at-price font-2">₹98.99</div>
              <div className="badges-on-sale text-btn-uppercase">
                -25%
              </div>
            </div>
            <p>The garments labelled as Committed are products that have been produced using sustainable fibres or processes, reducing their environmental impact.</p>

          </div>
        </div>
        <div className="tf-product-info-choose-option">
        <ProductVariantPicker />
        

        <SizePicker />
        </div>
        <ProductQuantity  />
      </div>
       

        

        
    </div>
  );
}
