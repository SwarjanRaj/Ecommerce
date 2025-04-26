import React from "react";
import Navbar from "../../components/Header/Navbar";

import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import SignUp from "../../components/Auth/SignUp";
import NewAuth from "../../components/Auth/NewAuth";
const Login = () => {
    return (
      <div>
        <Navbar />
        <Innerpagebaner image={'../assets/images/page-title.jpg'} category="Register" />


       {/* <NewAuth  /> */}
       <SignUp  />

        <Footer />
        <FooterToolbar />
        <CartPop />
      </div>
    );
  };
  
  export default Login;