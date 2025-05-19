import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../helper/ToastMessage";
import { registerUser } from "../../API/customer";
import { Button } from "primereact/button";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password);

  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Invalid email format";

    if (!phone) newErrors.phone = "Phone number is required";
    else if (!isValidPhone(phone)) newErrors.phone = "Invalid phone number";

    if (!password) newErrors.password = "Password is required";
    else if (!isValidPassword(password))
      newErrors.password =
        "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const { firstName, lastName, email, phone, password } = formData;

      const result = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      if (result.success) {
        showSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        showError(result.message || "Registration failed!");
      }
    } catch (err) {
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
                    {["firstName", "lastName", "email", "phone"].map((field) => (
                      <fieldset key={field} className="col-lg-6 mb-3 text-left">
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          placeholder={`${field
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}*`}
                          onChange={handleChange}
                          value={formData[field]}
                          className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                        />
                        {errors[field] && (
                          <small className="text-danger  text-start d-block">{errors[field]}</small>
                        )}
                      </fieldset>
                    ))}

                    <fieldset className="position-relative password-item col-lg-6 mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password*"
                        onChange={handleChange}
                        value={formData.password}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      />
                      {/* <span
                        className="toggle-password unshow"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      >
                        <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
                      </span> */}
                      {errors.password && (
                        <small className="text-danger text-start d-block" >{errors.password}</small>
                      )}
                    </fieldset>

                    <fieldset className="position-relative password-item col-lg-6 mb-3">
                      <input
                        type={showCPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password*"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      />
                      {/* <span
                        className="toggle-password unshow"
                        onClick={() => setShowCPassword(!showCPassword)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      >
                      </span> */}
                      {errors.confirmPassword && (
                        <small className="text-danger  text-start d-block fs-10" >{errors.confirmPassword}</small>
                      )}
                    </fieldset>
                  </div>

                  <div className="button-submit">
                    <Button
                      label={loading ? "Registering..." : "Register"}
                      icon={loading ? "pi pi-spinner pi-spin" : ""}
                      className="tf-btn btn-fill text-button"
                      type="submit"
                      disabled={loading}
                    />
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
              <img
                src="../assets/images/login.jpg"
                style={{ width: "100%", maxWidth: "400px" }}
                alt="Signup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
