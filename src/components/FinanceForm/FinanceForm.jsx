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
    { value: "Prodcuts", label: "Products" },
    { value: "Health", label: "Health" },
    { value: "Alcohol", label: "Alcohol" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Housing", label: "Housing" },
    { value: "Technique", label: "Technique" },
    { value: "Comunnalm communication", label: "Communal, communication" },
    { value: "Sports, hobbies", label: "Sports, hobbies" },
    { value: "Other", label: "Other" }
  ];

  const selectIncome = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" }
  ];

  const categories =
    activeSection === "expenses" ? selectExpenses : selectIncome;

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      borderRadius: "8px",
      boxShadow: "none",
      textAlign: "left"
    }),
    option: (provided, state) => ({
      ...provided,
      color: "grey",
      backgroundColor: state.isSelected ? "lightgrey" : "white"
    })
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption ? selectedOption.value : "");
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
          placeholder="Product description"
        />
        <Select
          value={category ? { value: category, label: category } : null}
          onChange={handleCategoryChange}
          options={categories}
          styles={selectStyles}
          placeholder="Product category"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
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
