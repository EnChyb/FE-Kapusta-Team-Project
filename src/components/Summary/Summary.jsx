import React from "react";

const Summary = ({ data }) => {
  const monthlySummary = data.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const year = date.getFullYear();
    const month = new Date(entry.date).toLocaleString("en-US", {
      month: "long",
    });

    const monthYear = `${month} (${year})`;

    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }

    acc[monthYear] += entry.amount;

    return acc;
  }, {});

  return (
    <div>
      <h3>SUMMARY</h3>
      <ul>
        {Object.entries(monthlySummary).map(([monthYear, total]) => (
          <li key={monthYear}>
            {monthYear}: {Math.abs(total).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
