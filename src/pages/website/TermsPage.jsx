import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Header/Navbar";
import Terms from "../../components/Terms";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";

const TermsPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1]; // Get last part of the URL

    return (
      <div>
        <Navbar />
        <Innerpagebaner category={'Terms & Conditions'} image="../assets/images/1.png" />

<Terms  />
        <Footer />
        <FooterToolbar />
        <CartPop />
      </div>
    );
  };
  
  export default TermsPage;