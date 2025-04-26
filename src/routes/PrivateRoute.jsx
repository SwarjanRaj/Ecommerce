import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
