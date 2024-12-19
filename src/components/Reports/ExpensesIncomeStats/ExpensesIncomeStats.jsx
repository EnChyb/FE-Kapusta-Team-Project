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
    <div className="eiContainer">
      <div className="eiLabelContainer">
        <button onClick={handleButton} className="eiButton">
          <img src={backArrow} alt="Toggle" />
        </button>
        <span className="eiLabel">{label}</span>
        <button onClick={handleButton} className="eiButton">
          <img src={upArrow} alt="Toggle" />
        </button>
      </div>

      {label === "Expenses" ? <ExpensesList /> : <IncomeList />}
    </div>
  );
};

export default ExpensesIncomeStats;
