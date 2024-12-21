import "./Summary.css";

const Summary = ({ data }) => {
  const formatNumber = (number) => {
    return Math.abs(number)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const monthlySummary =
    data?.reduce((acc, entry) => {
      const date = new Date(entry.date);
      const month = date
        .toLocaleString("en-US", { month: "long" })
        .toUpperCase();

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += entry.amount;

      return acc;
    }, {}) || {};

  return (
    <div className="summary-container">
      <h2 className="summary-title">SUMMARY</h2>
      <div className="summary-content">
        {Object.entries(monthlySummary).map(([month, total]) => (
          <div key={month} className="summary-row">
            <span className="summary-month">{month}</span>
            <span className="summary-amount">{formatNumber(total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
