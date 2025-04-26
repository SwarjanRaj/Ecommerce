import { API_ENDPOINTS } from "../utils/api";

export const BANNERLIST = async () => {

  try {
    const response = await fetch(`${API_ENDPOINTS.BANNERS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
      
    } else {
      throw new Error(data.message || "Failed to fetch Category List.");
    }

  } catch (error) {
    console.error("Failed to fetch Category:", error.message);
    throw error;
  }
};