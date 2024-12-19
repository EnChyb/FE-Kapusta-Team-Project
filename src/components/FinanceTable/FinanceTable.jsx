import "./FinanceTable.css";

const FinanceTable = ({ data }) => {
  const rowesToDisplay = 9;

  const tableData = [
    ...data,
    ...Array.from({ length: rowesToDisplay - data.length }, () => ({
      date: "",
      description: "",
      category: "",
      amount: null,
    })),
  ];

  return (
    <div className="finance-table-container">
      <table className="finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.description}</td>
              <td>{entry.category}</td>
              <td
                className={
                  entry.amount < 0 ? "negative-amount" : "positive-amount"
                }
              >
                {entry.amount === null ? "" : entry.amount.toFixed(2)}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
