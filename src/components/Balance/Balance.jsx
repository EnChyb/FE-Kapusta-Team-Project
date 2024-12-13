import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeBalance } from "../../redux/balance/balanceOperations";
import { getBalance } from "../../redux/balance/balanceSelector";
import { BalanceModal } from "../BalanceModal/BalanceModal";
import "./Balance.css";

const Balance = () => {
	const [input, setInput] = useState("");
	const [showModal, setShowModal] = useState(true);
	const balance = useSelector(getBalance);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const inputValue = e.target.value;
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

		dispatch(changeBalance({ newBalance }));
		setInput("");
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
