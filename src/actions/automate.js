import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


// -------------------------------
export const goAutomate = createAsyncThunk(
  "automate/goAutomate",
  async ({ userId, email, password, query, tokenGpt, /*logs,*/ ftpData, file }) => {
    try {
      console.log("EMAIL FETCH REQUEST:", { userId, email, query, ftpData });
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      formData.append('userId', userId);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('query', query);
      formData.append('tokenGpt', tokenGpt);
      formData.append('ftpData', JSON.stringify(ftpData));
      if (file) {
        formData.append('file', file);
      }

      const res = await apiBackend.post(
        "/automate/go",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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


export const createAutomation = createAsyncThunk(
  "automate/createAutomation",
  async ({ userId, email, automationData }) => {
    console.log("data from createAutomation", {
      userId,
      email,
      automationData,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/automate/createAutomation`,
        { userId, email, automationData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error creating automation:", error);

      if(error.response.status === 501) logout()

    }
  }
);

export const getAllUserAutomations = createAsyncThunk(
  "automate/getAllUserAutomations",
  async ({ userId }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(
        `/automate/getAllUserAutomations/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error fetching user automations:", error);

      if(error.response.status === 501) logout()

      throw error;
    }
  }
);

export const updateAutomation = createAsyncThunk(
  "automate/updateAutomation",
  async ({ automationId, toUpdate, userId }) => {
    console.log(
      "Updating automation with ID:",
      automationId,
      "with data:",
      toUpdate
    );
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/automate/updateAutomation/${automationId}`,
        { ...toUpdate, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error updating automation:", error);

      if(error.response.status === 501) logout()
      throw error;
    }
  }
);

export const deleteAutomation = createAsyncThunk(
  "automate/deleteAutomation",
  async ({ automationId, userId }) => {
    console.log("Deleting automation with ID:", automationId);
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.delete(
        `/automate/deleteAutomation/${automationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { userId },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error deleting automation:", error);

      if(error.response.status === 501) logout()
      throw error;
    }
  }
);
