import { useEffect, useState } from "react";
import "./ExpensesIncome.css";
import axios from "axios";
import API_URL from "../../../api/apiConfig";
import { useParams } from "react-router-dom";

const ExpensesIncome = () => {
    const { date } = useParams();
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authorization token.");
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/transaction/period-data`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { date },
                    }
                );
                console.log("response", response.data);

                const totalIncome = response.data.incomes.total;
                setIncome(totalIncome);

                const totalExpense = response.data.expenses.total;
                setExpense(totalExpense);
            } catch (err) {
                setError(err.message || "Błąd podczas pobierania danych.");
            }
        };
        fetchData();
    }, [date]);

    if (error) {
        return <p>Błąd: {error}</p>;
    }

    return (
        <section className="reports-overview">
            <p className="reports-overview__expense">
                Expenses:
                <span className="reports-overview__expense-highlight">
                    - {expense.toFixed(2)} EUR
                </span>
            </p>

            <div className="reports-overview__divider"></div>

            <p className="reports-overview__income">
                Income:
                <span className="reports-overview__income-highlight">
                    + {income.toFixed(2)} EUR
                </span>
            </p>
        </section>
    );
};

export default ExpensesIncome;
