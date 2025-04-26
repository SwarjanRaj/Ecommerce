import React, { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import ToastMessage from "../../helper/ToastMessage";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 🔹 API call to login
  const loginUser = async (credentials) => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  };

  // 🔹 Function to post guest cart to user cart
  const POSTCATACART = async (cartData) => {
    try {
      await fetch(API_ENDPOINTS.GETCART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: cartData,
      });
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        toastRef.current?.showSuccess(response.message);
        login(response.data.token, response.data.customerId);

        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (guestCart.length > 0) {
          await POSTCATACART(JSON.stringify(guestCart));
          localStorage.removeItem("cart");
        }

        const redirectPath = localStorage.getItem("postLoginRedirect") || "/dashboard";
        localStorage.removeItem("postLoginRedirect");
        setTimeout(() => navigate(redirectPath), 1000);
      } else {
        toastRef.current?.showError(response.message || "Login failed!");
      }
    } catch (err) {
      toastRef.current?.showError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          {/* Left - Login Form */}
          <div className="col-lg-6">
            <div className="contact-wrap-form bg-light text-center">
              <div className="heading">
                <h4>Login</h4>
              </div>
              <ToastMessage ref={toastRef} />
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit} className="form-login form-has-password">
                <div className="wrap">
                  <fieldset>
                    <input
                      type="email"
                      placeholder="Email Address*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </fieldset>
                  <fieldset className="position-relative password-item">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password*"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-password"
                    />
                    <span
                      className="toggle-password unshow"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    >
                      <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
                    </span>
                  </fieldset>
                  <div className="mt-2">
                    <Link to="/forgot-password" className="text-button link">
                      Forgot Your Password?
                    </Link>
                  </div>
                </div>
                <div className="button-submit">
                  <button className="tf-btn btn-fill" type="submit">
                    <span className="text text-button">Login</span>
                  </button>
                </div>
                <h6 className="pt-4 link">
                  New Customer?{" "}
                  <Link to="/register" style={{ fontWeight: "bold" }}>
                    Register Now!
                  </Link>
                </h6>
              </form>
            </div>
          </div>

          {/* Right - Image Section */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <img
              src="../assets/images/login.jpg"
              alt="Login"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
