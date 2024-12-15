import { useState } from "react";
import "./FinanceForm.css";
import Select from "react-select";

const FinanceForm = ({ onAdd, activeSection }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

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

  const clearEntries = () => {
    setDescription("");
    setCategory("");
    setAmount("");
  };

  const selectExpenses = [
    { value: "Transport", label: "Transport" },
    { value: "Prodcuts", label: "Products" },
    { value: "Health", label: "Health" },
    { value: "Alcohol", label: "Alcohol" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Housing", label: "Housing" },
    { value: "Technique", label: "Technique" },
    { value: "Comunnalm communication", label: "Communal, communication" },
    { value: "Sports, hobbies", label: "Sports, hobbies" },
    { value: "Other", label: "Other" },
  ];

  const selectIncome = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
  ];

  const categories =
    activeSection === "expenses" ? selectExpenses : selectIncome;

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      width: "180px",
      height: "40px",
      borderRadius: "8px",
      boxShadow: "none",
      textAlign: "left",
      border: "1px solid #ddd",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#52555F" : "#52555F",
      backgroundColor: state.isSelected ? "#F6F7FC" : "white",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
    }),
  };

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <div className="finance-form-input">
        <div className="date-input-container">
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="calendar-icon"
          >
            <use href="/public/sprite.svg#calendar" />
          </svg>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className="date-input"
          />
        </div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <Select
          value={categories.find((cat) => cat.value === category)}
          onChange={(selectedOption) => setCategory(selectedOption.value)}
          options={categories}
          styles={selectStyles}
          placeholder="Category"
        />
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
        />
      </div>
      <div className="finance-form-button">
        <button type="submit">Input</button>
        <button type="button" onClick={clearEntries}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default FinanceForm;
