// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const changeBalance = createAsyncThunk(
// 	"balance/changeBalance",
// 	async ({ newBalance }, thunkAPI) => {
// 		try {
// 			const response = await axios.patch("/api/balance", {
// 				balance: newBalance,
// 			});
// 			return response.data;
// 		} catch (error) {
// 			return thunkAPI.rejectWithValue(error.message);
// 		}
// 	}
// );


import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeBalanceApi } from "../../services/balanceApi";

export const changeBalance = createAsyncThunk(
  "balance/changeBalance",
  async ({ newBalance }, thunkAPI) => {
    try {
      const data = { balance: newBalance };
      const response = await changeBalanceApi(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
