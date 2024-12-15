import { useState } from "react";
import "./ExpensesIncomeStats.css";
import ExpensesList from "./ExpensesList";
import IncomeList from "./IncomeList";
import upArrow from "../../../assets/svg/Vector 16.svg";
import backArrow from "../../../assets/svg/Vector 15.svg";

const ExpensesIncomeStats = () => {
  const [label, setLabel] = useState("Expenses");

  const handleButton = () => {
    setLabel((prevLabel) => (prevLabel === "Expenses" ? "Income" : "Expenses"));
  };

  return (
    <div className="container">
      <div className="labelContainer">
        <button onClick={handleButton}>
          <img src={backArrow} alt="Toggle" />
        </button>
        <span className="label">{label}</span>
        <button onClick={handleButton}>
          <img src={upArrow} alt="Toggle" />
        </button>
      </div>

      {label === "Expenses" ? <ExpensesList /> : <IncomeList />}
    </div>
  );
};

export default ExpensesIncomeStats;
