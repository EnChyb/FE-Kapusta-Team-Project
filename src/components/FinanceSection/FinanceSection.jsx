import React from "react";
import FinanceForm from "../FinanceForm/FinanceForm";
import FinanceTable from "../FinanceTable/FinanceTable";
import Summary from "../Summary/Summary";
import "./FinanceSection.css";

const FinanceSection = ({ title, data, setData }) => {
  const addEntry = (entry) => {
    setData((prevData) => [...prevData, entry]);
  };

  const clearEntries = () => {
    setData([]);
  };

  return (
    <div className="finance-section">
      <h2>{title}</h2>
      <FinanceForm onAdd={addEntry} onClear={clearEntries} />
      <div className="finance-details">
        <FinanceTable data={data} />
        <Summary data={data} />
      </div>
    </div>
  );
};

export default FinanceSection;
