import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createClient = createAsyncThunk(
  "clients/createClient",
  async ({ userId, email, clientData }) => {
    console.log("data from createClient", {
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
export const createClients = createAsyncThunk(
  "clients/createClients",
  async ({ userId, clientsData }, { rejectWithValue }) => {
    console.log("Data from createClients Thunk", {
      userId,
      clientsData,
    });

    try {
      const token = localStorage.getItem("token");

      // Realiza la solicitud POST a la API
      const res = await apiBackend.post(
        `/clients/createClients`, // Ruta de la API en Next.js
        { userId, clientsData },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Autenticación con el token
          },
        }
      );

      // Verifica que la respuesta contenga datos válidos
      if (!res.data) {
        throw new Error("El servidor no devolvió datos válidos.");
      }

      // Devuelve los datos recibidos como `payload`
      return res.data;
    } catch (error) {
      console.error("Error creating clients:", error);
      return rejectWithValue(error.response?.data || "Error inesperado");
    }
  }
);

export const getAllUserClients = createAsyncThunk(
  "clients/getAllUserClients",
  async ({ userId }) => {
    console.log("Fetching clients for userId (REDUX):", userId);
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
      console.log("Error updating client:", error);
      throw error;
    }
  }
);

export const getOneClient = createAsyncThunk(
  "/getClient/client",
  async (clientId) => {
    console.log("CLIENTID EN ACTION", clientId);

    try {
      const token = localStorage.getItem("token");
      const res = await apiBackend.get(
        `/clients/getClient/${clientId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error get client:", error);
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
