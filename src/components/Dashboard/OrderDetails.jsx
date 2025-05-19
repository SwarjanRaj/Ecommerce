import React, { useState, useEffect  } from "react";
import { Link  } from "react-router-dom";
import { Button } from "primereact/button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RETURNORDER } from "../../API/order";
import { useToast } from "../../helper/ToastMessage";

const OrderDetails = ({ order }) => {
      const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState("Order-History");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [returnReason, setReturnReason] = useState("Damaged");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
console.log(selectedProduct)
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

 const handleReturnClick = (product) => {
  setSelectedProduct(product);
  setModalShow(true);
};
const handleFormSubmit = async (data) => {
  console.log("Form Data:", data);
const productString = data.product.SK;
  const parts = productString.split("#");

parts.pop();

// Join the rest back with #
const Productsplitid = parts.join("#");

console.log(Productsplitid); 
  const payload = { 
    type: data.requestType,
    orderId: order.PK,  // Assuming `order.PK` contains the order ID
    productId: Productsplitid, // Assuming `data.PK` contains the product ID
    size: data.product.size,
    quantity: data.quantity,
    questions: data.questions,
    files: data.files.files,  // Assuming this is a File object
    video: data.files.video,  // Assuming this is a File object
  };

  console.log("Form Data Submitted:", payload);

  try {
    const response = await RETURNORDER(payload);
    
    if (response) {
      showSuccess("Return request submitted successfully.");
    }
  } catch (error) {
    console.error("Error while submitting return request:", error.message);
    showError("Failed to submit return request. Please try again.");
  }
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


            <h6 className="text-2 text_black-2 fw-6 pb-2">Order Date : </h6>
            <div className="text-2 mt_4 fw-6 pb-3">
              {order.orderDate || formatDate(order.createdAt)}
            </div>
            <h6><b>Amount Paid : </b> {order.totalPriceWithDiscount}</h6>
          </div>
          <div className="item">
            <h6 className="text-2 text_black-2 fw-6 pb-2">Shipping Address : </h6>
            <p><b>Name :  </b>{order.shipping.customerName}</p>
            <p><b>Phone No :  </b>{order.shipping.phone}</p>
            <p> <b>Email id : </b>{order.shipping.email}</p>
            <div className="text-2 mt_4 fw-6">
              {order.shipping?.line1}, {order.shipping?.city},{" "}
              {order.shipping?.state}, {order.shipping?.country} -{" "}
              {order.shipping?.pincode}
            </div>
            <p>Notes: {order.notes}</p>
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
                  <div key={idx} className="order-head mb-4 row">
                    <figure className="img-product col-lg-4">
                      <img src={item.image} alt={item.productName} />
                    </figure>
                    <div className="content col-lg-4">
<div className="text-2 fw-6">
  <Link to={`/product/${item.Slug}`}>{item.productName}</Link>
</div>
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
                      <div className="mt_4">
                        <span className="fw-6">Color: </span> {item.color.colorName} 
                      </div>
                      
                    </div>
                    <div className="col-lg-2">
                       <div className="mt_4">
<Button label="Return" icon="pi pi-check" loading={loading} onClick={() => handleReturnClick(item)} />
            </div>
                    </div>
                  </div>
                ))}
                <ul className="mt-4">
                  <li className="d-flex justify-content-between text-2">
                    <span>Total Price</span>
                    <span className="fw-6">{formatCurrency(order.totalPriceWithOutDiscount)}</span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_4">
                    <span>Discount</span>
                    <span className="fw-6">
                      {formatCurrency(order.totalDiscountAmount|| 0)}
                    </span>
                  </li>
                 {order.couponDetails && (
  <li className="d-flex justify-content-between text-2 mt_4">
    <span>Discount</span>
    <span className="fw-6">
      {formatCurrency(order.couponDetails.DiscountAmount || 0)}
    </span>
  </li>
)}

                  <li className="d-flex justify-content-between text-2 mt_4">
                    <span>Final Amount Paid</span>
                    <span className="fw-6">
                      {formatCurrency(
                      order.totalPriceWithDiscount|| 0
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            )}
             {/* Bootstrap Modal for Return */}
    <ReturnReplaceModal
  show={modalShow}
  onHide={() => setModalShow(false)}
  selectedProduct={selectedProduct}
  onSubmit={handleFormSubmit}
