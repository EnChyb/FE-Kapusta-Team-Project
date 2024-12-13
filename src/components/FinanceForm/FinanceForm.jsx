import React, { useState } from "react";
import "./FinanceForm.css";

const FinanceForm = ({ onAdd, onClear }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const categories = ["Transport", "Products", "Health", "Alcohol", "Housing"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !category || !amount) return;

    onAdd({ date, description, category, amount: parseFloat(amount) });

    setDate(new Date().toISOString().split("T")[0]);
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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
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
        <select value={category} onChange={handleCategoryChange} required>
          <option value="" disabled>
            Product category ▼
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
