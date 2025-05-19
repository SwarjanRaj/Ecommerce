import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/Dashboard/ProfilePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashbaordLayout";
import Orders from "../pages/Dashboard/Orders";
import OrderSingle from "../pages/Dashboard/OrderSingle";
import Returns from "../pages/Dashboard/Returns";
import ReturnSingle from "../pages/Dashboard/ReturnSingle";
const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="returns" element={<Returns />} />
        <Route path="transactions" element={<Orders />} />

        <Route path="orders/:id" element={<OrderSingle />} />

                <Route path="returns/:id" element={<ReturnSingle />} />

      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
