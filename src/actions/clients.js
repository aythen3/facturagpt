import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createClient = createAsyncThunk(
  "clients/createClient",
  async ({ userId, email, clientData }) => {
    console.log("data from createAutomation", {
      userId,
      email,
      clientData,
    });
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/clients/createClient`,
        { userId, email, clientData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error creating client:", error);
    }
  }
);

export const getAllUserClients = createAsyncThunk(
  "clients/getAllUserClients",
  async ({ userId }) => {
    console.log("Fetching automations for userId (REDUX):", userId);
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(`/clients/getAllUserClients/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      console.log("Error fetching user automations:", error);
      throw error;
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ clientId, toUpdate, userId }) => {
    console.log("Updating client with ID:", clientId, "with data:", toUpdate);
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.put(
        `/clients/updateClient/${clientId}`,
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
      throw error;
    }
  }
);

export const deleteClients = createAsyncThunk(
  "clients/deleteClients",
  async ({ clientIds, userId }) => {
    console.log("Deleting clients with IDs:", clientIds);
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.delete(`/clients/deleteClients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { clientIds, userId },
      });
      return res.data;
    } catch (error) {
      console.error("Error deleting clients:", error);
      throw error;
    }
  }
);
