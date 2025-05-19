import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { useToast } from "../../helper/ToastMessage";

const ReturnDetails = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState("Return-History");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="account-order-details w-100">
      <div className="wd-form-order">
        {/* Order Summary */}
        <div className="order-head">
          <figure className="img-product">
            <img
              src={order.metadataItem.Product_image}
              alt={order.metadataItem.productName}
            />
          </figure>
          <div className="content">
            <div className="badge">{order.metadataItem.status}</div>
            <h6 className="mt-8 fw-5">{order.metadataItem.PK}</h6>
          </div>
        </div>

        {/* Info Grid */}
        <div className="tf-grid-layout md-col-2 gap-15 mt-4">
          <div className="item">
            <h6 className="text-2 text_black-2 fw-6 pb-2">Order Date:</h6>
            <div className="text-2 mt_4 fw-6 pb-3">
              {formatDate(order.metadataItem.CreatedAt)}
            </div>
            <h6><b>Amount Paid:</b> {formatCurrency(order.metadataItem.finalPrice)}</h6>
          </div>
          <div className="item">
            <h6 className="text-2 text_black-2 fw-6 pb-2">Shipping Address:</h6>
            <p><b>Name:</b> {order.metadataItem.customerId}</p>
            <p><b>Phone No:</b> {order.metadataItem.phone}</p>
            <p><b>Email id:</b> <a href={`mailto:${order.metadataItem.email}`}>{order.metadataItem.email}</a></p>
            <div className="text-2 mt_4 fw-6">
              {/* Assuming shipping details are available */}
              {order.shipping?.line1}, {order.shipping?.city}, {order.shipping?.state}, {order.shipping?.country} - {order.shipping?.pincode}
            </div>
          </div>
        </div>

        {/* Return Details */}
        <div className="return-details mt-4">
          <h6>Return Details</h6>
          <p><strong>Product Name:</strong> {order.metadataItem.productName}</p>
          <p><strong>Quantity:</strong> {order.metadataItem.quantity}</p>
          <p><strong>Size:</strong> {order.metadataItem.size}</p>
          <p><strong>Color:</strong> {order.metadataItem.color.colorName}</p>
          <p><strong>Return Reason:</strong> {order.metadataItem.requestType}</p>
        </div>

        {/* Tabs */}
        <div className="widget-tabs style-3 widget-order-tab mt-5">
          <ul className="widget-menu-tab">
            {["Return-History", "Item-Details", "Pickup-Details", ].map((tab) => (
              <li
                key={tab}
                className={`item-title ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="inner">{tab}</span>
              </li>
            ))}
          </ul>

          <div className="widget-content-tab">
            {/* Order History */}
            {activeTab === "Return-History" && (
              <div className="widget-content-inner active">
                <div className="widget-timeline">
                  <ul className="timeline">
                    {(order.timelineItems || []).map((step) => (
                      <li key={step.step}>
                        <div className="timeline-box">
                          <div className="text- 2 fw-6">{step.status}</div>
                          <span>{formatDate(step.timestamp)}</span>
                          <p><strong>Note:</strong> {step.note}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Item Details */}
            {activeTab === "Item-Details" && (
              <div className="widget-content-inner active">
                {order.metadataItem && (
                  <div className="order-head mb-4 row">
                    <figure className="img-product col-lg-4">
                      <img src={order.metadataItem.Product_image} alt={order.metadataItem.productName} />
                    </figure>
                    <div className="content col-lg-4">
                      <div className="text-2 fw-6">
                        <Link to={`/product/${order.metadataItem.slug}`}>{order.metadataItem.productName}</Link>
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Price:</span> {formatCurrency(order.metadataItem.finalPrice)}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Size:</span> {order.metadataItem.size}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Qty:</span> {order.metadataItem.quantity}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Color:</span> {order.metadataItem.color.colorName}
                      </div>
                    </div>
                    
                  </div>
                )}
              </div>
            )}

            {/* Shipping */}
            {activeTab === "Pickup-Details" && (
              <div className="widget-content-inner active">
                <ul>
                  <li><strong>Name:</strong> {order.metadataItem.customerId}</li>
                  <li><strong>Phone:</strong> {order.metadataItem.phone}</li>
                  <li><strong>Email:</strong> {order.metadataItem.email}</li>
                  <li><strong>Address:</strong> {order.shipping?.line1}, {order.shipping?.city}, {order.shipping?.state}, {order.shipping?.country} - {order.shipping?.pincode}</li>
                </ul>
              </div>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnDetails;
