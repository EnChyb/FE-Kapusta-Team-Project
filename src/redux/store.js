import balanceReducer from "./balance/balanceReducer";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
export const store = configureStore({
	reducer: {
		user: userReducer,
		balance: balanceReducer,
	},
});
