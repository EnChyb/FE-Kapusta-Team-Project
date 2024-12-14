import React, { useState } from "react";
import FinanceForm from "../FinanceForm/FinanceForm";
import FinanceTable from "../FinanceTable/FinanceTable";
import Summary from "../Summary/Summary";
import "./FinanceSection.css";

const FinanceSection = ({ title, data, setData, activeSection }) => {
  const addEntry = (entry) => {
    const adjustedEntry = {
      ...entry,
      amount:
        activeSection === "expenses"
          ? -Math.abs(entry.amount)
          : Math.abs(entry.amount),
    };

    setData((prevData) => [...prevData, adjustedEntry]);
  };

  return (
    <div className="finance-section">
      <h2>{title}</h2>
      <FinanceForm onAdd={addEntry} activeSection={activeSection} />
      <div className="finance-details">
        <FinanceTable data={data} />
        <Summary data={data} />
      </div>
    </div>
  );
};

export default FinanceSection;
