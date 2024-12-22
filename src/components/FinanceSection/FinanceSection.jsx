import FinanceForm from "../FinanceForm/FinanceForm";
import FinanceTable from "../FinanceTable/FinanceTable";
import Summary from "../Summary/Summary";
import "./FinanceSection.css";
import { useEffect } from "react";

const FinanceSection = ({ data, setData, activeSection, onDelete }) => {
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

  const deleteEntry = (index) => {
    const entryToDelete = data[index];
    if (entryToDelete && entryToDelete._id) {
      onDelete(entryToDelete._id);
    }
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(`Data for ${activeSection} section:`, data);
  }, [data, activeSection]);

  return (
    <div className="finance-section">
      <FinanceForm onAdd={addEntry} activeSection={activeSection} />
      <div className="finance-details">
        <FinanceTable data={data} onDelete={deleteEntry} />
        <Summary data={data} />
      </div>
    </div>
  );
};

export default FinanceSection;
