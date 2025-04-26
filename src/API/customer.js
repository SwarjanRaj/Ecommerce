import { API_ENDPOINTS } from "../utils/api";

export const GetUserData = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found, user not logged in.");
    return null;
  }

  try {
    const response = await fetch(`${API_ENDPOINTS.GETUSERBYID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data)
    if (response.ok && data.success) {
      return data.data; // Return user data as JSON
    } else {
      console.error("Failed to fetch user data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
