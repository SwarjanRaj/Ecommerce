import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import OrderdetailsPage from "../../components/Dashboard/OrderdetailsPage";

import { ORDERSINGLE } from "../../API/order";
import { useToast } from "../../helper/ToastMessage";

const OrderSingle = () => {
  const { id } = useParams();
  const { showSuccess, showError } = useToast();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ORDERSINGLE(id);
        if (res) {
          setOrder(res);
          showSuccess("Order data fetched successfully!");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showError("Failed to fetch order data.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <Navbar />
      <Innerpagebaner image="/assets/images/1.png" category="Dashboard" />
      {order && <OrderdetailsPage order={order} />}
      <Footer />
      <FooterToolbar />
      <CartPop />
    </div>
  );
};

export default OrderSingle;
