import React, { useState } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../helper/pre";

const ReturnTable = ({ orders, loading }) => {
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

  const formatOrderDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getReturnStatusBadge = (status) => {
    let colorClass = "secondary";
    const normalized = status?.toLowerCase();

    switch (normalized) {
      case "pending":
        colorClass = "warning";
        break;
      case "under review":
        colorClass = "info";
        break;
      case "return accepted":
        colorClass = "primary";
        break;
      case "started to pickup":
        colorClass = "secondary";
        break;
      case "pickup success":
        colorClass = "success";
        break;
      case "refund initiated":
        colorClass = "primary";
        break;
      case "refund completed":
        colorClass = "success";
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

  if (loading) return <Preloader />;
  if (!orders || orders.length === 0) return <p>No Return items found.</p>;

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status?.toLowerCase() === statusFilter;
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchQuery) ||
      order.customerName?.toLowerCase().includes(searchQuery) ||
      order.productName?.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const ordersToDisplay = filteredOrders.slice(0, visibleOrdersCount);
  const hasMoreOrdersToLoad = filteredOrders.length > visibleOrdersCount;

  return (
    <div className="container-fluid">
      {/* Filter and Search */}
      <div className="row mb-3 g-2">
        <div className="col-md-auto">
          <select
            className="form-select"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="under review">Under Review</option>
            <option value="return accepted">Return Accepted</option>
            <option value="started to pickup">Started to Pickup</option>
            <option value="pickup success">Pickup Success</option>
            <option value="refund initiated">Refund Initiated</option>
            <option value="refund completed">Refund Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Return ID, Product Name "
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light" style={{backgroundColor:"#fff2ea"}}>
            <tr>
              <th style={{backgroundColor:"#fff2ea"}}>Return ID</th>
              {/* <th>Order ID</th> */}
              <th style={{backgroundColor:"#fff2ea"}}>Return Date</th>
              <th style={{backgroundColor:"#fff2ea"}}>Product</th>
              <th style={{backgroundColor:"#fff2ea"}}>Return Amount</th>
              <th style={{backgroundColor:"#fff2ea"}}>Status</th>
              <th style={{backgroundColor:"#fff2ea"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersToDisplay.map((order, idx) => (
              <tr key={idx}>
                <td>{order.PK || "N/A"}</td>
                {/* <td>{order.orderId}</td> */}
<td style={{ whiteSpace: "nowrap" }}>{formatOrderDate(order.CreatedAt)}</td>
                <td>
                  {order.productName}
                 
                </td>
                <td>{formatCurrencyINR(order.finalPrice)}</td>
                <td>{getReturnStatusBadge(order.status)}</td>
                <td>
                  <Link
                    to={`/dashboard/returns/${encodeURIComponent(order.PK)}`}
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
          <button className="tf-btn btn-fill btn-sm" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ReturnTable;
