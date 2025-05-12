import { API_ENDPOINTS } from "../utils/api";
export const ORDERLIST = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data;
        
      } else {
        throw new Error(data.message || "Failed to fetch order List.");
      }
  
    } catch (error) {
      console.error("Failed to fetch Category:", error.message);
      throw error;
    }
  };

  export const ORDERSINGLE = async (id) => {
    const token = sessionStorage.getItem("token");
console.log(`${API_ENDPOINTS.ORDER}/${decodeURIComponent(id)}`)
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER}/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      });
      const data = await response.json();
      console.log("kk",data)
      if (data.success) {
        return data.data;
        
      } else {
        throw new Error(data.message || "Failed to fetch order List.");
      }
  
    } catch (error) {
      console.error("Failed to fetch Category:", error.message);
      throw error;
    }
  };