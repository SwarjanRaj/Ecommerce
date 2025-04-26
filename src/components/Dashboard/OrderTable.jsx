import React from "react";
import { Link } from "react-router-dom";
const orders =  [
  { id: 123, date: "August 1, 2024", status: "On hold", total: "$200.0 for 1 item" },
  { id: 345, date: "August 2, 2024", status: "On hold", total: "$300.0 for 1 item" },
  { id: 567, date: "August 3, 2024", status: "On hold", total: "$400.0 for 1 item" },
];

const OrderTable = () => {
  return (
    <div className="account-orders d-flex">
      <div className="wrap-account-order">
        <table>
          <thead>
            <tr>
              <th className="fw-6">Order</th>
              <th className="fw-6">Date</th>
              <th className="fw-6">Status</th>
              <th className="fw-6">Total</th>
              <th className="fw-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="tf-order-item" key={order.id}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>
                <td>
                <Link to={`/dashboard/orders/${order.id}`} className="tf-btn btn-fill radius-4">
  <span className="text">View</span>
</Link>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
