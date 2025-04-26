import React from "react";

const OrderDetails = () => {
  return (
    <div className="account-order-details w-100">
      <div className="wd-form-order">
        <div className="order-head">
          <figure className="img-product">
            <img src="images/products/womens/women-1.jpg" alt="product" />
          </figure>
          <div className="content">
            <div className="badge">In Progress</div>
            <h6 className="mt-8 fw-5">Order #17493</h6>
          </div>
        </div>
        <div className="tf-grid-layout md-col-2 gap-15">
          <div className="item">
            <div className="text-2 text_black-2">Item</div>
            <div className="text-2 mt_4 fw-6">Face</div>
          </div>
          <div className="item">
            <div className="text-2 text_black-2">Courier</div>
            <div className="text-2 mt_4 fw-6">Sun Screen</div>
          </div>
          <div className="item">
            <div className="text-2 text_black-2">Start Date</div>
            <div className="text-2 mt_4 fw-6">10/10/2025</div>
          </div>
          <div className="item">
            <div className="text-2 text_black-2">Address</div>
            <div className="text-2 mt_4 fw-6">Kukatplapply Hyd</div>
          </div>
        </div>
        <div className="widget-tabs style-3 widget-order-tab">
          <ul className="widget-menu-tab">
            <li className="item-title active"><span className="inner">Order History</span></li>
            <li className="item-title"><span className="inner">Item Details</span></li>
            <li className="item-title"><span className="inner">Courier</span></li>
            <li className="item-title"><span className="inner">Receiver</span></li>
          </ul>
          <div className="widget-content-tab">
            <div className="widget-content-inner active">
              <div className="widget-timeline">
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge success"></div>
                    <div className="timeline-box">
                      <a className="timeline-panel" href="#">
                        <div className="text-2 fw-6">Product Comformed</div>
                        
                      </a>
                      <p><strong>Estimated Delivery Date: </strong>12/07/2024</p>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge success"></div>
                    <div className="timeline-box">
                      <a className="timeline-panel" href="#">
                        <div className="text-2 fw-6">Product Packed</div>
                      </a>
                      <p><strong>Estimated Delivery Date: </strong>12/07/2024</p>      
                                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge"></div>
                    <div className="timeline-box">
                      <a className="timeline-panel" href="#">
                        <div className="text-2 fw-6">Product Shipping</div>
                      </a>
                      <p><strong>Estimated Delivery Date: </strong>12/07/2024</p>      
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge"></div>
                    <div className="timeline-box">
                    <a className="timeline-panel" href="#">
                        <div className="text-2 fw-6">Product Out Of Delivary</div>
                      </a>
                      <p><strong>Estimated Delivery Date: </strong>12/07/2024</p>    
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge"></div>
                    <div className="timeline-box">
                    <a className="timeline-panel" href="#">
                        <div className="text-2 fw-6">Product Delivary Completed</div>
                      </a>
                      <p><strong>Estimated Delivery Date: </strong>12/07/2024</p>    
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget-content-inner">
              <div className="order-head">
                <figure className="img-product">
                  <img src="images/products/womens/women-1.jpg" alt="product" />
                </figure>
                <div className="content">
                  <div className="text-2 fw-6">Ribbed modal T-shirt</div>
                  <div className="mt_4"><span className="fw-6">Price: </span>$28.95</div>
                  <div className="mt_4"><span className="fw-6">Size: </span>XL</div>
                </div>
              </div>
              <ul>
                <li className="d-flex justify-content-between text-2">
                  <span>Total Price</span>
                  <span className="fw-6">$28.95</span>
                </li>
                <li className="d-flex justify-content-between text-2 mt_4 pb_8 line-bt">
                  <span>Total Discounts</span>
                  <span className="fw-6">$10</span>
                </li>
                <li className="d-flex justify-content-between text-2 mt_8">
                  <span>Order Total</span>
                  <span className="fw-6">$18.95</span>
                </li>
              </ul>
            </div>
            <div className="widget-content-inner">
              <p>Our courier service provides fast and reliable delivery solutions tailored to meet your needs...</p>
            </div>
            <div className="widget-content-inner">
              <p className="text-2 text-success">Thank you! Your order has been received.</p>
              <ul className="mt_20">
                <li>Order Number: <span className="fw-7">#17493</span></li>
                <li>Date: <span className="fw-7">17/07/2024, 02:34pm</span></li>
                <li>Total: <span className="fw-7">$18.95</span></li>
                <li>Payment Method: <span className="fw-7">Cash on Delivery</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
