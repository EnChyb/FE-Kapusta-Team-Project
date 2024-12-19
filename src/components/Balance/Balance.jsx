import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API_URL from "../../config/apiConfig";
import "./Balance.css";
import { BalanceModal } from "../BalanceModal/BalanceModal";

const Balance = () => {
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchBalance = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(`${API_URL}/user`, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					throw new Error("Failed to fetch balance");
				}

				const { balance } = await response.json();
				setInput(balance ? balance.toFixed(2) : "00.00");
				setShowModal(balance === 0 || balance === null);
			} catch (error) {
				console.error("Error fetching balance:", error.message);
				toast.error("Failed to fetch balance!");
			} finally {
				setIsLoading(false);
			}
		};

		fetchBalance();
	}, []);

	const handleChange = (e) => {
		const inputValue = e.target.value.replace(" EUR", "");
		if (/^\d*\.?\d*$/.test(inputValue)) {
			setInput(inputValue);
		}
	};

	const handleInputClick = (e) => {
		const inputElement = e.target;
		const valueWithoutCurrency = inputElement.value.replace(" EUR", "");
		const numberLength = valueWithoutCurrency.length;

		// Ustaw kursor zawsze na końcu liczby
		inputElement.setSelectionRange(numberLength, numberLength);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newBalance = parseFloat(input);

		if (isNaN(newBalance) || newBalance <= 0) {
			toast.error("Please enter a valid balance!", {
				autoClose: 2000,
				theme: "colored",
			});
			return;
		}

		try {
			const token = localStorage.getItem("token");
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
			setInput(data.balance.toFixed(2));
			setShowModal(false);
			document.activeElement.blur();

			toast.success("Balance updated successfully!", {
				autoClose: 2000,
				theme: "colored",
			});
		} catch (error) {
			console.error("Error updating balance:", error.message);
			toast.error("Failed to update balance!");
		}
	};

	if (isLoading) {
		return <div className="loading-placeholder">Loading...</div>;
	}

	return (
		<div className="container-balance">
			{showModal && <BalanceModal />}
			<div className="balanceWrapper">
				<span className="label-balance">Balance:</span>
				<form onSubmit={handleSubmit} className="form-balance">
					<div className="input-container">
						<input
							type="text"
							className="input-balance"
							value={`${input} EUR`}
							onChange={handleChange}
							onClick={handleInputClick}
							placeholder="00.00 EUR"
						/>
					</div>
					<div className="separator"></div>
					<button
						type="submit"
						className={`button-balance ${input ? "buttonActive-balance" : ""}`}
					>
						CONFIRM
					</button>
				</form>
			</div>
		</div>
	);
};

export default Balance;
