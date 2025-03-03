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
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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
      if(error.response.status === 501) logout()

    }
  }
);

export const createClients = createAsyncThunk(
  "clients/createClients",
  async ({ userId, clientsData }, { rejectWithValue }) => {


    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

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

      if(error.response.status === 501) logout()

      return rejectWithValue(error.response?.data || "Error inesperado");
    }
  }
);

export const getAllClients = createAsyncThunk(
  "clients/getAllClients",
  async ({ userId }) => {
    console.log("Fetching clients for userId (REDUX):", userId);
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.get(`/clients/getAllClients/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      console.log("Error fetching user automations:", error);

      if(error.response.status === 501) logout()
      throw error;
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ userID, id, clientData }) => {
    console.log("Updating client with ID:", id, "with data:", clientData);
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;
      
      const res = await apiBackend.put(
        `/clients/updateClient/${id}`,
        { userID, id, clientData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error updating client:", error);

      if(error.response.status === 501) logout()
      throw error;
    }
  }
);

export const getOneClient = createAsyncThunk(
  "/getClient/client",
  async ({ userId, clientId }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.get(
        `/clients/getClient/${clientId}/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error get client:", error);

      if(error.response.status === 501) logout()
      throw error;
    }
  }
);

export const deleteClients = createAsyncThunk(
  "clients/deleteClients",
  async ({ clientIds, userId }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.delete(`/clients/deleteClients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { clientIds, userId },
      });
      return res.data;
    } catch (error) {
      console.error("Error deleting clients:", error);
      
      if(error.response.status === 501) logout()
      throw error;
    }
  }
);
