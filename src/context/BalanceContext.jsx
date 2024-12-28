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
		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("User is not authenticated.");
			}

			const response = await fetch(`${API_URL}/user`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!response.ok) {
				throw new Error("Failed to fetch balance");
			}

			const data = await response.json();
			const fetchedBalance = parseFloat(data.balance);

			if (isNaN(fetchedBalance)) {
				setBalance("00.00");
			} else {
				setBalance(fetchedBalance.toFixed(2));
			}
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
			const updatedBalance = parseFloat(data.balance);

			if (isNaN(updatedBalance)) {
				throw new Error("Invalid balance returned from server");
			}

			setBalance(updatedBalance.toFixed(2));
			toast.success("Balance updated successfully!", {
				autoClose: 2000,
				theme: "colored",
			});
		} catch (error) {
			console.error("Error updating balance:", error.message);
			toast.error(error.message || "Failed to update balance!");
		}
	};

	useEffect(() => {
		fetchBalance();
	}, [fetchBalance]);

	return (
		<BalanceContext.Provider
			value={{ balance, loading, updateBalance, fetchBalance }}
		>
			{children}
		</BalanceContext.Provider>
	);
};
