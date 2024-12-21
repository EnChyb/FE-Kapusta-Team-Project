import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/apiConfig";
import { DEV_MODE, DEV_MOCK_DATA, mockIds } from "../config/devConfig";

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    if (DEV_MODE) {
      console.warn(
        "⚠️ Using development bypass mode - REMOVE BEFORE PRODUCTION ⚠️"
      );
      const newTransaction = {
        _id: `mock-${transactionData.type}-${mockIds.current++}`,
        owner: DEV_MOCK_DATA.user.email,
        ...transactionData,
      };

      // Update mock categories data
      const categoryIndex = DEV_MOCK_DATA.categories[
        transactionData.type
      ].findIndex((cat) => cat.category === transactionData.category);
      if (categoryIndex !== -1) {
        DEV_MOCK_DATA.categories[transactionData.type][categoryIndex].total +=
          transactionData.amount;
      }

      // Update mock transactions
      DEV_MOCK_DATA.transactions[transactionData.type].push(newTransaction);

      // Update mock balance
      if (transactionData.type === "income") {
        DEV_MOCK_DATA.user.balance += transactionData.amount;
      } else {
        DEV_MOCK_DATA.user.balance -= transactionData.amount;
      }

      return {
        type: transactionData.type,
        transaction: newTransaction,
      };
    }

    try {
      const endpoint = `${API_URL}/transaction/${transactionData.type}`;
      const response = await axios.post(
        endpoint,
        {
          date: transactionData.date,
          description: transactionData.description,
          category: transactionData.category,
          amount: transactionData.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return {
        type: transactionData.type,
        transaction: response.data[transactionData.type],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding transaction"
      );
    }
  }
);

export const fetchIncome = createAsyncThunk(
  "transactions/fetchIncome",
  async (_, { rejectWithValue }) => {
    if (DEV_MODE) {
      console.warn(
        "⚠️ Using development bypass mode - REMOVE BEFORE PRODUCTION ⚠️"
      );
      return DEV_MOCK_DATA.transactions.income;
    }

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
    if (DEV_MODE) {
      console.warn(
        "⚠️ Using development bypass mode - REMOVE BEFORE PRODUCTION ⚠️"
      );
      return DEV_MOCK_DATA.transactions.expense;
    }

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
    // Add transaction cases
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      if (action.payload.type === "expense") {
        state.expense.push(action.payload.transaction);
      } else if (action.payload.type === "income") {
        state.income.push(action.payload.transaction);
      }
    });
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
