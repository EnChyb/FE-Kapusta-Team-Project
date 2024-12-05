import "./LogoutModal.css";
export default function LogoutModal({
	isOpen,
	step,
	onConfirm,
	onCancel,
	onStepChange,
}) {
	if (!isOpen) return null;

	const modalContent =
		step === 1
			? { title: "Do you really want to leave?", confirmText: "Yes" }
			: { title: "Are you sure?", confirmText: "Yes" };

	return (
		<div className="overlay">
			<div className="modal">
				<button
					className="modalCloseButton"
					onClick={onCancel}
					aria-label="Close"
				>
					&times;
				</button>
				<h3 className="modalTitle">{modalContent.title}</h3>
				<div className="modalButtons">
					<button
						className="modalConfirmButton"
						onClick={step === 1 ? onStepChange : onConfirm}
					>
						{modalContent.confirmText}
					</button>
					<button className="modalCancelButton" onClick={onCancel}>
						No
					</button>
				</div>
			</div>
		</div>
	);
}
