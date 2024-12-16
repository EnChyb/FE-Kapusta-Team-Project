import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../config/apiConfig";

export const changeBalance = createAsyncThunk(
	"balance/changeBalance",
	async ({ newBalance }, thunkAPI) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.patch(
				`${API_URL}/user/balance`,
				{ newBalance },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || "Failed to update balance"
			);
		}
	}
);
