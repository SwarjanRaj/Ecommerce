import React from "react";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import OrderdetailsPage from "../../components/Dashboard/OrderdetailsPage";
const OrderSingle= () => {
    return (
      <div>
        <Navbar />
        <Innerpagebaner image={'../../assets/images/innerbg.png'} category="Dashboard" />
        <OrderdetailsPage  />
        <Footer />
        <FooterToolbar />
        <CartPop />
      </div>
    );
  };
  
  export default OrderSingle;