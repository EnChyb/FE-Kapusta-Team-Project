import { useState, useEffect } from "react";
import FinanceSection from "../FinanceSection/FinanceSection";
import "./FinanceTracker.css";
import axios from "axios";
import API_URL from "../../../api/apiConfig";
import { useBalance } from "../../context/BalanceContext";

const FinanceTracker = () => {
	const [activeSection, setActiveSection] = useState("expenses");
	const [expenses, setExpenses] = useState([]);
	const [income, setIncome] = useState([]);
	const { balance, updateBalance } = useBalance();

	const handleSwitchSection = (section) => {
		setActiveSection(section);
	};

	const fetchData = async (section) => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No authorization token.");
			return;
		}
		try {
			const response = await axios.get(`${API_URL}/transaction/${section}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (section === "expense") {
				setExpenses(
					response.data.expenses.map((transaction) => ({
						...transaction,
						amount: -Math.abs(transaction.amount),
					}))
				);
			} else if (section === "income") {
				setIncome(
					response.data.incomes.map((transaction) => ({
						...transaction,
						amount: Math.abs(transaction.amount),
					}))
				);
			}
		} catch (error) {
			if (error.response?.status === 404) {
				if (section === "expense") {
					setExpenses([]);
				} else if (section === "income") {
					setIncome([]);
				}
			} else {
				console.error(`Error fetching ${section} data:`, error.message);
			}
		}
	};

	const deleteEntry = async (transactionId) => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No authorization token.");
			return;
		}

		try {
			const transactions = activeSection === "expenses" ? expenses : income;
			const transactionToDelete = transactions.find(
				(transaction) => transaction._id === transactionId
			);

			if (!transactionToDelete) {
				throw new Error("Transaction not found.");
			}

			await axios.delete(`${API_URL}/transaction/${transactionId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(`Deleted entry with ID: ${transactionId}`);

			const adjustment =
				activeSection === "expenses"
					? Math.abs(transactionToDelete.amount)
					: -Math.abs(transactionToDelete.amount);
			await updateBalance(parseFloat(balance) + adjustment);

			if (activeSection === "expenses") {
				setExpenses((prev) =>
					prev.filter((transaction) => transaction._id !== transactionId)
				);
			} else {
				setIncome((prev) =>
					prev.filter((transaction) => transaction._id !== transactionId)
				);
			}
		} catch (error) {
			console.error(
				`Error deleting entry with ID ${transactionId}:`,
				error.message
			);
		}
	};

	useEffect(() => {
		fetchData(activeSection === "expenses" ? "expense" : "income");
	}, [activeSection]);

	return (
		<div className="tracker-container">
			<div className="button-container">
				<div className="button-single">
					<button
						className={`switch-button ${
							activeSection === "expenses" ? "active" : ""
						}`}
						onClick={() => handleSwitchSection("expenses")}
					>
						EXPENSES
					</button>
				</div>
				<div className="button-single">
					<button
						className={`switch-button ${
							activeSection === "income" ? "active" : ""
						}`}
						onClick={() => handleSwitchSection("income")}
					>
						INCOME
					</button>
				</div>
			</div>

			{activeSection === "expenses" && (
				<FinanceSection
					title="Expenses"
					data={expenses}
					setData={setExpenses}
					activeSection={activeSection}
					onDelete={deleteEntry}
				/>
			)}
			{activeSection === "income" && (
				<FinanceSection
					title="Income"
					data={income}
					setData={setIncome}
					activeSection={activeSection}
					onDelete={deleteEntry}
				/>
			)}
		</div>
	);
};

export default FinanceTracker;
