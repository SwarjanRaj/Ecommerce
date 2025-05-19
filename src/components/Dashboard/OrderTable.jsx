import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderTable = ({ orders, loading }) => {
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoadMore = () => {
    setVisibleOrdersCount((prev) => prev + 10);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setVisibleOrdersCount(10);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const formatCurrencyINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatOrderDate = (dateString) => {
    const parts = dateString.split(",")[0].split("/");
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    let colorClass = "secondary";
    switch (status.toLowerCase()) {
      case "order placed":
        colorClass = "success";
        break;
      case "order confirmed":
        colorClass = "primary";
        break;
      case "on hold":
        colorClass = "warning";
        break;
      case "cancelled":
        colorClass = "danger";
        break;
      default:
        colorClass = "secondary";
    }

    return (
      <span className={`badge bg-${colorClass} text-capitalize`}>
        {status}
      </span>
    );
  };

  if (loading) return <p>Loading orders...</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const ordersToDisplay = filteredOrders.slice(0, visibleOrdersCount);
  const hasMoreOrdersToLoad = filteredOrders.length > visibleOrdersCount;

  return (
    <div className="container-fluid">
      {/* Filter + Search Row */}
      <div className="row mb-3 g-2">
        <div className="col-md-auto ">
          <select
            className="form-select from-control"
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
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Order ID or Customer"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light" style={{backgroundColor:"#fff2ea"}}>
            <tr  style={{backgroundColor:"#fff2ea"}}>
              <th  style={{backgroundColor:"#fff2ea"}}>Order ID</th>
              <th  style={{backgroundColor:"#fff2ea"}}>Date</th>
              <th  style={{backgroundColor:"#fff2ea"}}>Status</th>
              <th  style={{backgroundColor:"#fff2ea"}}>Amount</th>
              <th  style={{backgroundColor:"#fff2ea"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersToDisplay.map((order, idx) => (
              <tr key={idx}>
                <td>{order.orderId}</td>
                <td>{formatOrderDate(order.orderDate)}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{formatCurrencyINR(order.totalPrice)}</td>
                <td>
                  <Link
                    to={`/dashboard/orders/${encodeURIComponent(order.orderId)}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      {hasMoreOrdersToLoad && (
        <div className="text-center mt-3">
          <button
            className="tf-btn btn-fill btn-sm"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
