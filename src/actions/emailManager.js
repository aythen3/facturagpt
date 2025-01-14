import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEmailsByQuery = createAsyncThunk(
  "emailManager/getEmailsByQuery",
  async ({ userId, email, password, query, tokenGpt, logs, ftpData }) => {
    try {
      console.log("EMAIL FETCH REQUEST:", { userId, email, query, ftpData });

      const token = localStorage.getItem("token");
      // Call your backend endpoint for fetching emails
      const res = await apiBackend.post(
        "/emailManager/getEmailsByQuery",
        { userId, email, password, query, tokenGpt, logs, ftpData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your token
          },
        }
      );

      console.log("EMAIL FETCH RESPONSE:", res.data);
      return res.data; // Return the email data
    } catch (error) {
      console.error("Error in getEmailsByQuery action:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch emails");
    }
  }
);

export const createAccount = createAsyncThunk(
  "emailManager/createAccount",
  async ({ nombre, email, password, role }) => {
    console.log("data from createAccount", { nombre, email, password, role });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/emailManager/createAccount`,
        { nombre, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error creating account:", error);
    }
  }
);

export const loginToManager = createAsyncThunk(
  "emailManager/loginToManager",
  async ({ email, password }) => {
    console.log("Data from loginToManager action:", { email, password });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/emailManager/loginToManager`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error during login:", error);
      throw new Error("Login failed");
    }
  }
);

export const getAllClients = createAsyncThunk(
  "emailManager/getAllClients",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(`/emailManager/getAllClients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log("Error fetching clients:", error);
      throw new Error("Failed to fetch clients");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "emailManager/getAllUsers",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(`/emailManager/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
);

export const addNewClient = createAsyncThunk(
  "emailManager/addNewClient",
  async ({ clientData }) => {
    console.log("Adding client with data:", clientData);
    console.log("APIBACKEND", apiBackend);
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/emailManager/addNewClient`,
        { clientData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error adding new client:", error);
      throw new Error("Failed to add new client");
    }
  }
);

export const deleteClient = createAsyncThunk(
  "emailManager/deleteClient",
  async ({ clientId }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.delete(`/emailManager/deleteClient`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { clientId },
      });
      return res.data;
    } catch (error) {
      console.log("Error deleting client:", error);
      throw new Error("Failed to delete client");
    }
  }
);

export const updateClient = createAsyncThunk(
  "emailManager/updateClient",
  async ({ clientId, toUpdate }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/emailManager/updateClient`,
        { clientId, toUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error updating client:", error);
      throw new Error("Failed to update client");
    }
  }
);

export const updateUser = createAsyncThunk(
  "emailManager/updateUser",
  async ({ userId, toUpdate }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/emailManager/updateUser`,
        { userId, toUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }
);

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

export const sendOTP = createAsyncThunk(
  "emailManager/send-otp",
  async ({ email, language }, { rejectWithValue }) => {
    console.log("Sending OTP to:", email);
    try {
      const res = await apiBackend.post(`/emailManager/send-otp`, {
        email,
        language,
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "emailManager/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log("Verifying OTP for:", email);
    try {
      const res = await apiBackend.post(`/emailManager/verify-otp`, {
        email,
        otp,
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Failed to verify OTP");
    }
  }
);
