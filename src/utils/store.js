import { configureStore } from "@reduxjs/toolkit";

import emailManagerReducer from "../slices/emailManagerSlices";
import menuAutomateSlices from "../slices/menuAutomateSlices";
import automationsSlices from "../slices/automationsSlices";
const store = configureStore({
  reducer: {
    emailManager: emailManagerReducer,
    menuAutomate: menuAutomateSlices,
    automations: automationsSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
