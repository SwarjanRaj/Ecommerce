import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { getUserData, updateUserPassword, updateUserProfile } from "../../API/customer";
import { useToast } from "../../helper/ToastMessage";
import statesWithDistricts from "./states.json";

const LocationSelector = ({ selectedState, setSelectedState, selectedDistrict, setSelectedDistrict }) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const stateData = statesWithDistricts.states.find(s => s.state === selectedState);
    setDistricts(stateData ? stateData.districts : []);
  }, [selectedState]);

  return (
    <>
      <div className="col-md-6 mb-3">
        <legend>State</legend>
        <select className="form-control" value={selectedState} onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedDistrict("");
        }}>
          <option value="">Select State</option>
          {statesWithDistricts.states.map(state => (
            <option key={state.state} value={state.state}>{state.state}</option>
          ))}
        </select>
      </div>

      <div className="col-md-6 mb-3">
        <legend>District</legend>
        <select className="form-control" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
    </>
  );
};

const Profile = () => {
  const { showSuccess, showError } = useToast();
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    first_name: "", last_name: "", email: "", phone: "", city: "",
    age: "", gender: "", dob: "", image: null, state: "", district: "", pincode: ""
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [existingImageName, setExistingImageName] = useState("");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [calculatedAge, setCalculatedAge] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const userData = await getUserData();
      if (userData) {
        setProfile(prev => ({ ...prev, ...userData, image: null }));
        if (userData.image_urls?.[0]?.imageUrl) {
          setPreviewImage(userData.image_urls[0].imageUrl);
          setExistingImageName(userData.image_urls[0].imageName);
        }
      }
    } catch (err) {
      showError("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validatePincode = async (pincode, selectedDistrict) => {
    if (!/^\d{6}$/.test(pincode)) {
      showError('Pincode must be exactly 6 digits.');
      return;
    }
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      console.log(data);
      if (data[0].Status !== "Success") return showError("Invalid pincode.");
      const postOffices = data[0].PostOffice;
      const matchDistrict = postOffices.some(
        (po) => po.District.toLowerCase() === selectedDistrict.toLowerCase()
      );
      if (!matchDistrict) {
        showError("Pincode does not belong to the selected district.");
      }
    } catch (err) {
      showError("Could not validate pincode. Please try again.");
    }
  };

  const handleProfileChange = async (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));



    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
      setCalculatedAge(age > 0 ? age : "");
      setProfile(prev => ({ ...prev, age: age > 0 ? age : "" }));
    }

  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProfile(prev => ({ ...prev, image: file }));
      setExistingImageName("");
    } else {
      showError("Please select a valid image file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProfile(prev => ({ ...prev, image: file }));
      setExistingImageName("");
    } else {
      showError("Invalid image file dropped");
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleClick = () => fileInputRef.current.click();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const validateProfile = () => {
    const { first_name, last_name, email, phone, age, dob, state, district, city, pincode } = profile;
    if (!first_name || !last_name || !email || !phone || !age || !dob || !state || !district || !city || !pincode) {
      showError("All fields are required");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      showError("Pincode must be exactly 6 digits.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(email)) {
      showError("Invalid email format");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      showError("Phone number must be a valid 10-digit Indian number");
      return false;
    }

    if (!Number.isInteger(Number(age)) || Number(age) <= 0) {
      showError("Age must be a valid positive number");
      return false;
    }

    return true;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in profile) {
        if (key === "image") continue;
        const value = profile[key];
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      }

      if (profile.image instanceof File) {
        formData.append("image", profile.image);
      }

      const res = await updateUserProfile(formData);
      if (res.success) {
        showSuccess("Profile updated successfully");
        await fetchData();
      } else {
        showError(res.message);
      }
    } catch (err) {
      showError("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!oldPassword || !newPassword || !confirmPassword) {
      showError("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      const res = await updateUserPassword(passwords);
      res.success ? showSuccess("Password updated successfully") : showError(res.message);
    } catch (err) {
      showError("Password update failed. Try again.");
    }
  };

  return (
    <div className="account-details w-100">
      <form onSubmit={handleProfileSubmit}>
        <h5 className="title">Update Profile</h5>
        <div className="row">
          <div className="col-md-6 mb-3 text-center">
            <div
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                width: "150px", height: "150px", border: "2px dashed #ccc", borderRadius: "8px",
                margin: "auto", backgroundColor: "#f8f8f8",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
              }}
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span>{existingImageName || "Click or Drag Image"}</span>
              )}
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          </div>
          <div className="col-md-6" >

            <div className="row">


              <div className="col-md-12 mb-3">
                <legend>First Name</legend>
                <InputText name="first_name" value={profile.first_name} onChange={handleProfileChange} className="form-control" />
              </div>

              <div className="col-md-12 mb-3">
                <legend>Last Name</legend>
                <InputText name="last_name" value={profile.last_name} onChange={handleProfileChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <legend>Email</legend>
            <InputText name="email" value={profile.email} disabled onChange={handleProfileChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <legend>Phone</legend>
            <InputText name="phone" value={profile.phone} onChange={handleProfileChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <legend>Date of Birth</legend>
            <input type="date" name="dob" value={profile.dob} onChange={handleProfileChange} className="form-control" />
          </div>

          <div className="col-md-3 mb-3">
            <legend>Age</legend>
            <InputText type="number" name="age" value={profile.age} disabled className="form-control" />
          </div>

          <div className="col-md-3   mb-3">
            <legend>Gender</legend>
            <select name="gender" value={profile.gender} onChange={handleProfileChange} className="form-control">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>





          <div className="col-md-6 mb-3">
            <legend>Pincode</legend>
            <InputText
              type="text"
              name="pincode"
              inputMode="numeric"
              pattern="[0-9]*"
              value={profile.pincode}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,6}$/.test(val)) {
                  handleProfileChange(e);
                }
              }}
              onBlur={() => {
                if (profile.pincode.length === 6) {
                  validatePincode(profile.pincode, selectedDistrict || profile.district);
                }
              }}
              className="form-control"
              maxLength={6}
            />
          </div>
          <div className="col-md-6 mb-3">
            <legend>City</legend>
            <InputText name="city" value={profile.city} onChange={handleProfileChange} className="form-control" />
          </div>

          <LocationSelector
            selectedState={profile.state}
            setSelectedState={(val) => setProfile(prev => ({ ...prev, state: val }))}
            selectedDistrict={profile.district}
            setSelectedDistrict={(val) => setProfile(prev => ({ ...prev, district: val }))}
          />


          <div className="col-md-12 text-center">
            <button className="tf-btn btn-fill" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </form>

      <hr />

      <form onSubmit={handlePasswordSubmit}>
        <h5 className="title">Change Password</h5>
        <div className="row">
          <div className="col-md-4 mb-3">
            <legend>Old Password</legend>
            <InputText type="password" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} className="form-control" />
          </div>

          <div className="col-md-4 mb-3">
            <legend>New Password</legend>
            <InputText type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="form-control" />
          </div>

          <div className="col-md-4 mb-3">
            <legend>Confirm Password</legend>
            <InputText type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="form-control" />
          </div>

          <div className="col-md-12 text-center d-lg-flex justify-content-center">
            <button className="logout-btn" type="submit" style={{ padding: "10px 20px", borderRadius: "10px" }}>
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
