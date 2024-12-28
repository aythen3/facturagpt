import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchLeads = createAsyncThunk(
  "reseller/fetchLeads",
  async ({query, category}) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(`/reseller/leads`, {
        params: {
            query,
            category
        },
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

export const saveLeads = createAsyncThunk(
  "reseller/leads",
  async ({ leads }) => {
    console.log('!!!!!!!!', leads)
    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.post(
        `/reseller/leads`,
        { leads },
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

