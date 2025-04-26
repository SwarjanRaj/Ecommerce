import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterToolbar from "../../components/Footer/FooterToolbar";
import CartPop from "../../components/Footer/CartPop";
import Innerpagebaner from "../../components/Innerpagebaner";
import LoginPage from "../../components/Auth/LoginPage";
// import NewAuth from "../../components/Auth/NewAuth"; // Optional
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar />
      <Innerpagebaner image={'../assets/images/innerbg.png'} category="Login" />
      {/* <NewAuth /> */}
      <LoginPage />
      <Footer />
      <FooterToolbar />
      <CartPop />
    </div>
  );
};
// const logout

export default Login;
