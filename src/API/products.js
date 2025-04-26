import { API_ENDPOINTS } from "../utils/api";

export const PRODUCTSWITHCATEGORY = async ($index) => {
    // console.log(`${API_ENDPOINTS.PRODUCTSWITHCATEGORY}?index=${$index}`)
  try {
    const response = await fetch(`${API_ENDPOINTS.PRODUCTSWITHCATEGORY}?index=${$index}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
        // console.log(data.data)
      return data.data;
      
    } else {
      throw new Error(data.message || "Failed to fetch Category List.");
    }

  } catch (error) {
    console.error("Failed to fetch Category:", error.message);
    throw error;
  }
};



export const PRODUCTSWITHSLUG = async (slug) => {
  // console.log(`${API_ENDPOINTS.PRODUCTSWITHSLUG}/${slug}`)
try {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTSWITHSLUG}/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
      // console.log(data.data[0])
    return data.data;
    
  } else {
    throw new Error(data.message || "Failed to fetch Category List.");
  }

} catch (error) {
  console.error("Failed to fetch Category:", error.message);
  throw error;
}
};

export const BESTSELLER = async () => {

  try {
    const response = await fetch(`${API_ENDPOINTS.BESTSELLER}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    if (data.success) {
      return data.data;
      
    } else {
      throw new Error(data.message || "Failed to fetch BestSeller.");
    }

  } catch (error) {
    console.error("Failed to fetch BestSeller:", error.message);
    throw error;
  }
};

export const NEWLAUNCH = async () => {

  try {
    const response = await fetch(`${API_ENDPOINTS.NEWLAUNCH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    if (data.success) {
      return data.data;
      
    } else {
      throw new Error(data.message || "Failed to fetch new launch.");
    }

  } catch (error) {
    console.error("Failed to fetch New Launch:", error.message);
    throw error;
  }
};