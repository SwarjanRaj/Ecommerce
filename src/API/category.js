import { API_ENDPOINTS } from "../utils/api";

export const CATEGORYLISTHOME = async () => {

  try {
    const response = await fetch(`${API_ENDPOINTS.CATEGORYLISTHOME}`, {
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

export const CATEGORYSLUGPRODUCTS = async (slug) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.CATEGORYSLUGPRODUCTS}/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    console.log(data.data)
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
export const SUBCATEGORIES = async (slug) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.SUBCATEGORIESBYCATEGORY}/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    console.log(data.data)
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

export const CATEGORYIDPRODUCTS = async (id) => {
  console.log(`${API_ENDPOINTS.CATEGORYIDPRODUCTS}${encodeURIComponent(id)}`)
  try {
    const response = await fetch(`${API_ENDPOINTS.CATEGORYIDPRODUCTS}/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    console.log(data.data)
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


export const SUBCATEGORIESPRODUCTLIST = async (slug) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.SUBCATEGORIESPRODUCT}/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    console.log(data.data)
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