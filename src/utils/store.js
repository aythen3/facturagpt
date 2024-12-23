import { configureStore } from "@reduxjs/toolkit";

import emailManagerReducer from "../slices/emailManagerSlices";

const store = configureStore({
  reducer: {
    emailManager: emailManagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
