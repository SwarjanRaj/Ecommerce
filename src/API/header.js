import { API_ENDPOINTS } from "../utils/api";

export const CATEGORYLIST = async () => {

  try {
    const response = await fetch(`${API_ENDPOINTS.CATEGORYLIST}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data)
    if (data.success) {
      return data.data.sort((a, b) => a.name.localeCompare(b.name));
      
    } else {
      throw new Error(data.message || "Failed to fetch Category List.");
    }

  } catch (error) {
    console.error("Failed to fetch Category:", error.message);
    throw error;
  }
};

export const getSubCategories = async (categoryId) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.SUBCATEGORYLIST}/${encodeURIComponent(categoryId)}`, // Use your base
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      if (data.success) {
        return data.data;
        
      } else {
        throw new Error(data.message || "Failed to fetch Subcategories.");
      }
    } catch (error) {
      console.error("Subcategory Fetch Error:", error.message);
      return [];
    }
  };
  