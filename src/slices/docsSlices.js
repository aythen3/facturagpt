import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProductFromDocs,
  deleteDocs,
  getAllDocsByClient,
  getOneDocsById,
} from "../actions/docs";

const docsSlices = createSlice({
  name: "docs",
  initialState: {
    docsByClient: [],
    docByClient: {},
    loading: false,
    error: false,
  },
  reducers: {
    setDoc: (state, action) => {
      state.docByClient = action.payload;
    },
    clearDoc: (state) => {
      state.docByClient = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // ALL TRANSACTIONS BY CLIENT
      .addCase(getAllDocsByClient.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getAllDocsByClient.fulfilled, (state, action) => {
        // state.loading = false;
        state.docsByClient =
          action.payload?.databases?.matchingDocuments;
      })
      .addCase(getAllDocsByClient.rejected, (state, action) => {
        state.error = action.payload;
        // state.loading = false;
      })

      // DELETE DOCUMENT/S
      .addCase(deleteDocs.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDocs.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDocs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE PRODUCT FROM DOCUMENT
      .addCase(deleteProductFromDocs.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductFromDocs.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProductFromDocs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET ONE DOCUMENT BY ID
      .addCase(getOneDocsById.pending, (state) => {})
      .addCase(getOneDocsById.fulfilled, (state, action) => {
        state.docByClient = action.payload?.matchingDocuments?.[0];
      })
      .addCase(getOneDocsById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setDoc, clearDoc } = docsSlices.actions;

export default docsSlices.reducer;
