import apiBackend from "@src/apiBackend.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addDoc = createAsyncThunk(
  "docs/addDoc",
  async ({ doc }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        "/docs/addDocs",
        { doc },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error saving docs:", error);

      if (error.response.status === 501) logout()


      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getAllDocsByClient = createAsyncThunk(
  "docs/allDocsByClient",
  async ({ idsEmails }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        "/docs/alldocsByClient",
        { idsEmails },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error saving docs:", error);

      if (error.response.status === 501) logout()


      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteDocs = createAsyncThunk(
  "docs/deleteDocs",
  async ({ docsIds }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        "/docs/deleteDocs",
        { docsIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // Retornar datos de la respuesta del servidor
    } catch (error) {
      console.error("Error deleting docs:", error);

      if (error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const getOneDocsById = createAsyncThunk(
  "docs/getOneDocs", // Nombre de la acción
  async ({ docId }, { rejectWithValue }) => {
    console.log("IDDDDD ACTION ----------", docId);

    try {
      // Obtener el token de localStorage para la autenticación
      // const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      // Realizar la solicitud POST al servidor con los datos de la transacción
      const res = await apiBackend.get(
        `/docs/getOneDocs/${docId}`, // Endpoint

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




export const deleteProductFromDocs = createAsyncThunk(
  "docs/deleteProductFromDocs",
  async ({ docId, productRef }, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        "/docs/deleteProductFromDocs",
        { docId, productRef },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // Retornar datos de la respuesta del servidor
    } catch (error) {
      console.error("Error deleting docs:", error);

      if (error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);



export const getAllProducts = createAsyncThunk(
  "docs/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      const token = userJson.accessToken;

      const res = await apiBackend.post(
        "/docs/getAllProducts",
        { },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data; // Retornar datos de la respuesta del servidor
    } catch (error) {
      console.error("Error deleting docs:", error);

      if (error.response.status === 501) logout()

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

