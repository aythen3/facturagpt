import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ==================================== STRIPE ===========================================

export const createPaymentIntent = createAsyncThunk(
  "emailManager/createPaymentIntent",
  async ({ amount, currency, clientId }) => {
    console.log("=== ON CREATE PAYMENT INTENT ===", {
      amount,
      currency,
      clientId,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/emailManager/create-payment-intent`,
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
  "emailManager/createSetupIntent",
  async (_, { rejectWithValue }) => {
    console.log("=== ON CREATE SETUP INTENT ===");
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/emailManager/create-setup-intent`,
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