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
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          total: 0,
        };
      }

      acc[key].total += entry.amount;

      return acc;
    }, {}) || {};

  const summaryData = Object.values(monthlySummary);
  const emptyRows = Math.max(6 - summaryData.length, 0);
  const fillerRows = Array(emptyRows).fill({
    year: "",
    month: "",
    total: "",
  });

  return (
    <div className="summary-container">
      <h2 className="summary-title">SUMMARY</h2>
      <div className="summary-content">
        {[...summaryData, ...fillerRows].map((item, index) => (
          <div key={index} className="summary-row">
            <span className="summary-year">{item.year}</span>
            <span className="summary-month">{item.month}</span>
            <span className="summary-amount">
              {item.total ? formatNumber(item.total) : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
