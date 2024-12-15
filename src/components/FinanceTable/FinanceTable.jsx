import React from "react";
import "./FinanceTable.css";

const FinanceTable = ({ data }) => {
  return (
    <table className="finance-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.description}</td>
            <td>{entry.category}</td>
            <td
              className={
                entry.amount < 0 ? "negative-amount" : "positive-amount"
              }
            >
              {entry.amount.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FinanceTable;
