
import { API_ENDPOINTS } from "../utils/api";

// 🔹 Login User API
export const loginUser = async (credentials) => {
  console.log(credentials)
  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// 🔹 Register User API
export const registerUser = async (userData) => {
  try {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// 🔹 Get User Data API
export const getUserData = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found, user not logged in.");
    return null;
  }

  try {
    const response = await fetch(API_ENDPOINTS.GETUSERBYID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return data.data;
    } else {
      console.error("Failed to fetch user data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


export const updateUserProfile = async (profile) => {
  const token = sessionStorage.getItem("token");

  try {
    const res = await fetch(API_ENDPOINTS.UPDATEUSERBYID, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: profile,
    });

    const data = await res.json();
    return { success: res.ok, message: data.message || "Profile update result" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to update profile" };
  }
};

// 🔹 Update User Password API
export const updateUserPassword = async (passwords) => {
  const token = sessionStorage.getItem("token");

  if (passwords.newPassword !== passwords.confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
    const res = await  fetch(API_ENDPOINTS.PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,  Authorization: `Bearer ${token}` },
      body: JSON.stringify(passwords),
    });

    const data = await res.json();
    return { success: res.ok, message: data.message || "Password update result" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong" };
  }
};

// 🔹 Post Guest Cart to User Cart API
export const postCartToUser = async (cartData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found, cannot post cart.");
      return;
    }

    await fetch(API_ENDPOINTS.GETCART, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: cartData,
    });
  } catch (error) {
    console.error("Error posting cart data:", error);
    throw error;
  }
};
