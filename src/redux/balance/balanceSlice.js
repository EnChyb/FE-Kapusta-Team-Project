import { createSlice } from "@reduxjs/toolkit";
import { changeBalance } from "./balanceOperations";

const balanceSlice = createSlice({
	name: "balance",
	initialState: { balance: 0, loading: false, error: null },
	reducers: {
		updateBalance(state, action) {
			state.balance = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(changeBalance.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(changeBalance.fulfilled, (state, action) => {
				state.loading = false;
				state.balance = action.payload.newBalance;
			})
			.addCase(changeBalance.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
