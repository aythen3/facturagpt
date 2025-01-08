import { configureStore } from "@reduxjs/toolkit";

import emailManagerReducer from "../slices/emailManagerSlices";
import menuAutomateSlices from "../slices/menuAutomateSlices";
const store = configureStore({
  reducer: {
    emailManager: emailManagerReducer,
    menuAutomate: menuAutomateSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
