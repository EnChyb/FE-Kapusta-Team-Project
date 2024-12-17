import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import balanceReducer from "./balance/balanceReducer";
import transactionsReducer from "./transactionsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    balance: balanceReducer,
    transactions: transactionsReducer,
  },
});
