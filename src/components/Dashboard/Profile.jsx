import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import Sidebar from "./Sidebar";
import { getUserData , updateUserPassword , updateUserProfile} from "../../API/customer";
import { useToast } from "../../helper/ToastMessage";
import statesWithDistricts from "./states.json";

// LocationSelector Component
const LocationSelector = ({
  selectedState,
  setSelectedState,
  selectedDistrict,
  setSelectedDistrict,
}) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const stateData = statesWithDistricts.states.find(
        (s) => s.state === selectedState
      );
      setDistricts(stateData ? stateData.districts : []);
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  return (
    <>
      <div className="col-md-6 mb-3">
        <legend>State</legend>
        <select
          className="form-control"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedDistrict("");
          }}
        >
          <option value="">Select State</option>
          {statesWithDistricts.states.map((state) => (
            <option key={state.state} value={state.state}>
              {state.state}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6 mb-3">
        <legend>District</legend>
        <select
          className="form-control"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
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

// Main Profile Component
const Profile = () => {
  const { showSuccess, showError } = useToast();
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

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

  const [previewImage, setPreviewImage] = useState(null);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        // console.log(userData);
        if (userData) {
          setProfile(userData);
          if (userData.image_urls) {
            console.log("kk", userData.image_urls[0]['imageUrl'])
            setPreviewImage(userData.image_urls[0]['imageUrl']);
          }
        }
      } catch (err) {
        console.error(err);
        showError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProfile((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProfile((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleClick = () => fileInputRef.current.click();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUserProfile(profile);
  
    if (res.success) showSuccess("Profile updated successfully");
    else showError(res.message);
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUserPassword(passwords);
  
    if (res.success) showSuccess("Password updated");
    else showError(res.message);
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="my-account-wrap">
          <div className="row">
            <div className="col-lg-4">
              <Sidebar />
            </div>

            <div className="col-lg-8">
              <div className="my-account-content d-block position-relative w-100">
                <div className="account-details w-100">
                  <form onSubmit={handleProfileSubmit}>
                    <h5 className="title">Update Profile</h5>
                    <div className="row">
                      {/* Profile Image */}
                      <div className="col-md-6 mb-3 text-center">
                        <div
                          onClick={handleClick}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "2px dashed #ccc",
                            borderRadius: "8px",
                            margin: "auto",
                            backgroundColor: "#f8f8f8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span>Click or Drag Image</span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </div>

                      <div className="col-lg-6">
                        <div className="col-md-12 mb-3">
                          <legend>First Name</legend>
                          <InputText
                            name="first_name"
                            className="form-control"
                            value={profile.first_name}
                            onChange={handleProfileChange}
                          />
                        </div>

                        <div className="col-md-12 mb-3">
                          <legend>Last Name</legend>
                          <InputText
                            name="last_name"
                            className="form-control"
                            value={profile.last_name}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <legend>Email</legend>
                        <InputText
                          type="email"
                          name="email"
                          className="form-control"
                          readOnly
                          value={profile.email}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <legend>Phone</legend>
                        <InputText
                          name="phone"
                          className="form-control"
                          value={profile.phone}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <legend>Age</legend>
                        <InputText
                          type="number"
                          name="age"
                          className="form-control"
                          value={profile.age}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <legend>Date of Birth</legend>
                        <InputText
                          type="date"
                          name="dob"
                          className="form-control"
                          value={profile.dob}
                          onChange={handleProfileChange}
                        />
                      </div>

                      {/* Location Selector */}
                      <LocationSelector
                        selectedState={profile.state}
                        setSelectedState={(val) =>
                          setProfile((prev) => ({ ...prev, state: val }))
                        }
                        selectedDistrict={profile.district}
                        setSelectedDistrict={(val) =>
                          setProfile((prev) => ({ ...prev, district: val }))
                        }
                      />
                      <div className="col-md-6 mb-3">
                        <legend>City</legend>
                        <InputText
                          type="text"
                          name="city"
                          className="form-control"
                          value={profile.city}
                          onChange={handleProfileChange}
                        />
                      </div>
                      {/* Submit Button */}
                      <div className="col-md-12 text-center mt-3">
                      <button type="submit" className="btn btn-success" disabled={loading}>
  {loading ? "Updating..." : "Update Profile"}
</button>

                      </div>
                    </div>
                  </form>

                  {/* Change Password Form */}
                  <form onSubmit={handlePasswordSubmit} className="mt-5">
                    <h5 className="title">Change Password</h5>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <legend>Old Password</legend>
                        <InputText
                          type="password"
                          name="oldPassword"
                          className="form-control"
                          value={passwords.oldPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <legend>New Password</legend>
                        <InputText
                          type="password"
                          name="newPassword"
                          className="form-control"
                          value={passwords.newPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <legend>Confirm Password</legend>
                        <InputText
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          value={passwords.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>

                      <div className="col-md-12 text-center mt-2">
                        <button type="submit" className="btn btn-warning">
                          Update Password
                        </button>
                      </div>
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
