import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ==================================== STRIPE ===========================================

export const createPaymentRecurrent = createAsyncThunk(
  "stripe/createPaymentRecurrent",
  async (_) => {
    console.log("=== ON CREATE PAYMENT RECURRENT ===");
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        `/stripe/create-payment-recurrent`,
        { },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error adding new payment intent:", error);
      throw new Error("Failed to add new payment intent");
    }
  }
);

// ==================================== STRIPE ===========================================

export const createPaymentIntent = createAsyncThunk(
  "stripe/createPaymentIntent",
  async ({ amount, currency }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        `/stripe/create-payment-intent`,
        { amount, currency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error adding new payment intent:", error);
      throw new Error("Failed to add new payment intent");
    }
  }
);

export const createSetupIntent = createAsyncThunk(
  "stripe/createSetupIntent",
  async (_, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;
      
      const res = await apiBackend.post(
        `/stripe/create-setup-intent`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(
        "Error creating setup intent:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Failed to create setup intent"
      );
    }
  }
);

export const attachCustomPaymentMethod = createAsyncThunk(
  "stripe/attachCustomPaymentMethod",
  async (_) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        `/stripe/attach-custom-payment-method`,
        _,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error adding new payment intent:", error);
      throw new Error("Failed to add new payment intent");
    }
  }
);

export const createCustomPaymentIntent = createAsyncThunk(
  "stripe/createCustomPaymentIntent",
  async ({ amount, currency = "usd" }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        `/stripe/create-custom-payment-intent`,
        { amount, currency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error adding new payment intent:", error);
      throw new Error("Failed to add new payment intent");
    }
  }
);
