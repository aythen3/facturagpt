import { configureStore } from "@reduxjs/toolkit";
import emailManagerReducer from "../slices/emailManagerSlices";
import menuAutomateSlices from "../slices/menuAutomateSlices";
import automationsSlices from "../slices/automationsSlices";
import scalewaySlices from "../slices/scalewaySlices";
import clientsSlices from "../slices/clientsSlices";
import userSlices from "../slices/userSlices";
import transactionsSlices from "../slices/transactionsSlices";

const store = configureStore({
  reducer: {
    // emailManager: emailManagerReducer,
    menuAutomate: menuAutomateSlices,
    automations: automationsSlices,
    scaleway: scalewaySlices,
    clients: clientsSlices,
    user: userSlices,
    transactions: transactionsSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
