import "./FinanceTable.css";

const FinanceTable = ({ data = [], onDelete }) => {
    const rowsToDisplay = 9;

    const sortedData = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const tableData = [
        ...sortedData,
        ...Array.from(
            { length: Math.max(rowsToDisplay - sortedData.length, 0) },
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
        return date.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const formatAmount = (amount) => {
        if (amount === null) return "";
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    };

    return (
        <div className="tracker__table-wrapper">
            <h2 className="visually-hidden">Transaction tracker</h2>
            <table className="tracker__table">
                <caption className="visually-hidden">
                    A list of recorded transactions
                </caption>
                <thead className="tracker__table-header">
                    <tr>
                        <th scope="col">DATE</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">SUM</th>
                        <th scope="col" aria-hidden="true"></th>
                    </tr>
                </thead>

                <tbody className="tracker__table-body">
                    {tableData.map((entry, index) => (
                        <tr
                            key={entry._id || index}
                            className="tracker__table-entry"
                        >
                            <td className="tracker__table-entry-date">
                                {formatDate(entry.date)}
                            </td>
                            <td className="tracker__table-entry-description">
                                {entry.description}
                            </td>
                            <td className="tracker__table-entry-category">
                                {entry.category}
                            </td>
                            <td
                                className={
                                    entry.amount < 0
                                        ? "tracker__table-entry-negative-amount"
                                        : "tracker__table-entry-positive-amount"
                                }
                            >
                                {formatAmount(entry.amount)}
                            </td>
                            <td className="tracker__table-entry-delete">
                                {entry.amount !== null && (
                                    <button
                                        className="tracker__table-entry-delete-btn"
                                        type="button"
                                        onClick={() =>
                                            onDelete(index, entry.amount)
                                        }
                                        aria-label={`Delete entry for ${
                                            entry.description
                                        } on ${formatDate(entry.date)}`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            aria-hidden="true"
                                            className="tracker__table-entry-delete-btn-icon"
                                        >
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
