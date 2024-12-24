import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API_URL from "../../../api/apiConfig";
import "./Balance.css";
import { BalanceModal } from "../BalanceModal/BalanceModal";

const Balance = () => {
	const [input, setInput] = useState("00.00");
	const [isEditing, setIsEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchBalance = async () => {
			setLoading(true);
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(`${API_URL}/user`, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					throw new Error("Failed to fetch balance");
				}

				const data = await response.json();
				const balance = parseFloat(data.balance);

				if (isNaN(balance)) {
					setInput("00.00");
					setShowModal(true);
				} else {
					setInput(balance.toFixed(2));
					setShowModal(balance === 0);
				}
			} catch (error) {
				console.error("Error fetching balance:", error.message);
				toast.error("Failed to fetch balance!");
				setInput("00.00");
			} finally {
				setLoading(false);
			}
		};

		fetchBalance();
	}, []);

	const handleChange = (e) => {
		const inputValue = e.target.value.replace(" EUR", "");
		if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
			setInput(inputValue);
		}
	};

	const handleFocus = () => {
		if (input === "00.00") {
			setInput("");
		}
		setIsEditing(true);
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
			setLoading(true);
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
			const updatedBalance = parseFloat(data.balance);

			if (isNaN(updatedBalance)) {
				throw new Error("Invalid balance returned from server");
			}

			setInput(updatedBalance.toFixed(2));
			setIsEditing(false);
			setShowModal(false);
			document.activeElement.blur();

			toast.success("Balance updated successfully!", {
				autoClose: 2000,
				theme: "colored",
			});
		} catch (error) {
			console.error("Error updating balance:", error.message);
			toast.error(error.message || "Failed to update balance!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="balance__container">
			<form onSubmit={handleSubmit} className="balance__form">
				<label className="balance__label" htmlFor="balance">
					Balance:
				</label>
				<div className="balance__input-container">
					{showModal && <BalanceModal />}
					<div className="balance__input_wrapper">
						{loading ? (
							<div className="balance__spinner"></div>
						) : (
							<input
								className="balance__input"
								id="balance"
								type="text"
								value={
									isEditing ? input : `${parseFloat(input).toFixed(2)} EUR`
								}
								onChange={handleChange}
								onFocus={handleFocus}
								placeholder="00.00 EUR"
							/>
						)}
					</div>
					<button
						type="submit"
						className={`button-balance ${input ? "buttonActive-balance" : ""}`}
					>
						CONFIRM
					</button>
				</div>
			</form>
		</div>
	);
};

export default Balance;
