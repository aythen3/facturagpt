import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ==================================== STRIPE ===========================================

export const createPaymentRecurrent = createAsyncThunk(
  "stripe/createPaymentRecurrent",
  async (_) => {
    console.log("=== ON CREATE PAYMENT RECURRENT ===");
    try {
      const token = localStorage.getItem("token");
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
  async ({ amount, currency, clientId }) => {
    console.log("=== ON CREATE PAYMENT INTENT ===", {
      amount,
      currency,
      clientId,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/stripe/create-payment-intent`,
        { amount, currency, clientId },
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
    console.log("=== ON CREATE SETUP INTENT ===");
    try {
      const token = localStorage.getItem("token");
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
  async ({ userId }) => {
    console.log("=== ON ATTACH CUSTOM PAYMENT METHOD ===", {
      userId,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/stripe/attach-custom-payment-method`,
        { userId },
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
  async ({ userId, amount, currency = "usd" }) => {
    console.log("=== ON CREATE CUSTOM PAYMENT INTENT ===", {
      userId,
      amount,
      currency,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/stripe/create-custom-payment-intent`,
        { userId, amount, currency },
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
