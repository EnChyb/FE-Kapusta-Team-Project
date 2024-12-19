// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { BalanceModal } from "../BalanceModal/BalanceModal";
// import "./Balance.css";

// const Balance = () => {
// 	const [balance, setBalance] = useState(null);
// 	const [input, setInput] = useState("");
// 	const [showModal, setShowModal] = useState(true);

// 	useEffect(() => {
// 		const storedBalance = localStorage.getItem("balance");
// 		if (storedBalance) {
// 			const parsedBalance = parseFloat(storedBalance);
// 			setBalance(parsedBalance);
// 			setInput(parsedBalance.toFixed(2));
// 		} else {
// 			setInput("00.00");
// 		}
// 	}, []);

// 	const handleChange = (e) => {
// 		const inputValue = e.target.value.replace(" EUR", "");
// 		if (/^\d*\.?\d*$/.test(inputValue)) {
// 			setInput(inputValue);
// 		}
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const newBalance = parseFloat(input);

// 		if (isNaN(newBalance) || newBalance <= 0) {
// 			toast.error("Please enter a valid balance!", {
// 				autoClose: 2000,
// 				theme: "colored",
// 			});
// 			return;
// 		}

// 		setBalance(newBalance);
// 		localStorage.setItem("balance", newBalance);

// 		setInput(newBalance.toFixed(2));
// 		setShowModal(false);

// 		document.activeElement.blur();

// 		toast.success("Balance updated successfully!", {
// 			autoClose: 2000,
// 			theme: "colored",
// 		});
// 	};

// 	const handleInputFocus = () => {
// 		if (input === "00.00") {
// 			setInput("");
// 		}
// 	};

// 	const handleInputBlur = () => {
// 		if (input === "" && balance === null) {
// 			setInput("00.00");
// 		}
// 	};

// 	const handleInputClick = (e) => {
// 		const inputElement = e.target;
// 		const numberLength = inputElement.value.replace(" EUR", "").length; //
// 		setTimeout(() => {
// 			inputElement.setSelectionRange(numberLength, numberLength);
// 		}, 0);
// 	};

// 	return (
// 		<div className="container-balance">
// 			{showModal && balance === null && <BalanceModal />}
// 			<div className="balanceWrapper">
// 				<span className="label-balance">Balance:</span>
// 				<form onSubmit={handleSubmit} className="form-balance">
// 					<div className="input-container">
// 						<input
// 							type="text"
// 							className="input-balance"
// 							value={`${input} EUR`}
// 							onChange={handleChange}
// 							onFocus={handleInputFocus}
// 							onBlur={handleInputBlur}
// 							onClick={handleInputClick}
// 							placeholder="00.00 EUR"
// 						/>
// 					</div>
// 					<div className="separator"></div>
// 					<button
// 						type="submit"
// 						className={`button-balance ${input ? "buttonActive-balance" : ""}`}
// 					>
// 						CONFIRM
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Balance;




import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API_URL from "../../config/apiConfig";
import "./Balance.css";
import { BalanceModal } from "../BalanceModal/BalanceModal";

const Balance = () => {
	const [balance, setBalance] = useState(null);
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
				setBalance(balance);
				setInput(balance ? balance.toFixed(2) : "00.00");
				setShowModal(balance === null);
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
			setBalance(data.balance);
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

	const handleInputFocus = () => {
		if (input === "00.00") {
			setInput("");
		}
	};

	const handleInputBlur = () => {
		if (input === "" && balance === null) {
			setInput("00.00");
		}
	};

	const handleInputClick = (e) => {
		const inputElement = e.target;
		const numberLength = inputElement.value.replace(" EUR", "").length;
		setTimeout(() => {
			inputElement.setSelectionRange(numberLength, numberLength);
		}, 0);
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
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
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
