import { useEffect, useCallback } from "react";
import "./LogoutModal.css";

export default function LogoutModal({
  isOpen,
  step,
  onConfirm,
  onCancel,
  onStepChange
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
    if (event.target.classList.contains("modal__overlay")) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const modalContent =
    step === 1
      ? { title: "Do you really want to leave?", confirmText: "Yes" }
      : { title: "Are you sure?", confirmText: "Yes" };

  return (
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button
          className="modal__close-btn"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg
            className="modal__close-btn-icon"
            width="12"
            height="12"
            aria-hidden="true"
          >
            <use href="/sprite.svg#close"></use>
          </svg>
        </button>
        <p className="modal__title">{modalContent.title}</p>
        <div className="modal__btns-container">
          <button
            className="modal__confirm-btn"
            onClick={step === 1 ? onStepChange : onConfirm}
          >
            {modalContent.confirmText}
          </button>
          <button className="modal__cancel-btn" onClick={handleClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
