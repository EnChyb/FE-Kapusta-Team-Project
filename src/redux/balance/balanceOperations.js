import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeBalanceApi } from "../../services/balanceApi";
import { DEV_MODE } from "../../config/devConfig";

export const changeBalance = createAsyncThunk(
  "balance/changeBalance",
  async ({ newBalance }, thunkAPI) => {
    if (DEV_MODE) {
      console.warn(
        "⚠️ Using development bypass mode - REMOVE BEFORE PRODUCTION ⚠️"
      );
      return { balance: newBalance };
    }

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
