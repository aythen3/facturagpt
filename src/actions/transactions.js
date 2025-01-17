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

export const deleteTransactions = createAsyncThunk(
  "transactions/deleteTransactions",
  async ({ transactionsIds }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiBackend.post(
        "/transactions/deleteTransacions",
        { transactionsIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // Retornar datos de la respuesta del servidor
    } catch (error) {
      console.error("Error deleting transactions:", error);

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
