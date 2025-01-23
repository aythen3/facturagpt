import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAccount = createAsyncThunk(
  "user/createAccount",
  async ({ nombre, email, password }) => {
    console.log("data from createAccount", { nombre, email, password });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/user/createAccount`,
        { nombre, email, password },
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
  "user/loginToManager",
  async ({ email, password, accessToken }) => {
    console.log("Data from loginToManager action:", {
      email,
      password,
      accessToken,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/user/loginToManager`,
        { email, password, accessToken },
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
  "user/getAllClients",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(`/user/getAllClients`, {
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

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await apiBackend.get(`/user/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
});

export const addNewClient = createAsyncThunk(
  "user/addNewClient",
  async ({ clientData }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/user/addNewClient`,
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
  "user/deleteClient",
  async ({ clientId }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.delete(`/user/deleteClient`, {
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
  "user/updateClient",
  async ({ clientId, toUpdate }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/user/updateClient`,
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
  "user/updateUser",
  async ({ userId, toUpdate }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/user/updateUser`,
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

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async ({ email, newPassword }) => {
    console.log("updating password (ACTION)", { email, newPassword });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/user/updateUserPassword`,
        { email, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error updating user password:", error);
      throw new Error("Failed to update user password");
    }
  }
);

export const sendOTP = createAsyncThunk(
  "user/send-otp",
  async ({ nombre, email, language }, { rejectWithValue }) => {
    console.log("Sending OTP to:", email);
    try {
      const res = await apiBackend.post(`/user/send-otp`, {
        nombre,
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
  "user/verify-otp",
  async ({ nombre, email, otp }, { rejectWithValue }) => {
    console.log("Verifying OTP for:", email);

    try {
      const res = await apiBackend.post(`/user/verify-otp`, {
        nombre,
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

// Acción para enviar el correo
export const sendEmail = createAsyncThunk(
  "user/newsletter",
  async ({ name, email, message }, { rejectWithValue }) => {
    console.log("Sending email with:", { name, email, message });
    try {
      const res = await apiBackend.post(`/user/newsletter`, {
        name,
        email,
        message,
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Failed to send email");
    }
  }
);
