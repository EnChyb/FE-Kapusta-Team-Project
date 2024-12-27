// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useBalance } from "../../context/BalanceContext";
// import "./Balance.css";
// import { BalanceModal } from "../BalanceModal/BalanceModal";

// const Balance = () => {
// 	const { balance, loading, updateBalance } = useBalance();
// 	const [input, setInput] = useState(balance || "00.00");
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [showModal, setShowModal] = useState(false);

// 	const handleChange = (e) => {
// 		const inputValue = e.target.value.replace(" EUR", "");
// 		if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
// 			setInput(inputValue);
// 		}
// 	};

// 	const handleFocus = () => {
// 		if (input === "00.00") {
// 			setInput("");
// 		}
// 		setIsEditing(true);
// 	};

// 	const handleBlur = () => {
// 		if (!isEditing) return;
// 		if (!input || input === "") {
// 			setInput(balance);
// 		}
// 		setIsEditing(false);
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const newBalance = parseFloat(input);

// 		if (isNaN(newBalance) || newBalance <= 0) {
// 			toast.error("Please enter a valid balance!", {
// 				autoClose: 2000,
// 				theme: "colored",
// 			});
// 			return;
// 		}

// 		await updateBalance(newBalance);
// 		setShowModal(false);
// 		document.activeElement.blur();
// 	};

// 	return (
// 		<div className="balance__container">
// 			<form onSubmit={handleSubmit} className="balance__form">
// 				<label className="balance__label" htmlFor="balance">
// 					Balance:
// 				</label>
// 				<div className="balance__input-container">
// 					{showModal && <BalanceModal />}
// 					<div className="balance__input_wrapper">
// 						{loading ? (
// 							<div className="balance__spinner"></div>
// 						) : (
// 							<input
// 								className="balance__input"
// 								id="balance"
// 								type="text"
// 								value={
// 									isEditing ? input : `${parseFloat(balance).toFixed(2)} EUR`
// 								}
// 								onChange={handleChange}
// 								onFocus={handleFocus}
// 								onBlur={handleBlur}
// 								placeholder="00.00 EUR"
// 							/>
// 						)}
// 					</div>
// 					<button
// 						type="submit"
// 						className={`button-balance ${input ? "buttonActive-balance" : ""}`}
// 					>
// 						CONFIRM
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default Balance;



import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useBalance } from "../../context/BalanceContext";
import "./Balance.css";
import { BalanceModal } from "../BalanceModal/BalanceModal";

const Balance = () => {
  const { balance, loading, updateBalance } = useBalance();
  const [input, setInput] = useState(balance || "00.00");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Pokazuj modal, jeśli bilans wynosi 0
    if (!loading && parseFloat(balance) === 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [balance, loading]);

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

  const handleBlur = () => {
    if (!isEditing) return;
    if (!input || input === "") {
      setInput(balance);
    }
    setIsEditing(false);
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

    await updateBalance(newBalance);
    document.activeElement.blur();
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
                  isEditing ? input : `${parseFloat(balance).toFixed(2)} EUR`
                }
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
