import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTransactionsByClient = createAsyncThunk(
  "transactions/alltransactionsByClient",
  async ({ idsEmails }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiBackend.post(
        "/transactions/alltransactionsByClient",
        { idsEmails },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error saving transactions:", error);

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
