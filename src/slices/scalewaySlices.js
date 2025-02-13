import { createSlice } from "@reduxjs/toolkit";
import { createFolder, getUserFiles, uploadFiles } from "../actions/scaleway";

const scalewaySlices = createSlice({
  name: "scaleway",
  initialState: {
    getFilesLoading: false,
    uploadingFilesLoading: false,
    createFolderLoading: false,
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
      .addCase(uploadFiles.pending, (state) => {
        state.uploadingFilesLoading = true;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        const newFiles = action.payload;
        newFiles.forEach((file) => {
          const exists = state.userFiles.some(
            (existingFile) => existingFile.Key === file.Key
          );
          if (!exists) {
            state.userFiles.push(file);
          }
        });
        state.uploadingFilesLoading = false;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.error = action.payload;
        state.uploadingFilesLoading = false;
      })

      // GET ALL USER FILES
      .addCase(getUserFiles.pending, (state) => {
        state.getFilesLoading = true;
      })
      .addCase(getUserFiles.fulfilled, (state, action) => {
        state.getFilesLoading = false;
        state.userFiles = action.payload;
      })
      .addCase(getUserFiles.rejected, (state, action) => {
        state.error = action.payload;
        state.getFilesLoading = false;
      })
      // CREATE FOLDER
      .addCase(createFolder.pending, (state) => {
        state.createFolderLoading = true;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        console.log("ACTION.PAYLOAD FROM CREATE FOLDER", action.payload);
        const newFiles = action.payload;
        newFiles.forEach((file) => {
          const exists = state.userFiles.some(
            (existingFile) => existingFile.Key === file.Key
          );
          if (!exists) {
            state.userFiles.push(file);
          }
        });
        state.createFolderLoading = false;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.error = action.payload;
        state.createFolderLoading = false;
      });
  },
});

export const { setUserFiles, setCurrentPath } = scalewaySlices.actions;

export default scalewaySlices.reducer;
