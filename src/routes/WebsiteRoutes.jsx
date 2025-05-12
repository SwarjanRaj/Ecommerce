// src/routes/WebsiteRoutes.js
import { Routes, Route } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Home from "../pages/website/Home";
import Category from "../pages/website/Category";
import BestSellerPage from "../pages/website/Bestseller";
import Products from "../pages/website/Products";
import Login from "../pages/website/Login";
import Register from "../pages/website/Register";
import Collections from "../pages/website/Collections";
import WebsiteCart from "../pages/website/WebsiteCart";
import CheckoutPage from "../pages/website/CheckoutPage";

const WebsiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="category/:slug" element={<Category />} />
        <Route path="new-launch" element={<BestSellerPage />} />
        <Route path="product/:slug" element={<Products />} />
        <Route path="collections/:slug" element={<Collections />} />
        <Route path="cart" element={<WebsiteCart />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default WebsiteRoutes;
