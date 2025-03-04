import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTransactionsByClient = createAsyncThunk(
  "transactions/alltransactionsByClient",
  async ({ idsEmails }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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

      if (error.response.status === 501) logout()


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
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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

      if (error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteProductFromTransaction = createAsyncThunk(
  "transactions/deleteProductFromTransacion",
  async ({ transactionId, productRef }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        "/transactions/deleteProductFromTransacion",
        { transactionId, productRef },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // Retornar datos de la respuesta del servidor
    } catch (error) {
      console.error("Error deleting transactions:", error);

      if (error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getOneTransactionById = createAsyncThunk(
  "transactions/getOneTransaction/", // Nombre de la acción
  async ({ transactionId }, { rejectWithValue }) => {
    console.log("IDDDDD ACTION ----------", transactionId);

    try {
      // Obtener el token de localStorage para la autenticación
      // const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      // Realizar la solicitud POST al servidor con los datos de la transacción
      const res = await apiBackend.get(
        `/transactions/getOneTransaction/${transactionId}`, // Endpoint

        {
          headers: { Authorization: `Bearer ${token}` }, // Enviar el token como parte de los encabezados
        }
      );

      // Retornar los datos de la respuesta si la solicitud es exitosa
      return res.data;
    } catch (error) {

      if (error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
