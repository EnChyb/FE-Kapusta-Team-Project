import "./Summary.css";

const Summary = ({ data }) => {
    const formatNumber = (number) => {
        const absoluteNumber = Math.abs(number);
        return new Intl.NumberFormat("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(absoluteNumber);
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
        month: "",
        total: "",
    });

    return (
        <div className="summary__container">
            <table className="summary__table">
                <caption className="summary__title">Summary</caption>
                <tbody>
                    {[...summaryData, ...fillerRows].map((item, index) => (
                        <tr key={index} className="summary__row">
                            <th scope="row" className="summary__month">
                                {item.month}
                            </th>
                            <td className="summary__amount">
                                {item.total ? formatNumber(item.total) : ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Summary;
