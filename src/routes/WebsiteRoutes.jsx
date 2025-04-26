import { Routes, Route } from "react-router-dom";

import Home from "../pages/website/Home";
import Category from "../pages/website/Category";
import Products from "../pages/website/Products";
import Login from "../pages/website/Login";
import Register from "../pages/website/Register";
import CategoryPage from "../components/Category/CategoryPage";
import Collections from "../pages/website/Collections";
import WebsiteCart from "../pages/website/WebsiteCart";
import CheckoutPage from "../pages/website/CheckoutPage";
const WebsiteRoutes = ({ toastRef }) => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/category/:slug" element={<Category />} />
       {/* <Route path="/collection" element ={<CategoryPage/>} /> */}
        <Route path="/product/:slug" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/collections/:slug" element={<Collections />} />
        <Route path="/cart" element={<WebsiteCart  toastRef={toastRef}/>} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
    </Routes>
  );
};

export default WebsiteRoutes;
