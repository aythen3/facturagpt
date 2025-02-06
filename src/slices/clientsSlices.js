import { createSlice } from "@reduxjs/toolkit";
import {
  createClient,
  deleteClients,
  getAllClients,
  getOneClient,
  updateClient,
} from "../actions/clients";

const clientsSlices = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    client: null,
    loading: false,
    error: false,
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    clearClient: (state) => {
      state.client = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE AUTOMATION
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET ALL USER CLIENTS
      .addCase(getAllClients.pending, (state) => {
        state.error = false;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        console.log("action.payload from getAllUserClients", action.payload);
        // state.loading = false;
        state.error = false;
        state.clients = action.payload;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.error = true;
        // state.loading = false;
      })

      // UPDATE CLIENT
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE USER CLIENT
      .addCase(deleteClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClients.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteClients.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //GET ONE CLIENT
      .addCase(getOneClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneClient.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(getOneClient.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setClient, clearClient } = clientsSlices.actions;

export default clientsSlices.reducer;
