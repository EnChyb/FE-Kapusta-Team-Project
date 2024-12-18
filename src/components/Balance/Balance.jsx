import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BalanceModal } from "../BalanceModal/BalanceModal";
import "./Balance.css";

const Balance = () => {
	const [balance, setBalance] = useState(null);
	const [input, setInput] = useState("");
	const [showModal, setShowModal] = useState(true);

	useEffect(() => {
		const storedBalance = localStorage.getItem("balance");
		if (storedBalance) {
			const parsedBalance = parseFloat(storedBalance);
			setBalance(parsedBalance);
			setInput(parsedBalance.toFixed(2));
		} else {
			setInput("00.00");
		}
	}, []);

	const handleChange = (e) => {
		const inputValue = e.target.value.replace(" EUR", "");
		if (/^\d*\.?\d*$/.test(inputValue)) {
			setInput(inputValue);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newBalance = parseFloat(input);

		if (isNaN(newBalance) || newBalance <= 0) {
			toast.error("Please enter a valid balance!", {
				autoClose: 2000,
				theme: "colored",
			});
			return;
		}

		setBalance(newBalance);
		localStorage.setItem("balance", newBalance);

		setInput(newBalance.toFixed(2));
		setShowModal(false);

		document.activeElement.blur();

		toast.success("Balance updated successfully!", {
			autoClose: 2000,
			theme: "colored",
		});
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
		const numberLength = inputElement.value.replace(" EUR", "").length; //
		setTimeout(() => {
			inputElement.setSelectionRange(numberLength, numberLength);
		}, 0);
	};

	return (
		<div className="container-balance">
			{showModal && balance === null && <BalanceModal />}
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
