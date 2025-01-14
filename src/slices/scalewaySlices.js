import { createSlice } from "@reduxjs/toolkit";
import { getUserFiles, uploadFiles } from "../actions/scaleway";

const scalewaySlices = createSlice({
  name: "scaleway",
  initialState: {
    userFiles: [],
    currentPath: null,
  },
  reducers: {
    setUserFiles: (state, action) => {
      state.userFiles = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // UPLOAD FILE
      // .addCase(uploadFiles.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(uploadFiles.fulfilled, (state, action) => {
      //   console.log("action.payload from uploadFiles", action.payload);
      //   state.loading = false;
      //   state.userFiles = action.payload;
      // })
      // .addCase(uploadFiles.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.loading = false;
      // })

      // GET ALL USER FILES
      .addCase(getUserFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserFiles.fulfilled, (state, action) => {
        console.log("action.payload from getUserFiles", action.payload);
        state.loading = false;
        state.userFiles = action.payload;
      })
      .addCase(getUserFiles.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setUserFiles, setCurrentPath } = scalewaySlices.actions;

export default scalewaySlices.reducer;
