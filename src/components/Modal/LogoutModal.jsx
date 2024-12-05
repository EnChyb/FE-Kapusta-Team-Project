import { useEffect, useCallback } from "react";
import "./LogoutModal.css";

export default function LogoutModal({
	isOpen,
	step,
	onConfirm,
	onCancel,
	onStepChange,
}) {
	const handleClose = useCallback(() => {
		onCancel();
		document.activeElement.blur();
	}, [onCancel]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				handleClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, handleClose]);

	const handleOverlayClick = (event) => {
		if (event.target.classList.contains("overlay")) {
			handleClose();
		}
	};

	if (!isOpen) return null;

	const modalContent =
		step === 1
			? { title: "Do you really want to leave?", confirmText: "Yes" }
			: { title: "Are you sure?", confirmText: "Yes" };

	return (
		<div className="overlay" onClick={handleOverlayClick}>
			<div className="modal">
				<button
					className="modalCloseButton"
					onClick={handleClose}
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
					<button className="modalCancelButton" onClick={handleClose}>
						No
					</button>
				</div>
			</div>
		</div>
	);
}
