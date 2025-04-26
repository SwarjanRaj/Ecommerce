import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import Checkout from "../../components/cart/checkout";
import { fetchcheckoutdata } from "../../API/cart";

const CheckoutPage = () => {
  const navigate = useNavigate(); // ✅ initialize navigate
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState(null);
  const [coupons, setCoupons] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchcheckoutdata();
        console.log("Fetched checkout data:", res);

        if (res && res.customer && res.cart) {
          setCustomer(res.customer);
          setCart(res.cart);
          setCoupons(res.coupons)

          // ✅ Check if cart has no items and redirect
          if (res.cart?.items?.length < 1) {
            navigate("/"); // Redirect to home
          }
        } else {
          console.warn("Unexpected response format:", res);
        }

      } catch (err) {
        console.error("Error loading cart data", err);
      }
    };

    loadProduct();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Innerpagebaner image={"../assets/images/innerbg.png"} category="Check Out" />
      {customer && cart && <Checkout cart={cart} customer={customer} coupons={coupons} />}
      <Footer />
      <FooterToolbar />
      <CartPop />
    </div>
  );
};

export default CheckoutPage;
