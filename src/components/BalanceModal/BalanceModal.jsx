import "./BalanceModal.css";

export const BalanceModal = () => {
    return (
        <div className="balance-modal">
            <p className="balance-modal__top-text">
                Hello! To get started, enter the current balance of your
                account!
            </p>
            <p className="balance-modal__bottom-text">
                You can't spend money until you have it :)
            </p>
        </div>
    );
};
