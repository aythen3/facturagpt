import { createSlice } from "@reduxjs/toolkit";
import { createClient, getAllUserClients } from "../actions/clients";
// import {
//   createAutomation,
//   deleteAutomation,
//   getAllUserAutomations,
//   updateAutomation,
// } from "../actions/automations";

const clientsSlices = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: false,
  },
  reducers: {},
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
      .addCase(getAllUserClients.pending, (state) => {
        state.error = false;
      })
      .addCase(getAllUserClients.fulfilled, (state, action) => {
        console.log("action.payload from getAllUserClients", action.payload);
        // state.loading = false;
        state.error = false;
        state.clients = action.payload;
      })
      .addCase(getAllUserClients.rejected, (state, action) => {
        state.error = true;
        // state.loading = false;
      });

    // UPDATE USER AUTOMATION
    //   .addCase(updateAutomation.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateAutomation.fulfilled, (state, action) => {
    //     console.log("action.payload from updateAutomation", action.payload);
    //     state.loading = false;
    //     state.userAutomations = action.payload;
    //   })
    //   .addCase(updateAutomation.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })

    // DELETE USER AUTOMATION
    //   .addCase(deleteAutomation.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteAutomation.fulfilled, (state, action) => {
    //     console.log("action.payload from deleteAutomation", action.payload);
    //     state.loading = false;
    //     state.userAutomations = action.payload;
    //   })
    //   .addCase(deleteAutomation.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   });
  },
});

export const {} = clientsSlices.actions;

export default clientsSlices.reducer;
