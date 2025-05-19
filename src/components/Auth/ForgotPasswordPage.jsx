import React, { useState } from "react";
import { useToast } from "../../helper/ToastMessage";
// import { forgotPassword } from "../../API/customer"; 
import { getUserData } from "../../API/customer";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return showError("Email is required");
    if (!isValidEmail(email)) return showError("Invalid email format");

    setLoading(true);
    try {
      const res = await getUserData(email); // your API call
      res.success ? showSuccess(res.message) : showError(res.message);
    } catch (err) {
      showError("Failed to send reset link. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="contact-wrap-form bg-light text-center">
              <div className="heading">
                <h4>Forgot Password</h4>
              </div>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </fieldset>

                <div className="button-submit mt-3">
                  <button
                    type="submit"
                    className="tf-btn btn-fill"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>

                <div className="pt-3">
                  <p>
                    Remembered your password?{" "}
                    <a href="/login" className="link">Login here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
