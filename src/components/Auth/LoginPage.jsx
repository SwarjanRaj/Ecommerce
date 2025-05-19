import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, postCartToUser } from "../../API/customer";
import { useToast } from "../../helper/ToastMessage";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // const isValidPassword = (password) =>
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } 
    // else if (!isValidPassword(password)) {
    //   errors.password =
    //     "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character";
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        showSuccess(response.message);
        login(response.data.token, response.data.customerId);

        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (guestCart.length > 0) {
          await postCartToUser(JSON.stringify(guestCart));
          localStorage.removeItem("cart");
        }

        const redirectPath = localStorage.getItem("postLoginRedirect") || "/dashboard";
        localStorage.removeItem("postLoginRedirect");
        setTimeout(() => navigate(redirectPath), 1000);
      } else {
        const msg = response.message.toLowerCase();
        if (msg.includes("email")) {
          showError("Invalid Email Address");
        } else if (msg.includes("password")) {
          showError("Incorrect Password");
        } else {
          showError(response.message || "Login failed!");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      showError("An error occurred. Please try again.");
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

              <form onSubmit={handleSubmit} className="form-login form-has-password">
                <div className="wrap">
                  {/* Email Field */}
                  <fieldset>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFormErrors({ ...formErrors, email: "" });
                      }}
                    
                                              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}

                    />
                    {formErrors.email && (
                      <small className="text-danger  d-block text-start">{formErrors.email}</small>
                    )}
                  </fieldset>

                  {/* Password Field */}
                  <fieldset className="position-relative password-item">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password *"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFormErrors({ ...formErrors, password: "" });
                      }}
                                              className={`form-control ${formErrors.password ? "is-invalid" : ""}`}


                    />
                    {/* <span
                      className="toggle-password unshow"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    >
                      <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
                    </span> */}
                    {formErrors.password && (
                      <small className="text-danger d-block text-start">{formErrors.password}</small>
                    )}
                  </fieldset>

                  <div className="mt-2 text-left">
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
