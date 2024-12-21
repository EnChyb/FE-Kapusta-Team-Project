// ======= DEVELOPMENT ONLY - REMOVE BEFORE PRODUCTION =======
// Set to true to bypass backend authentication and API calls
export const DEV_MODE = false;

// Mock data structure matching backend responses
export const DEV_MOCK_DATA = {
  // User info and balance
  user: {
    email: "dev@example.com",
    balance: 950,
    avatar: null,
  },

  // Transactions
  transactions: {
    // Income transactions
    income: [
      {
        _id: "mock-income-1",
        date: new Date().toISOString(),
        description: "Monthly Salary",
        category: "Salary",
        amount: 1000,
        owner: "dev@example.com",
      },
    ],
    // Expense transactions
    expense: [
      {
        _id: "mock-expense-1",
        date: new Date().toISOString(),
        description: "Groceries",
        category: "Products",
        amount: 50,
        owner: "dev@example.com",
      },
    ],
  },

  // Categories statistics
  categories: {
    income: [
      { category: "Salary", total: 1000 },
      { category: "Bonus", total: 0 },
    ],
    expense: [
      { category: "Products", total: 50 },
      { category: "Transport", total: 0 },
      { category: "Health", total: 0 },
      { category: "Alcohol", total: 0 },
      { category: "Entertainment", total: 0 },
      { category: "Housing", total: 0 },
      { category: "Technique", total: 0 },
      { category: "Communal, communication", total: 0 },
      { category: "Sports, hobbies", total: 0 },
      { category: "Other", total: 0 },
    ],
  },

  // Period data for reports
  periodData: {
    expenses: [],
    incomes: [],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
};

// Mock transaction ID counter (as an object to make it mutable)
export const mockIds = {
  current: 1000,
};
