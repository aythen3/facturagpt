import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAutomation = createAsyncThunk(
  "automations/createAutomation",
  async ({ userId, email, automationData }) => {
    console.log("data from createAutomation", {
      userId,
      email,
      automationData,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/automations/createAutomation`,
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
  "automations/getAllUserAutomations",
  async ({ userId }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(
        `/automations/getAllUserAutomations/${userId}`,
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
  "automations/updateAutomation",
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
        `/automations/updateAutomation/${automationId}`,
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
  "automations/deleteAutomation",
  async ({ automationId, userId }) => {
    console.log("Deleting automation with ID:", automationId);
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.delete(
        `/automations/deleteAutomation/${automationId}`,
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
