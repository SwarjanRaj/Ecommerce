import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ company: {}, data: [] });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const initializeAuth = async (storedToken) => {
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUserData(decodedToken);
        } else {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("customerId");
        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedCustomerId = sessionStorage.getItem("customerId");

    if (storedToken) {
      setCustomerId(storedCustomerId);
      initializeAuth(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, customerId) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("customerId", customerId);
    setCustomerId(customerId);
    initializeAuth(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("customerId");
    setToken(null);
    setCustomerId(null);
    setUserData({ company: {}, data: [] });
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        token,
        loading,
        login,
        logout,
        customerId,
        isAuthenticated: !!token,  // ✅ Add this line

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
