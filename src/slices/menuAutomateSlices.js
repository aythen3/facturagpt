import { createSlice } from "@reduxjs/toolkit";
import {
  addNewClient,
  createAccount,
  deleteClient,
  getAllClients,
  getAllUsers,
  loginToManager,
  updateClient,
  updateUser,
} from "../actions/emailManager";

const menuAutomateSlices = createSlice({
  name: "menuAutomate",
  initialState: {
    showAutomate: "general",
  },
  reducers: {
    setShowAutomate: (state, action) => {
      state.showAutomate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setShowAutomate } = menuAutomateSlices.actions;

export default menuAutomateSlices.reducer;
