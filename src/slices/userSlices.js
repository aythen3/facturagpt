import { createSlice } from "@reduxjs/toolkit";
import { loginToManager, updateUser } from "../actions/user";

const userSlices = createSlice({
  name: "user",
  initialState: {
    user: null,
    allUsers: [],
    updatingUserLoading: false,
    loginLoading: false,
    error: false,
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
        state.loginLoading = true;
      })
      .addCase(loginToManager.fulfilled, (state, action) => {
        console.log("action.payload from loginToManager", action.payload);
        state.loginLoading = false;
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(loginToManager.rejected, (state, action) => {
        state.error = action.payload;
        state.loginLoading = false;
      })
      // USER UPDATE
      .addCase(updateUser.pending, (state) => {
        state.updatingUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("action.payload from updateUser", action.payload);
        state.updatingUserLoading = false;
        if (action.payload?.id === state.user?.id) {
          state.user = action.payload;
        } else {
          state.allUsers = state.allUsers.map((user) => {
            if (user.id === action.payload.id) {
              return action.payload;
            }
            return user;
          });
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.updatingUserLoading = false;
      });
  },
});

export const { setuser } = userSlices.actions;

export default userSlices.reducer;
