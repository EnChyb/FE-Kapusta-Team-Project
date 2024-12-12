import React, { useState } from "react";
import "./FinanceForm.css";

const FinanceForm = ({ onAdd, onClear }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !category || !amount) return;

    onAdd({ date, description, category, amount: parseFloat(amount) });

    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (!isNaN(value) && value !== "") {
      setAmount(value);
    }
  };
  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <div className="finance-form-input">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      <div className="finance-form-button">
        <button type="submit">Input</button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default FinanceForm;