/>


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
  function ReturnReplaceModal({ show, onHide, selectedProduct, onSubmit }) {
  const [requestType, setRequestType] = useState("Return");
  const [reason, setReason] = useState("");
  const [originalConditionConfirmed, setOriginalConditionConfirmed] = useState("");
  const [files, setFiles] = useState({ files: [], video: null });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [returnQty, setReturnQty] = useState(1);
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [removedFiles, setRemovedFiles] = useState([]);

  useEffect(() => {
    if (show && selectedProduct) {
      resetForm();
    }
  }, [show, selectedProduct]);

  const resetForm = () => {
    setRequestType("Return");
    setReason("");
    setOriginalConditionConfirmed("");
    setFiles({ files: [], video: null });
    setFormSubmitted(false);
    setReturnQty(1);
    setMessage("");
    setTermsAccepted(false);
    setErrors({});
    setRemovedFiles([]);
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 3); // Limit to 3 files
    const oversized = selected.filter((file) => file.size > 1 * 1024 * 1024); // 1MB limit for each image
    if (oversized.length > 0) {
      setErrors((prev) => ({ ...prev, media: "Each image must be under 1MB." }));
      return;
    }
    setErrors((prev) => ({ ...prev, media: null }));
    setFiles((prev) => ({ ...prev, files: selected }));
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files.files];
    const removed = newFiles.splice(index, 1)[0];
    setFiles((prev) => ({ ...prev, files: newFiles }));
    setRemovedFiles((prev) => [...prev, removed.name]);
  };

  const handleVideoChange = (e) => {
    const videoFile = e.target.files[0];
    if (videoFile && videoFile.size > 3 * 1024 * 1024) { // 3MB limit for video
      setErrors((prev) => ({ ...prev, media: "Video must be under 3MB." }));
      return;
    }
    setErrors((prev) => ({ ...prev, media: null }));
    setFiles((prev) => ({ ...prev, video: videoFile }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!reason) newErrors.reason = "Please select a reason.";
    if (!originalConditionConfirmed) newErrors.originalConditionConfirmed = "Please confirm the condition.";
    if (files.files.length === 0 && !files.video) newErrors.media = "Please attach at least one image or a video.";
    if (!termsAccepted) newErrors.termsAccepted = "Please accept the Terms and Conditions.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    if (!validateForm()) {
      setFormSubmitted(false);
      return;
    }

    const questions = [
      {
        question: "Can you share photos or videos to support your claim?",
        answer: files.files.length > 0 || files.video ? "Media files attached" : "No media provided"
      },
      {
        question: "Is the item in its original condition with all packaging and accessories?",
        answer: originalConditionConfirmed || "Not answered"
      },
      {
        question: "What is the reason for the return or replacement?",
        answer: reason
      },
      {
        question: "Message",
        answer: message || "No message provided"
      }
    ];

    const payload = {
      requestType,
      quantity: returnQty,
      questions,
      files,
      product: selectedProduct
    };

    onSubmit(payload);
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Return or Replace Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProduct && (
          <div className="row">
            <div className="col-lg-12">
              <p><b>Product:</b> {selectedProduct.productName}</p>
              <p><b>Size:</b> {selectedProduct.size}</p>
            </div>

            {/* Request Type (Return / Replace) */}
            <Form.Group className="mt-3 col-lg-6">
              <Form.Label><b>Request Type:</b></Form.Label><br />
              <Form.Check
                type="radio"
                className="d-inline-block me-3"
                label="Return"
                name="requestType"
                checked={requestType === "Return"}
                onChange={() => setRequestType("Return")}
              />
              <Form.Check
                type="radio"
                className="d-inline-block"
                label="Replace"
                name="requestType"
                checked={requestType === "Replace"}
                onChange={() => setRequestType("Replace")}
              />
            </Form.Group>

            {/* Quantity Items */}
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label><b>Quantity Items:</b></Form.Label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button
                  className="btn btn-outline-secondary"
                  size="sm"
                  disabled={returnQty <= 1}
                  onClick={() => setReturnQty(prev => Math.max(1, prev - 1))}
                >−</Button>
                <span>{returnQty}</span>
                <Button
                  className="btn btn-outline-success"
                  size="sm"
                  disabled={returnQty >= selectedProduct.quantity}
                  onClick={() =>
                    setReturnQty(prev => Math.min(selectedProduct.quantity || 1, prev + 1))
                  }
                >+</Button>
                <small className="text-muted ms-2">/ {selectedProduct.quantity}</small>
              </div>
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mt-3 col-lg-6">
              <Form.Label>1. Can you share photos?<span className="fs-8"> ( Max 1MB each)</span></Form.Label>
              <Form.Control type="file" multiple accept="image/*" onChange={handleImageChange} />
              <Form.Text className="text-muted">Upload up to 3 files</Form.Text>
              {errors.media && <div className="text-danger">{errors.media}</div>}
              <div className="mt-2">
                {files.files.length > 0 && (
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {files.files.map((img, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          width={120}
                          height={120}
                          style={{ borderRadius: 5, objectFit: 'cover' }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ position: 'absolute', top: -8, right: -8 }}
                          onClick={() => handleRemoveImage(index)}
                        >×</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            {/* Video Upload */}
            <Form.Group className="mt-3 col-lg-6">
              <Form.Label>2. Can you share video? (Max 1 video, 3MB)</Form.Label>
              <Form.Control type="file" accept="video/*" onChange={handleVideoChange} />
              <Form.Text className="text-muted">Upload 1 video only</Form.Text>
              {files.video && <div className="mt-2">Selected: {files.video.name}</div>}
                            {errors.media && <div className="text-danger">{errors.media}</div>}

            </Form.Group>

            {/* Original Condition Confirmation */}
            <Form.Group className="mt-3 col-lg-6">
              <Form.Label>3. Is the item in original condition?</Form.Label>
              <Form.Control
                as="select"
                value={originalConditionConfirmed}
                onChange={(e) => setOriginalConditionConfirmed(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
              {errors.originalConditionConfirmed && <div className="text-danger">{errors.originalConditionConfirmed}</div>}
            </Form.Group>

            {/* Reason for Return */}
            <Form.Group className="mt-3 col-lg-6">
              <Form.Label>4. Reason for Return or Replace</Form.Label>
              <Form.Control
                as="select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Damaged">Damaged</option>
                <option value="Wrong Size">Wrong Size</option>
                <option value="No Longer Needed">No Longer Needed</option>
                <option value="Other">Other</option>
              </Form.Control>
              {errors.reason && <div className="text-danger">{errors.reason}</div>}
            </Form.Group>

            {/* Message Field */}
            <Form.Group className="mt-3 col-lg-12">
              <Form.Label>5. Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{height:"unset"}}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            {/* Terms and Conditions */}
            <Form.Group className="mt-3 col-lg-12">
              <Form.Check
                type="checkbox"

                label="I accept the Terms and Conditions"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              {errors.termsAccepted && <div className="text-danger">{errors.termsAccepted}</div>}
            </Form.Group>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button className="btn btn-secondary" onClick={onHide}>Close</button>
        <button  className="btn btn-success"  onClick={handleSubmit} disabled={formSubmitted}>
          {formSubmitted ? "Submitting..." : "Submit"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

};

export default OrderDetails;
