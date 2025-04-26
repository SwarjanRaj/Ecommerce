import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Header/Navbar";
import PrivacyCom from "../../components/PrivacyCom";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";

const PrivacyPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1]; // Get last part of the URL

    return (
      <div>
        <Navbar />
        <Innerpagebaner category={'Privacy Policy'} />

<PrivacyCom  />
        <Footer />
        <FooterToolbar />
        <CartPop />
      </div>
    );
  };
  
  export default PrivacyPage;