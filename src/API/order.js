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
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER}/${encodeURIComponent(id)}`, {
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

export const RETURNLIST = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API_ENDPOINTS.RETURNORDER}`, {
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
  export const RETURNSINGLE = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${API_ENDPOINTS.RETURNORDER}/${encodeURIComponent(id)}`, {
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


 export const RETURNORDER = async (Formdata) => {
  const token = sessionStorage.getItem("token");

  try {
    // Creating a new FormData object
    const formData = new FormData();
    
    // Append the necessary fields from Formdata
    formData.append('type', Formdata.type);
    formData.append('orderId', Formdata.orderId);
    formData.append('productId', Formdata.productId);
    formData.append('size', Formdata.size);
    formData.append('quantity', Formdata.quantity);
    formData.append('questions', Formdata.questions);
    
    // Check if the files exist and append them to FormData
    if (Formdata.files) {
      formData.append('files', Formdata.files); // For a single file
    }
    if (Formdata.video) {
      formData.append('video', Formdata.video); // For a single video file
    }

    // Sending the request with FormData
    const response = await fetch(`${API_ENDPOINTS.RETURNORDER}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Only Authorization header
      },
      body: formData, // Sending FormData instead of JSON
    });

    const data = await response.json();

    if (data.success) {
      return data.data; // Return the data if success
    } else {
      throw new Error(data.message || "Failed to fetch order List.");
    }

  } catch (error) {
    console.error("Failed to fetch Category:", error.message);
    throw error;
  }
};
