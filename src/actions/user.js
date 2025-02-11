import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const sendEmail =
createAsyncThunk('user/sendEmail',
  async ({ id, email }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')

      const resp = await apiBackend.post(
        `/user/send`,
        { email },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );

      return resp.data;
    } catch (error) {
      throw error;
    }
  }
);




// -------------------------------
export const getEmailsByQuery = createAsyncThunk(
  "user/getEmailsByQuery",
  async ({ userId, email, password, query, tokenGpt, /*logs,*/ ftpData }) => {
    try {
      console.log("EMAIL FETCH REQUEST:", { userId, email, query, ftpData });

      const token = localStorage.getItem("token");
      // Call your backend endpoint for fetching emails
      const res = await apiBackend.post(
        "/user/getEmailsByQuery",
        { userId, email, password, query, tokenGpt, /*logs,*/ ftpData },
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
  "user/createAccount",
  // async ({ nombre, email, password }) => {
  // async ({ nombre, email, password }) => {
  async (clientData) => {
    // console.log("data from createAccount", { nombre, email, password });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/user/createAccount`,
        { ...clientData },
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

export const getAllAccounts = createAsyncThunk("user/getAllAccounts", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await apiBackend.get(`/user/getAllAccounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("res.data from getAllAccounts", res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching accounts:", error);
    throw new Error("Failed to fetch accounts");
  }
});

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

export const updateAccount = createAsyncThunk(
  "user/updateAccount",
  async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/user/updateAccount`,
        { userData: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error updating account:", error);
      throw new Error("Failed to update account");
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async ({ id }) => {
    console.log("id from deleteAccount")
    try {
      console.log("id from deleteAccount", id)
      // console.log("id from deleteAccount", id)
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/user/deleteAccount`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("res.data from deleteAccount", res.data)
      return res.data;
    } catch (error) {
      console.log("Error updating account:", error);
      throw new Error("Failed to update account");
    }
  }
);

export const updateAccountPassword = createAsyncThunk(
  "user/updateAccountPassword",
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


export const sendRecoveryCode = createAsyncThunk(
  "emailManager/send-recovery-code",
  async ({ email, language }, { rejectWithValue }) => {
    console.log("Sending recovery code to:", email);
    try {
      const res = await apiBackend.post(`/emailManager/send-recovery-code`, {
        email,
        language,
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error sending recovery code:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Failed to send recovery code"
      );
    }
  }
);



export const verifyRecoveryCode = createAsyncThunk(
  "emailManager/verify-recovery-code",
  async ({ email, recoveryCode }, { rejectWithValue }) => {
    console.log("Verifying recovery code for:", email);
    try {
      const res = await apiBackend.post(`/emailManager/verify-recovery-code`, {
        email,
        recoveryCode,
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error verifying recovery code:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Failed to verify recovery code"
      );
    }
  }
);


// Acción para enviar el correo
export const sendEmailNewsletter = createAsyncThunk(
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



// Stripe para hacer pagos


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
        `/user/create-payment-intent`,
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
        `/user/create-setup-intent`,
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
