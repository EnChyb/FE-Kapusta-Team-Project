import "./FinanceTable.css";

const FinanceTable = ({ data=[], onDelete }) => {
  const rowesToDisplay = 12;

  const tableData = [
    ...data,
    ...Array.from(
      { length: Math.max(rowesToDisplay - data.length, 0) },
      () => ({
        date: "",
        description: "",
        category: "",
        amount: null,
      })
    ),
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .join(".");
  };

  const formatAmount = (amount) => {
    if (amount === null) return "";
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? "- " : ""}${absAmount.toFixed(2)} EUR`;
  };

  return (
    <div className="finance-table-container">
      <table className="finance-table">
        <tbody className="finance-table-header">
          <tr>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>CATEGORY</th>
            <th>SUM</th>
            <th></th>
          </tr>
        </tbody>
        <tbody className="finance-table-body">
          {tableData.map((entry, index) => (
            <tr key={entry._id ||index}>
              <td>{formatDate(entry.date)}</td>
              <td>{entry.description}</td>
              <td>{entry.category}</td>
              <td
                className={
                  entry.amount < 0 ? "negative-amount" : "positive-amount"
                }
              >
                {formatAmount(entry.amount)}
              </td>
              <td>
                {entry.amount !== null && (
                  <button
                    className="delete-btn"
                    onClick={() => onDelete && onDelete(index)}
                    aria-label="Delete entry"
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <use href="/sprite.svg#trash" />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
