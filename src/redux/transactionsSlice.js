import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/apiConfig";

export const fetchIncome = createAsyncThunk(
  "transactions/fetchIncome",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/transaction/income`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Błąd pobierania danych");
    }
  }
);

export const fetchExpense = createAsyncThunk(
  "transactions/fetchExpense",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/transaction/expense`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Błąd pobierania danych");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    income: [],
    expense: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
