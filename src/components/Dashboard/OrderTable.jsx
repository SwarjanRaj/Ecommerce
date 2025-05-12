import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderTable = ({ orders, loading }) => {
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoadMore = () => {
    setVisibleOrdersCount((prevCount) => prevCount + 10);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setVisibleOrdersCount(10); // reset visible count when filtering
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const formatCurrencyINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  const formatOrderDate = (dateString) => {
    const parts = dateString.split(",")[0].split("/");
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return formattedDate.toLocaleDateString("en-IN", options);
  };

  const getStatusBadge = (status) => {
    let badgeColor = "gray";
    switch (status.toLowerCase()) {
      case "order placed":
        badgeColor = "green";
        break;
      case "order confirmed":
        badgeColor = "blue";
        break;
      case "on hold":
        badgeColor = "orange";
        break;
      case "cancelled":
        badgeColor = "red";
        break;
      default:
        badgeColor = "gray";
    }
    return (
      <span
        style={{
          backgroundColor: badgeColor,
          color: "white",
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  };

  if (loading) return <p>Loading orders...</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  // Filter orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery); // Search by orderId or customerName
    return matchesStatus && matchesSearch;
  });

  const ordersToDisplay = filteredOrders.slice(0, visibleOrdersCount);
  const hasMoreOrdersToLoad = filteredOrders.length > visibleOrdersCount;

  return (
    <div className="account-orders">
      {/* Filter Dropdown */}
      <div className="d-flex gap-10 mb-3">
        <div className="mb-3 text-end">
          <select
            className="form-select w-auto d-inline form-control"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All Statuses</option>
            <option value="order placed">Order Placed</option>
            <option value="order confirmed">Order Confirmed</option>
            <option value="on hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="mb-3 text-end">
          <input
            type="text"
            className="form-control w-auto d-inline"
            placeholder="Search by Order ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Order Table */}
      <div className="wrap-account-order">
        <table className="">
          <thead>
            <tr>
              <th className="fw-6">Order ID</th>
              <th className="fw-6">Order Date</th>
              <th className="fw-6">Order Status</th>
              <th className="fw-6">Order Amount</th>
              <th className="fw-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersToDisplay.map((orderItem, index) => (
              <tr className="tf-order-item" key={index}>
                <td>{orderItem.orderId}</td>
                <td>{formatOrderDate(orderItem.orderDate)}</td>
                <td>{getStatusBadge(orderItem.status)}</td>
                <td>{formatCurrencyINR(orderItem.totalPrice)}</td>
                <td>
                  <Link
                    to={`/dashboard/orders/${encodeURIComponent(orderItem.orderId)}`}
                    className="tf-btn btn-sm btn-fill radius-4"
                  >
                    <span className="text">View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMoreOrdersToLoad && (
        <div className="text-center mt-3">
          <button className="tf-btn btn-fill radius-4" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
