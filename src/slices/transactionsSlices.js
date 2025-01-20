import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProductFromTransaction,
  deleteTransactions,
  getAllTransactionsByClient,
  getOneTransactionById,
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
    clearTransaction: (state) => {
      state.transactionByClient = {};
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

      // DELETE TRANSACTION/S
      .addCase(deleteTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE PRODUCT FROM TRANSACTION
      .addCase(deleteProductFromTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductFromTransaction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProductFromTransaction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET ONE TRANSACTION BY ID
      .addCase(getOneTransactionById.pending, (state) => {})
      .addCase(getOneTransactionById.fulfilled, (state, action) => {
        state.transactionByClient = action.payload?.matchingDocuments?.[0];
      })
      .addCase(getOneTransactionById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setTransaction, clearTransaction } = transactionsSlices.actions;

export default transactionsSlices.reducer;
