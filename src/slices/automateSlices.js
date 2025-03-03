import { createSlice } from "@reduxjs/toolkit";
import {
  createAutomation,
  deleteAutomation,
  getAllUserAutomations,
  updateAutomation,
} from "../actions/automate";

const automationsSlices = createSlice({
  name: "automate",
  initialState: {
    userAutomations: [],
  },
  reducers: {
    setUserAutomations: (state, action) => {
      state.userAutomations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE AUTOMATION
      .addCase(createAutomation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAutomation.fulfilled, (state, action) => {
        console.log("action.payload from createAutomation", action.payload);
        state.loading = false;
        state.userAutomations = action.payload;
      })
      .addCase(createAutomation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET ALL USER AUTOMATIONS
      .addCase(getAllUserAutomations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserAutomations.fulfilled, (state, action) => {
        state.loading = false;
        state.userAutomations = action.payload;
      })
      .addCase(getAllUserAutomations.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // UPDATE USER AUTOMATION
      .addCase(updateAutomation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAutomation.fulfilled, (state, action) => {
        console.log("action.payload from updateAutomation", action.payload);
        state.loading = false;
        state.userAutomations = action.payload;
      })
      .addCase(updateAutomation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE USER AUTOMATION
      .addCase(deleteAutomation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAutomation.fulfilled, (state, action) => {
        console.log("action.payload from deleteAutomation", action.payload);
        state.loading = false;
        state.userAutomations = action.payload;
      })
      .addCase(deleteAutomation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setUserAutomations } = automationsSlices.actions;

export default automationsSlices.reducer;
