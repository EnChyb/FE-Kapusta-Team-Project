import { useEffect, useState } from 'react';
import './ExpensesIncome.css';
import axios from 'axios';
import API_URL from '../../../api/apiConfig';
import { useParams } from 'react-router-dom';

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
        const response = await axios.get(`${API_URL}/transaction/period-data`, { headers: { Authorization: `Bearer ${token}`, }, params: { date } }); console.log("response", response.data);

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
    <div className="main-expenses-income-div">
      <section className="expenses-income-section">
        <p className="expenses-income-txt">Income:</p>
        <p className="expenses-income-txt income-extention-txt">
          + {income.toFixed(2)} EUR
        </p>
      </section>

      <div className="expenses-and-income-divider"></div>

      <section className="expenses-income-section">
        <p className="expenses-income-txt">Expenses:</p>
        <p className="expenses-income-txt expenses-extention-txt">
          - {expense.toFixed(2)} EUR
        </p>
      </section>
    </div>
  );
};

export default ExpensesIncome;
