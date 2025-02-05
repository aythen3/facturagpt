import { createSlice } from "@reduxjs/toolkit";
import {
  loginToManager,
  updateAccount,
  getAllAccounts,
  deleteAccount
} from "../actions/user";

const userSlices = createSlice({
  name: "user",
  initialState: {
    user: null,
    allAccounts: [],
    updatingAccountLoading: false,
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

      // GET ALL USERS

      .addCase(getAllAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.allAccounts = action.payload;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })


      // USER UPDATE
      .addCase(updateAccount.pending, (state) => {
        state.updatingAccountLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        console.log("action.payload from updateUser", action.payload);
        state.updatingAccountLoading = false;
        if (action.payload?.id === state.user?.id) {
          state.user = action.payload;
        } else {
          state.allAccounts = state.allAccounts.map((account) => {
            if (account.id === action.payload.id) {
              return action.payload;
            }
            return account;
          });
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.updatingAccountLoading = false;
      })

      // USER DELETE
      // .addCase(deleteAccount.pending, (state) => {
      //   // state.deletingAccountLoading = true;
      //   // console.log("action.payload from deleteAccount", action.payload)
      //   // state.allAccounts = state.allAccounts.filter(account => account.id !== action.payload.id)
      // })

      .addCase(deleteAccount.fulfilled, (state, action) => {
        console.log("action.payload from deleteAccount", action.payload)
        state.allAccounts = state.allAccounts.filter(account => account.id !== action.payload.id)
      })
  },
});

export const { setuser } = userSlices.actions;

export default userSlices.reducer;

