import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../helper/ToastMessage";
import { registerUser } from "../../API/customer";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      showError("All fields are required!");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Invalid email format!");
      return;
    }

    if (!isValidPhone(phone)) {
      showError("Invalid phone number! Must be 10 digits.");
      return;
    }

    if (!isValidPassword(password)) {
      showError(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      if (result.success) {
        showSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        showError(result.message || "Registration failed!");
      }
    } catch (error) {
      showError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 p-3">
            <div className="contact-wrap-form bg-light text-center d-flex justify-content-center">
              <div>
                <div className="heading mb-4">
                  <h4>Register</h4>
                </div>
                <form onSubmit={handleSubmit} className="form-login form-has-password">
                  <div className="row">
                    <fieldset className="col-lg-6 mb-3">
                      <input type="text" name="firstName" placeholder="First Name*" onChange={handleChange} />
                    </fieldset>
                    <fieldset className="col-lg-6 mb-3">
                      <input type="text" name="lastName" placeholder="Last Name*" onChange={handleChange} />
                    </fieldset>
                    <fieldset className="col-lg-6 mb-3">
                      <input type="email" name="email" placeholder="Email Address*" onChange={handleChange} />
                    </fieldset>
                    <fieldset className="col-lg-6 mb-3">
                      <input type="text" name="phone" placeholder="Phone Number*" onChange={handleChange} />
                    </fieldset>
                    <fieldset className="position-relative password-item col-lg-6 mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password*"
                        onChange={handleChange}
                      />
                      <span
                        className="toggle-password unshow"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      >
                        <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
                      </span>
                    </fieldset>
                    <fieldset className="position-relative password-item col-lg-6 mb-3">
                      <input
                        type={showCPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password*"
                        onChange={handleChange}
                      />
                      <span
                        className="toggle-password unshow"
                        onClick={() => setShowCPassword(!showCPassword)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      >
                        <i className={showCPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
                      </span>
                    </fieldset>
                  </div>
                  <div className="button-submit">
                    <button className="tf-btn btn-fill" type="submit" disabled={loading}>
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                  <h6 className="pt-4 link">
                    Already have an account?{" "}
                    <Link to="/login" style={{ fontWeight: "bold" }}>
                      Login Now!
                    </Link>
                  </h6>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-5 p-3">
            <div className="d-flex justify-content-center">
              <img src="../assets/images/login.jpg" style={{ width: "100%", maxWidth: "400px" }} alt="Signup" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
