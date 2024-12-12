import React, { useState } from "react";
import FinanceSection from "../FinanceSection/FinanceSection";
import "./FinanceTracker.css";

const FinanceTracker = () => {
  const [activeSection, setActiveSection] = useState("expenses");

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  const handleSwitchSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="tracker-container">
      <div className="button-container">
        <div className="button-single">
          <button
            className={`switch-button ${
              activeSection === "expenses" ? "active" : ""
            }`}
            onClick={() => handleSwitchSection("expenses")}
          >
            Expenses
          </button>
        </div>
        <div className="button-single">
          <button
            className={`switch-button ${
              activeSection === "income" ? "active" : ""
            }`}
            onClick={() => handleSwitchSection("income")}
          >
            Income
          </button>
        </div>
      </div>

      {activeSection === "expenses" && (
        <FinanceSection
          title="Expenses"
          data={expenses}
          setData={setExpenses}
        />
      )}
      {activeSection === "income" && (
        <FinanceSection title="Income" data={income} setData={setIncome} />
      )}
    </div>
  );
};

export default FinanceTracker;
