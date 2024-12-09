import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const changeBalance = createAsyncThunk(
	"balance/changeBalance",
	async ({ newBalance }, thunkAPI) => {
		try {
			const response = await axios.patch("/api/balance", {
				balance: newBalance,
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
