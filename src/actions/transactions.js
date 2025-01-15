import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async ({ transactionData, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiBackend.post(
        "/transactions/createTransaction",
        { transactionData, userId },
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
