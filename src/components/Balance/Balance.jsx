import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeBalance } from "../../redux/balance/balanceOperations";
import { getBalance } from "../../redux/balance/balanceSelector";
import { BalanceModal } from "../BalanceModal/BalanceModal";
import "./Balance.css";

const Balance = () => {
	const balance = useSelector(getBalance);
	const dispatch = useDispatch();

	const [input, setInput] = useState("");
	const [showModal, setShowModal] = useState(true);

	useEffect(() => {
		if (balance !== 0) {
			setInput(`${balance.toFixed(2)} EUR`);
		}
	}, [balance]);

	const handleChange = (e) => {
		const inputValue = e.target.value.replace(/[^0-9.,]/g, "");
		setInput(inputValue);
	};

	const handleBlur = () => {
		if (input && !input.includes("EUR")) {
			setInput((prev) => `${prev} EUR`);
		}
	};

	const handleFocus = () => {
		setInput((prev) => prev.replace(" EUR", ""));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const parsedValue = parseFloat(input.replace(",", ".").replace(" EUR", ""));

		if (isNaN(parsedValue) || parsedValue <= 0) {
			toast.error("Please enter a valid balance!", {
				autoClose: 2000,
				theme: "colored",
			});
			return;
		}

		dispatch(changeBalance({ newBalance: parsedValue }));

		setInput(`${parsedValue.toFixed(2)} EUR`);
		setShowModal(false);

		toast.success("Balance updated successfully!", {
			autoClose: 2000,
			theme: "colored",
		});
	};

	return (
		<div className="container-balance">
			{showModal && balance === 0 && <BalanceModal />}
			<div className="balanceWrapper">
				<span className="label-balance">Balance:</span>
				<div className="balance">
					<form onSubmit={handleSubmit} className="form-balance">
						<input
							type="text"
							className="input-balance"
							value={input}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							placeholder="00.00 EUR"
						/>
						<div className="separator"></div>
						<button
							type="submit"
							className={`button-balance ${
								input ? "buttonActive-balance" : ""
							}`}
						>
							CONFIRM
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Balance;
