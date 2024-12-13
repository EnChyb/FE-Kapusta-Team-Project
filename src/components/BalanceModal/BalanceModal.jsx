import "./BalanceModal.css";

export const BalanceModal = () => {
	return (
		<div className="modalWindow">
			<div className="modal__balance">
				<p className="text__modal__balance">
					Hello! To get started, enter the current balance of your account!
				</p>
				<p className="second__text__modal__balance">
					You can't spend money until you have it :)
				</p>
			</div>
			<div className="part__modal__balance"></div>
		</div>
	);
};
