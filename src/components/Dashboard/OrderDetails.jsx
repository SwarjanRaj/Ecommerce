import React, { useState } from "react";

const OrderDetails = ({ order }) => {
  const [activeTab, setActiveTab] = useState("Order-History");

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

  const getTimelineStepClass = (step) => {
    const maxStep = Math.max(...(order.timeline || []).map((t) => t.step));
    return step <= maxStep ? "success" : "";
  };

  return (
    <div className="account-order-details w-100">
      <div className="wd-form-order">
        {/* Order Summary */}
        <div className="order-head">
          <figure className="img-product">
            <img
              src={order.products?.[0]?.image}
              alt={order.products?.[0]?.productName}
            />
          </figure>
          <div className="content">
            <div className="badge">{order.status}</div>
            <h6 className="mt-8 fw-5">{order.orderId}</h6>
          </div>
        </div>

        {/* Info Grid */}
        <div className="tf-grid-layout md-col-2 gap-15 mt-4">
          {/* <div className="item">
            <div className="text-2 text_black-2">Customer</div>
            <div className="text-2 mt_4 fw-6">{order.customerName || "N/A"}</div>
          </div>
          <div className="item">
            <div className="text-2 text_black-2">Payment Method</div>
            <div className="text-2 mt_4 fw-6">
              {order.paymentDone ? "Online" : "Cash on Delivery"}
            </div>
          </div> */}
          <div className="item">
            <div className="text-2 text_black-2">Order Date</div>
            <div className="text-2 mt_4 fw-6">
              {order.orderDate || formatDate(order.createdAt)}
            </div>
          </div>
          <div className="item">
            <div className="text-2 text_black-2">Shipping Address</div>
            <div className="text-2 mt_4 fw-6">
              {order.shipping?.line1}, {order.shipping?.city},{" "}
              {order.shipping?.state}, {order.shipping?.country} -{" "}
              {order.shipping?.pincode}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="widget-tabs style-3 widget-order-tab mt-5">
          <ul className="widget-menu-tab">
            {["Order-History", "Item-Details", "Shipping", "Coupon"].map((tab) => (
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
            {activeTab === "Order-History" && (
              <div className="widget-content-inner active">
                <div className="widget-timeline">
                  <ul className="timeline">
                    {(order.timeline || []).map((step) => (
                      <li key={step.step}>
                        <div className={`timeline-badge ${getTimelineStepClass(step.step)}`}></div>
                        <div className="timeline-box">
                          <a className="timeline-panel" href="javascript:void(0);">
                            <div className="text-2 fw-6">{step.status}</div>
                            <span>{formatDate(step.timestamp)}</span>
                          </a>
                          <p>
                            <strong>Note:</strong> {step.note}
                          </p>
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
                {order.products?.map((item, idx) => (
                  <div key={idx} className="order-head mb-4">
                    <figure className="img-product">
                      <img src={item.image} alt={item.productName} />
                    </figure>
                    <div className="content">
                      <div className="text-2 fw-6">{item.productName}</div>
                      <div className="mt_4">
                        <span className="fw-6">Price: </span>
                        {formatCurrency(item.price)}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Size: </span> {item.size}
                      </div>
                      <div className="mt_4">
                        <span className="fw-6">Qty: </span> {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
                <ul className="mt-4">
                  <li className="d-flex justify-content-between text-2">
                    <span>Total Price</span>
                    <span className="fw-6">{formatCurrency(order.totalPrice)}</span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_4">
                    <span>Discount</span>
                    <span className="fw-6">
                      {formatCurrency(order.couponDetails?.DiscountAmount || 0)}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_4">
                    <span>Final Total</span>
                    <span className="fw-6">
                      {formatCurrency(
                        order.totalPrice - (order.couponDetails?.DiscountAmount || 0)
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* Shipping */}
            {activeTab === "Shipping" && (
              <div className="widget-content-inner active">
                <ul>
                  <li>
                    <strong>Name:</strong> {order.shipping?.customerName}
                  </li>
                  <li>
                    <strong>Phone:</strong> {order.shipping?.phone}
                  </li>
                  <li>
                    <strong>Email:</strong> {order.shipping?.email}
                  </li>
                  <li>
                    <strong>Address:</strong>{" "}
                    {order.shipping?.line1}, {order.shipping?.city},{" "}
                    {order.shipping?.state}, {order.shipping?.country} -{" "}
                    {order.shipping?.pincode}
                  </li>
                </ul>
              </div>
            )}

            {/* Coupon */}
            {activeTab === "Coupon" && (
              <div className="widget-content-inner active">
                {order.couponDetails ? (
                  <ul>
                    <li>
                      <strong>Coupon Code:</strong>{" "}
                      {order.couponDetails.CouponCode || "N/A"}
                    </li>
                    <li>
                      <strong>Discount Type:</strong>{" "}
                      {order.couponDetails.DiscountType || "N/A"}
                    </li>
                    <li>
                      <strong>Discount Amount:</strong>{" "}
                      {formatCurrency(order.couponDetails.DiscountAmount || 0)}
                    </li>
                  </ul>
                ) : (
                  <p>No coupon applied.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
