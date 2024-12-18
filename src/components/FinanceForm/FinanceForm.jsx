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

  const clearEntries = () => {
    setDescription("");
    setCategory(null);
    setAmount("");
  };

  const selectExpenses = [
    { value: "Transport", label: "Transport" },
    { value: "Products", label: "Products" },
    { value: "Health", label: "Health" },
    { value: "Alcohol", label: "Alcohol" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Housing", label: "Housing" },
    { value: "Technique", label: "Technique" },
    { value: "Communal, communication", label: "Communal, communication" },
    { value: "Sports, hobbies", label: "Sports, hobbies" },
    { value: "Other", label: "Other" },
  ];

  const selectIncome = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
  ];

  const categories =
    activeSection === "expenses" ? selectExpenses : selectIncome;

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption ? selectedOption.value : "");
  };

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <div className="finance-form-input">
        <div className="date-input-container">
          <svg
            width="32"
            height="32"
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
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description"
            className="product-description-input"
          />
        </div>
        <div>
          <Select
            value={category ? { value: category, label: category } : null}
            onChange={handleCategoryChange}
            options={categories}
            classNames={{
              control: () => "select-control",
              option: (state) =>
                state.isSelected
                  ? "select-option select-option--is-selected"
                  : "select-option select-option--is-not-selected",
            }}
            placeholder="Product category"
          />
        </div>
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
            className="amount-input"
          />
        </div>
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
