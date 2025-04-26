import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from '../pages/Dashboard/ProfilePage'
import Dashboard from '../pages/Dashboard/Dashboard'
import Orders from "../pages/Dashboard/Orders";
import OrderSingle from "../pages/Dashboard/OrderSingle";
const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:slug" element={<OrderSingle />} />
    </Routes>
  );
};

export default DashboardRoutes;
