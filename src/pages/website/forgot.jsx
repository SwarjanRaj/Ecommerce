import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Innerpagebaner from "../../components/Innerpagebaner";
import ForgotPasswordPage from "../../components/Auth/ForgotPasswordPage";

const Forgot = () => {
 

  return (
    <div>
      <Innerpagebaner image={'../assets/images/1.png'} category="Login" />
      {/* <NewAuth /> */}
      <ForgotPasswordPage />
      
    </div>
  );
};
// const logout

export default Forgot;
