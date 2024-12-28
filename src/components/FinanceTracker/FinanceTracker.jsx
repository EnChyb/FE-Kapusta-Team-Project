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

			console.log(`Data fetched for ${section}:`, response.data);

			if (section === "expense") {
				setExpenses(response.data.expenses);
			} else if (section === "income") {
				setIncome(response.data.incomes);
			}
		} catch (error) {
			console.error(`Error fetching ${section} data:`, error.message);
		}
	};

	const deleteEntry = async (transactionId, amount) => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No authorization token.");
			return;
		}

		try {
			await axios.delete(`${API_URL}/transaction/${transactionId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(`Deleted entry with ID: ${transactionId}`);

			const adjustment = activeSection === "expenses" ? amount : -amount;
			await updateBalance(parseFloat(balance) + adjustment);

			fetchData(activeSection === "expenses" ? "expense" : "income");
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
