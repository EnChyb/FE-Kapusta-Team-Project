import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BalanceModal } from "../BalanceModal/BalanceModal";
import "./Balance.css";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);

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
        theme: "colored"
      });
      return;
    }

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    setInput("");
    setShowModal(false);
    toast.success("Balance updated successfully!", {
      autoClose: 2000,
      theme: "colored"
    });
  };

  return (
    <div className="container-balance">
      {showModal && balance === 0 && <BalanceModal />}
      <div className="balanceWrapper">
        <span className="label-balance">Balance:</span>
        <div className="balance">
          <span className="balance-value">{balance.toFixed(2)} EUR</span>
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
