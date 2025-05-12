import React from "react";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import Profile from "../../components/Dashboard/Profile";
import Home from "../../components/Dashboard/Home";
const Dashboard = () => {
    return (
      <div>
        <Navbar />
        <Innerpagebaner image={'../assets/images/1.png'} category="Dashboard" />
        <Home  />
        <Footer />
        <FooterToolbar />
        <CartPop />
      </div>
    );
  };
  
  export default Dashboard;