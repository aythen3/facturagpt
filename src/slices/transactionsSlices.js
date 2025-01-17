import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTransactions,
  getAllTransactionsByClient,
} from "../actions/transactions";

const transactionsSlices = createSlice({
  name: "transactions",
  initialState: {
    transactionsByClient: [],
    transactionByClient: {},
    loading: false,
    error: false,
  },
  reducers: {
    setTransaction: (state, action) => {
      state.transactionByClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // ALL TRANSACTIONS BY CLIENT
      .addCase(getAllTransactionsByClient.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getAllTransactionsByClient.fulfilled, (state, action) => {
        // state.loading = false;
        state.transactionsByClient =
          action.payload?.databases?.matchingDocuments;
      })
      .addCase(getAllTransactionsByClient.rejected, (state, action) => {
        state.error = action.payload;
        // state.loading = false;
      })

      // DETE TRANSACTIOn/S
      .addCase(deleteTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setTransaction } = transactionsSlices.actions;

export default transactionsSlices.reducer;
