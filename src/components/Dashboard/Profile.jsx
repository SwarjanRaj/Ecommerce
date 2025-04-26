import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import Sidebar from "./Sidebar";
import { GetUserData } from "../../API/customer";
import { API_ENDPOINTS } from "../../utils/api";
import ToastMessage from "../../helper/ToastMessage";

const statesWithDistricts = {
  AndhraPradesh: ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna"],
  Telangana: ["Adilabad", "Hyderabad", "Karimnagar", "Nizamabad", "Warangal"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  TamilNadu: ["Chennai", "Madurai", "Coimbatore", "Salem", "Tirunelveli"],
};

const LocationSelector = ({ selectedState, setSelectedState }) => {
  const [districts, setDistricts] = useState([]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(statesWithDistricts[state] || []);
  };

  return (
    <>
      <div className="col-lg-6 mb_20">
        <legend>State</legend>
        <select
          className="text-title form-control"
          id="state"
          name="address[state]"
          onChange={handleStateChange}
          value={selectedState}
        >
          <option value="">Select State</option>
          {Object.keys(statesWithDistricts).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-6 mb_20">
        <legend>District</legend>
        <select className="text-title form-control" id="district" name="address[district]">
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    gender: "",
    dob: "",
    image: null,
    state: "",
    district: "",
  });

  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await GetUserData();
        if (userData) {
          setProfile(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toastRef.current?.showError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, image: e.target.files[0] });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords ({ ...passwords, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const formData = new FormData(e.target);
    try {
      const response = await fetch(API_ENDPOINTS.UPDATEUSERBYID, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ No Content-Type
        },
        body: formData, // ✅ Correct FormData usage
      });
  
      const data = await response.json();
      if (data.ok) {
        toastRef.current?.showSuccess("Profile Updated");
      } else {
        toastRef.current?.showError(data.message || "Update Failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toastRef.current?.showError(data.message || "Update Failed");
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwords),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        alert(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <ToastMessage ref={toastRef} />
        <div className="my-account-wrap w-100 d-block">
          <div className="row">
            <div className="col-lg-4">
              <div className="wrap-sidebar-account d-block position-sticky w-100" style={{ top: "100px" }}>
                <Sidebar />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="my-account-content d-block position-relative w-100">
                <div className="account-details w-100">
                <form className="form-account-details" onSubmit={handleProfileSubmit}>
                    <div className="account-info">
                      <h5 className="title">Profile</h5>
                      <div className="row">
                        <fieldset className="col-lg-6 mb_20">
                          <legend>First Name</legend>
                          <InputText
                            type="text"
                            placeholder="Enter First Name"
                            name="first_name"
                            value={profile.first_name}
                            onChange={handleProfileChange}
                            required
                          />
                        </fieldset>
                        <fieldset className="col-lg-6 mb_20">
                          <legend>Last Name</legend>
                          <InputText
                            type="text"
                            placeholder="Enter Last Name"
                            name="last_name"
                            value={profile.last_name}
                            onChange={handleProfileChange}
                            required
                          />
                        </fieldset>
                        <fieldset className="col-lg-6 mb_20">
                          <legend>Email</legend>
                          <InputText
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            required
                          />
                        </fieldset>
                        <fieldset className="col-lg-6 mb_20">
                          <legend>Phone</legend>
                          <InputText
                            type="text"
                            placeholder="Enter Phone Number"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            required
                          />
                        </fieldset>
                        <fieldset className="col-lg-6 mb_20">
                          <legend>Age</legend>
                          <InputText
                            type="number"
                            placeholder="Enter Age"
                            name="age"
                            value={profile.age}
                            onChange={handleProfileChange}
                          />
                        </fieldset>
                        <fieldset className="col-lg-6 mb_20">
                          <legend>Date of Birth</legend>
                          <InputText
                            type="date"
                            name="dob"
                            value={profile.dob}
                            onChange={handleProfileChange}
                          />
                        </fieldset>
                        <fieldset className=" col-lg-6 mb_20">
                          <legend>Profile Image</legend>
                          <InputText
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleFileChange}
                          />
                        </fieldset>
                        <div className="col-lg-6 mb_20">
        <legend>District</legend>
        <select className="text-title form-control" id="district" name="gender">
          <option value="">Gender</option>
          
            <option value="">
              Femail
            </option>
        </select>
      </div>
                        <LocationSelector selectedState={profile.state} setSelectedState={(state) => setProfile({ ...profile, state })} />
                        <fieldset className="col-lg-6 mb_20">
                          <legend>City</legend>
                          <InputText
                            type="text"
                            placeholder="Enter City"
                            name="city"
                            value={profile.city}
                            onChange={handleProfileChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="form-leave-comment button mb-5">
                        <button className="tf-btn btn-fill" type="submit" disabled={loading}>
                          {loading ? "Updating..." : "Update Profile"}
                        </button>
                      </div>
                    </div>
                  </form>

                  <form className="form-account-details form-has-password" onSubmit={handlePasswordSubmit}>
                    <div className="account-password">
                      <h5 className="title">Change Password</h5>
                      {["password", "newPassword", "confirmPassword"].map((field) => (
                        <div key={field} className="position-relative password-item mb_20">
                          <InputText
                            type={visibility[field] ? "text" : "password"}
                            placeholder={field.replace(/([A-Z])/g, " $1")}
                            className="input-password"
                            name={field}
                            value={passwords[field]}
                            onChange={handlePasswordChange}
                          />
                          <span className="toggle-password" onClick={() => togglePasswordVisibility(field)}>
                            <i className={`pi ${visibility[field] ? "pi-eye" : "pi-eye-slash"}`}></i>
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="form-leave-comment button">
                      <button className="tf-btn btn-fill" type="submit">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;