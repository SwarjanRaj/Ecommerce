// src/API/cart.js
import { API_ENDPOINTS } from "../utils/api";

export const CARTDATA = async () => {
  const authToken = sessionStorage.getItem("token");
  const url = authToken ? API_ENDPOINTS.GETCART : API_ENDPOINTS.GETCARTNOTOKEN;
  const method = authToken ? "GET" : "POST";

  const headers = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };

  const body = !authToken
    ? JSON.stringify(JSON.parse(localStorage.getItem("cart")) || [])
    : null;

  try {
    const response = await fetch(url, {
      method,
      headers,
      ...(body ? { body } : {}),
    });

    const data = await response.json();
    if (data.success) {
      return data
    } else {
      throw new Error(data.message || "Failed to fetch cart data.");
    }
  } catch (error) {
    console.error("Failed to fetch cart:", error.message);
    throw error;
  }
};


  export const POSTCATACART = async (payload) => {
    const token = sessionStorage.getItem("token");
  
    try {
      const response = await fetch(`${API_ENDPOINTS.GETCART}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
      throw error;
    }
  };
  
  export const increaseQuantity = async (productId, size) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API_ENDPOINTS.CARTPRODUCTINCREASE}`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        size,
      }),
    });

    const data = await response.json();
    console.log("Quantity increased:", data);

      // Optionally refresh cart data here
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };
  export const decreaseQuantity = async (productId, size) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API_ENDPOINTS.CARTPRODUCTDECREASE}`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        size,
      }),
    });

    const data = await response.json();
    console.log("Quantity increased:", data);

      // Optionally refresh cart data here
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  export const DeleteCartProduct = async (productId, size) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API_ENDPOINTS.GETCART}`, {
        method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        size,
      }),
    });

    const data = await response.json();
    console.log("delete Record:", data);

      // Optionally refresh cart data here
    } catch (error) {
      console.error("delete Record:", error);
    }
  };

  export const fetchcheckoutdata = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API_ENDPOINTS.CHECKOUTDATA}`, {
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
        throw new Error(data.message || "Failed to fetch Cart List.");
      }
  
    } catch (error) {
      console.error("Failed to fetch Cart:", error.message);
      throw error;
    }
  }


  export const APPLYCOUPON = async (payload) => {
    const token = sessionStorage.getItem("token");
  
    try {
      const response = await fetch(`${API_ENDPOINTS.COUPON}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (data.success) {
        return data;
      } else {
        return data;
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
      throw error;
    }
  };
  