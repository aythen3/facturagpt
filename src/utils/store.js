import { configureStore } from "@reduxjs/toolkit";
import emailManagerReducer from "../slices/emailManagerSlices";
import menuAutomateSlices from "../slices/menuAutomateSlices";
import automateSlices from "../slices/automateSlices";
import scalewaySlices from "../slices/scalewaySlices";
import clientsSlices from "../slices/clientsSlices";
import userSlices from "../slices/userSlices";
import transactionsSlices from "../slices/transactionsSlices";
import chatSlices from "../slices/chatSlices";

const store = configureStore({
  reducer: {
    // emailManager: emailManagerReducer,
    menuAutomate: menuAutomateSlices,
    automate: automateSlices,
    scaleway: scalewaySlices,
    clients: clientsSlices,
    user: userSlices,
    chat: chatSlices,
    transactions: transactionsSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
