import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import API_URL from "../../api/apiConfig";
import { toast } from "react-toastify";

const BalanceContext = createContext();

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider = ({ children }) => {
	const [balance, setBalance] = useState("00.00");
	const [loading, setLoading] = useState(true);

	const fetchBalance = useCallback(async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			console.warn("User is not authenticated. Token is missing.");
			setBalance("00.00");
			setLoading(false);
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/user`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!response.ok) {
				throw new Error("Failed to fetch balance");
			}

			const data = await response.json();
			const fetchedBalance = parseFloat(data.balance);

			setBalance(isNaN(fetchedBalance) ? "00.00" : fetchedBalance.toFixed(2));
		} catch (error) {
			console.error("Error fetching balance:", error.message);
			toast.error("Failed to fetch balance!");
			setBalance("00.00");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateBalance = async (newBalance) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const response = await fetch(`${API_URL}/user/balance`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newBalance }),
			});

			if (!response.ok) {
				throw new Error("Failed to update balance");
			}

			const data = await response.json();
			setBalance(parseFloat(data.balance).toFixed(2));
			toast.success("Balance updated successfully!", {
				autoClose: 2000,
				theme: "colored",
			});
		} catch (error) {
			console.error("Error updating balance:", error.message);
			toast.error(error.message || "Failed to update balance!");
		}
	};

	const calculateTransactionTotal = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const [expensesResponse, incomeResponse] = await Promise.all([
				fetch(`${API_URL}/transaction/expense`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				fetch(`${API_URL}/transaction/income`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);

			if (!expensesResponse.ok || !incomeResponse.ok) {
				throw new Error("Failed to fetch transactions");
			}

			const expensesData = await expensesResponse.json();
			const incomeData = await incomeResponse.json();

			const expensesTotal = expensesData.expenses.reduce(
				(acc, transaction) => acc - transaction.amount,
				0
			);
			const incomeTotal = incomeData.incomes.reduce(
				(acc, transaction) => acc + transaction.amount,
				0
			);

			return incomeTotal + expensesTotal;
		} catch (error) {
			console.error("Error calculating transaction total:", error.message);
			toast.error("Failed to calculate transaction total!");
			return 0;
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchBalance();

			checkTransactions();
		} else {
			setBalance("00.00");
			setLoading(false);
		}
	}, [fetchBalance]);

	const checkTransactions = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;

			const [expensesResponse, incomeResponse] = await Promise.all([
				fetch(`${API_URL}/transaction/expense`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				fetch(`${API_URL}/transaction/income`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);

			const expenses = await expensesResponse.json();
			const incomes = await incomeResponse.json();

			if (expenses.length === 0 && incomes.length === 0) {
				localStorage.removeItem("balanceConfirmed");
			}
		} catch (error) {
			console.error("Error checking transactions:", error.message);
		}
	};

	return (
		<BalanceContext.Provider
			value={{
				balance,
				loading,
				updateBalance,
				fetchBalance,
				calculateTransactionTotal,
			}}
		>
			{children}
		</BalanceContext.Provider>
	);
};
