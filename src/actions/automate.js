import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

// -------------------------------
export const goAutomate = createAsyncThunk(
  "automate/goAutomate",
  async ({
    userId,
    email,
    password,
    query,
    tokenGpt,
    /*logs,*/ ftpData,
    file,
  }) => {
    try {
      console.log("EMAIL FETCH REQUEST:", { userId, email, query, ftpData });
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("query", query);
      formData.append("tokenGpt", tokenGpt);
      formData.append("ftpData", JSON.stringify(ftpData));
      if (file) {
        formData.append("file", file);
      }

      const res = await apiBackend.post("/automate/go", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

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
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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

      if (error.response.status === 501) logout();
    }
  }
);

export const getAllUserAutomations = createAsyncThunk(
  "automate/getAllUserAutomations",
  async ({ userId }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.get(
        `/automate/getAllUserAutomations/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error fetching user automations:", error);

      if (error.response.status === 501) logout();

      throw error;
    }
  }
);

export const updateAutomation = createAsyncThunk(
  "automate/updateAutomation",
  async ({ automationId, toUpdate, userId }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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

      if (error.response.status === 501) logout();
      throw error;
    }
  }
);

export const deleteAutomation = createAsyncThunk(
  "automate/deleteAutomation",
  async ({ automationId, userId }) => {
    console.log("Deleting automation with ID:", automationId);
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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

      if (error.response.status === 501) logout();
      throw error;
    }
  }
);

// ------------------

export const addAuth = createAsyncThunk("automate/addAuth", async (data) => {
  try {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);
    const token = userJson.accessToken;

    const res = await apiBackend.post(`/automate/addAuth`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error creating automation:", error);

    if (error.response.status === 501) logout();
  }
});

export const getAuth = createAsyncThunk("automate/getAuth", async (type) => {
  try {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);
    const token = userJson.accessToken;

    const res = await apiBackend.get(`/automate/getAuth/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.log("Error fetching user automations:", error);

    if (error.response.status === 501) logout();

    throw error;
  }
});

export const deleteAuth = createAsyncThunk(
  "automate/deleteAuth",
  async ({ data }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.delete(`/automate/deleteAuth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {},
      });
      return res.data;
    } catch (error) {
      console.log("Error deleting automation:", error);

      if (error.response.status === 501) logout();
      throw error;
    }
  }
);

export const getUserAutomatiosByInputSearch = createAsyncThunk(
  "automate/getUserAutomatiosByInputSearch",
  async ({ userId, inputValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const userIdAndInputValue = { userId, inputValue, token };

      console.log("entro en getUserAutomatiosByInputSearch", userIdAndInputValue)

      const res = await apiBackend.post(
        "/automate/getAllUserAutomations/", userIdAndInputValue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log("res res res", res);

      return res.data;
    } catch (error) {
      console.log("Error fetching user automations:", error);

      if (error.response.status === 501) logout();

      throw error;
    }
  }
);
