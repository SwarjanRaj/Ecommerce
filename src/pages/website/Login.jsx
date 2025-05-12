import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Innerpagebaner from "../../components/Innerpagebaner";
import LoginPage from "../../components/Auth/LoginPage";
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
      <Innerpagebaner image={'../assets/images/1.png'} category="Login" />
      {/* <NewAuth /> */}
      <LoginPage />
      
    </div>
  );
};
// const logout

export default Login;
