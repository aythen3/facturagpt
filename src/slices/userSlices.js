import { createSlice } from "@reduxjs/toolkit";
import { loginToManager } from "../actions/user";

const userSlices = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginToManager.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginToManager.fulfilled, (state, action) => {
        console.log("action.payload from loginToManager", action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginToManager.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setuser } = userSlices.actions;

export default userSlices.reducer;
