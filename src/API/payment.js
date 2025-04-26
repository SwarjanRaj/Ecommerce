// services/payment.js

import axios from 'axios';
import CryptoJS from 'crypto-js';

const BASE_URL = 'https://lqo22sllk8.execute-api.ap-south-1.amazonaws.com/Prod/api/checkout';

// Helper to get Authorization headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch Razorpay Settings
export const getRazorpaySettings = async () => {
  const headers = getAuthHeaders();

  if (!headers.Authorization) {
    console.error("No token found, user not logged in.");
    return {
      success: false,
      message: "User not logged in",
    };
  }

  try {
    const response = await axios.get(`${BASE_URL}/razorpay-settings`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching Razorpay settings:", error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

// Create Razorpay Order
export const createOrder = async (cartId, shippingAddress, notes = "Please deliver between 10 AM and 5 PM") => {
  const headers = getAuthHeaders();

  if (!headers.Authorization) {
    console.error("No token found, user not logged in.");
    return {
      success: false,
      message: "User not logged in",
    };
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/order`,
      { cartId, shippingAddress, notes },
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentData) => {
  const headers = getAuthHeaders();

  if (!headers.Authorization) {
    console.error("No token found, user not logged in.");
    return {
      success: false,
      message: "User not logged in",
    };
  }

  try {
    const response = await axios.post(`${BASE_URL}/verify`, paymentData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

// Decrypt function using AES-256-CBC
export const decryptKey = (encryptedKey, ivHex, encryptionKeyHex) => {
  console.log('\n[DECRYPTION]');

  const key = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(encryptionKeyHex));
  console.log('Hashed Encryption Key (hex):', key.toString());

  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const ciphertext = CryptoJS.enc.Hex.parse(encryptedKey);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertext
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  console.log('Decrypted Key:', decryptedText);
  return decryptedText;
};
