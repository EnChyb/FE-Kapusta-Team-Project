import React from "react";

const Summary = ({ data }) => {
  const monthlySummary = data.reduce((acc, entry) => {
    const month = new Date(entry.date).toLocaleString("default", {
      month: "long",
    });

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += entry.amount;

    return acc;
  }, {});

  return (
    <div>
      <h3>SUMMARY</h3>
      <ul>
        {Object.entries(monthlySummary).map(([month, total]) => (
          <li key={month}>
            {month}: {total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
