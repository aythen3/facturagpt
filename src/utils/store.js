import { configureStore } from "@reduxjs/toolkit";

import emailManagerReducer from "../slices/emailManagerSlices";
import menuAutomateSlices from "../slices/menuAutomateSlices";
import automationsSlices from "../slices/automationsSlices";
import clientsSlices from "../slices/clientsSlices";
import userSlices from "../slices/userSlices";
const store = configureStore({
  reducer: {
    emailManager: emailManagerReducer,
    menuAutomate: menuAutomateSlices,
    automations: automationsSlices,
    clients: clientsSlices,
    user: userSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
