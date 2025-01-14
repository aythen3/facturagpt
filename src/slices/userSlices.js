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
        if (action.payload.success && action.payload.account) {
          const { id, email, role } = action.payload.account;
          state.user = { id, email, role };
        }
      })
      .addCase(loginToManager.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setuser } = userSlices.actions;

export default userSlices.reducer;
